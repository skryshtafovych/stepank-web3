import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 3001;

// Environment detection
const isGoogleCloud = process.env.GOOGLE_CLOUD_PROJECT || process.env.K_SERVICE || process.env.K_REVISION;
const environment = isGoogleCloud ? 'Google Cloud' : 'Local';

if (!process.env.GEMINI_API_KEY) {
  console.error('FATAL ERROR: GEMINI_API_KEY is not defined in your .env file.');
  process.exit(1); // Stop the server
}

// Logging middleware for all requests
const requestLogger = (req, res, next) => {
  const startTime = Date.now();
  const requestId = Math.random().toString(36).substring(2, 15);
  
  // Log request details
  const logData = {
    timestamp: new Date().toISOString(),
    requestId,
    environment,
    method: req.method,
    url: req.url,
    path: req.path,
    query: req.query,
    headers: {
      'user-agent': req.get('User-Agent'),
      'x-forwarded-for': req.get('X-Forwarded-For'),
      'x-real-ip': req.get('X-Real-IP'),
      'content-type': req.get('Content-Type'),
      'content-length': req.get('Content-Length')
    },
    ip: req.ip || req.connection.remoteAddress,
    body: req.method === 'POST' ? req.body : undefined
  };

  // Environment-specific logging
  if (isGoogleCloud) {
    // Google Cloud structured logging
    console.log(JSON.stringify({
      severity: 'INFO',
      message: `Incoming ${req.method} request`,
      ...logData
    }));
  } else {
    // Local development logging
    console.log(`\n🚀 [${logData.timestamp}] ${req.method} ${req.url}`);
    console.log(`📍 Environment: ${environment}`);
    console.log(`🆔 Request ID: ${requestId}`);
    console.log(`🌐 IP: ${logData.ip}`);
    console.log(`👤 User-Agent: ${logData.headers['user-agent']}`);
    if (req.method === 'POST' && req.body) {
      console.log(`📦 Request Body:`, JSON.stringify(req.body, null, 2));
    }
  }

  // Override res.end to log response details
  const originalEnd = res.end;
  res.end = function(chunk, encoding) {
    const endTime = Date.now();
    const duration = endTime - startTime;
    
    const responseLogData = {
      timestamp: new Date().toISOString(),
      requestId,
      environment,
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      statusMessage: res.statusMessage,
      duration: `${duration}ms`,
      responseSize: chunk ? chunk.length : 0,
      headers: {
        'content-type': res.get('Content-Type'),
        'content-length': res.get('Content-Length')
      }
    };

    // Environment-specific response logging
    if (isGoogleCloud) {
      // Google Cloud structured logging
      const severity = res.statusCode >= 400 ? 'ERROR' : res.statusCode >= 300 ? 'WARNING' : 'INFO';
      console.log(JSON.stringify({
        severity,
        message: `Request completed`,
        ...responseLogData
      }));
    } else {
      // Local development response logging
      const statusEmoji = res.statusCode < 300 ? '✅' : res.statusCode < 400 ? '⚠️' : '❌';
      console.log(`${statusEmoji} [${responseLogData.timestamp}] ${req.method} ${req.url} - ${res.statusCode} (${duration}ms)`);
    }

    originalEnd.call(this, chunk, encoding);
  };

  next();
};

// Error logging middleware
const errorLogger = (err, req, res, next) => {
  const errorLogData = {
    timestamp: new Date().toISOString(),
    environment,
    method: req.method,
    url: req.url,
    error: {
      message: err.message,
      stack: err.stack,
      name: err.name
    },
    headers: req.headers,
    body: req.body
  };

  if (isGoogleCloud) {
    // Google Cloud structured error logging
    console.error(JSON.stringify({
      severity: 'ERROR',
      message: 'Server error occurred',
      ...errorLogData
    }));
  } else {
    // Local development error logging
    console.error(`\n💥 [${errorLogData.timestamp}] ERROR in ${req.method} ${req.url}`);
    console.error(`📍 Environment: ${environment}`);
    console.error(`❌ Error: ${err.message}`);
    console.error(`📚 Stack: ${err.stack}`);
  }

  next(err);
};

app.use(cors());
app.use(express.json());
app.use(requestLogger);

// Serve static files from the React build directory
app.use(express.static(path.join(__dirname, 'dist')));

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Verify reCAPTCHA token
const verifyRecaptcha = async (token) => {
  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    });

    const data = await response.json();
    return data.success && data.score >= 0.5; // Accept scores >= 0.5
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return false;
  }
};

// Health check endpoint
app.get('/api/health', (req, res) => {
  const healthData = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment,
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    version: process.version
  };

  if (isGoogleCloud) {
    console.log(JSON.stringify({
      severity: 'INFO',
      message: 'Health check requested',
      ...healthData
    }));
  } else {
    console.log(`🏥 Health check - Environment: ${environment}, Uptime: ${Math.round(process.uptime())}s`);
  }

  res.json(healthData);
});

app.post('/api/rewrite', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).send('No text provided');
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });
    const prompt = `Rewrite the following text in a more creative and engaging way: "${text}"`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const rewrittenText = await response.text();
    
    res.json({ rewrittenText });
  } catch (error) {
    console.error('Error rewriting text:', error);
    res.status(500).send('Failed to rewrite text');
  }
});

// The "catchall" handler: for any request that doesn't match one above,
// send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Apply error logging middleware
app.use(errorLogger);

app.listen(port, () => {
  const startupLog = {
    timestamp: new Date().toISOString(),
    message: 'Server started successfully',
    environment,
    port,
    nodeVersion: process.version,
    platform: process.platform,
    arch: process.arch
  };

  if (isGoogleCloud) {
    console.log(JSON.stringify({
      severity: 'INFO',
      ...startupLog
    }));
  } else {
    console.log(`\n🚀 Server started at http://localhost:${port}`);
    console.log(`📍 Environment: ${environment}`);
    console.log(`📅 ${startupLog.timestamp}`);
    console.log(`⚡ Node.js ${process.version} on ${process.platform} ${process.arch}`);
    console.log(`📊 Request logging enabled for all endpoints\n`);
  }
}); 