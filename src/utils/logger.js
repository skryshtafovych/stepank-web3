// Logger utility for consistent logging across the application
class Logger {
  constructor() {
    this.isGoogleCloud = process.env.GOOGLE_CLOUD_PROJECT || process.env.K_SERVICE || process.env.K_REVISION;
    this.environment = this.isGoogleCloud ? 'Google Cloud' : 'Local';
  }

  // Format timestamp
  getTimestamp() {
    return new Date().toISOString();
  }

  // Generate request ID
  generateRequestId() {
    return Math.random().toString(36).substring(2, 15);
  }

  // Log info messages
  info(message, data = {}) {
    const logData = {
      timestamp: this.getTimestamp(),
      level: 'INFO',
      message,
      environment: this.environment,
      ...data
    };

    if (this.isGoogleCloud) {
      console.log(JSON.stringify({
        severity: 'INFO',
        ...logData
      }));
    } else {
      console.log(`ℹ️  [${logData.timestamp}] ${message}`, data);
    }
  }

  // Log warning messages
  warn(message, data = {}) {
    const logData = {
      timestamp: this.getTimestamp(),
      level: 'WARN',
      message,
      environment: this.environment,
      ...data
    };

    if (this.isGoogleCloud) {
      console.log(JSON.stringify({
        severity: 'WARNING',
        ...logData
      }));
    } else {
      console.warn(`⚠️  [${logData.timestamp}] ${message}`, data);
    }
  }

  // Log error messages
  error(message, error = null, data = {}) {
    const logData = {
      timestamp: this.getTimestamp(),
      level: 'ERROR',
      message,
      environment: this.environment,
      error: error ? {
        message: error.message,
        stack: error.stack,
        name: error.name
      } : null,
      ...data
    };

    if (this.isGoogleCloud) {
      console.error(JSON.stringify({
        severity: 'ERROR',
        ...logData
      }));
    } else {
      console.error(`❌ [${logData.timestamp}] ${message}`, error, data);
    }
  }

  // Log request details
  logRequest(req, requestId) {
    const logData = {
      timestamp: this.getTimestamp(),
      requestId,
      environment: this.environment,
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

    if (this.isGoogleCloud) {
      console.log(JSON.stringify({
        severity: 'INFO',
        message: `Incoming ${req.method} request`,
        ...logData
      }));
    } else {
      console.log(`\n🚀 [${logData.timestamp}] ${req.method} ${req.url}`);
      console.log(`📍 Environment: ${this.environment}`);
      console.log(`🆔 Request ID: ${requestId}`);
      console.log(`🌐 IP: ${logData.ip}`);
      console.log(`👤 User-Agent: ${logData.headers['user-agent']}`);
      if (req.method === 'POST' && req.body) {
        console.log(`📦 Request Body:`, JSON.stringify(req.body, null, 2));
      }
    }
  }

  // Log response details
  logResponse(req, res, requestId, duration) {
    const logData = {
      timestamp: this.getTimestamp(),
      requestId,
      environment: this.environment,
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      statusMessage: res.statusMessage,
      duration: `${duration}ms`,
      headers: {
        'content-type': res.get('Content-Type'),
        'content-length': res.get('Content-Length')
      }
    };

    if (this.isGoogleCloud) {
      const severity = res.statusCode >= 400 ? 'ERROR' : res.statusCode >= 300 ? 'WARNING' : 'INFO';
      console.log(JSON.stringify({
        severity,
        message: `Request completed`,
        ...logData
      }));
    } else {
      const statusEmoji = res.statusCode < 300 ? '✅' : res.statusCode < 400 ? '⚠️' : '❌';
      console.log(`${statusEmoji} [${logData.timestamp}] ${req.method} ${req.url} - ${res.statusCode} (${duration}ms)`);
    }
  }

  // Log API calls
  logApiCall(endpoint, method, data = {}, response = null, error = null) {
    const logData = {
      timestamp: this.getTimestamp(),
      endpoint,
      method,
      environment: this.environment,
      data,
      response,
      error: error ? {
        message: error.message,
        stack: error.stack
      } : null
    };

    if (this.isGoogleCloud) {
      const severity = error ? 'ERROR' : 'INFO';
      console.log(JSON.stringify({
        severity,
        message: `API call to ${endpoint}`,
        ...logData
      }));
    } else {
      if (error) {
        console.error(`🌐 [${logData.timestamp}] API ${method} ${endpoint} - ERROR:`, error.message);
      } else {
        console.log(`🌐 [${logData.timestamp}] API ${method} ${endpoint} - Success`);
      }
    }
  }

  // Log performance metrics
  logPerformance(operation, duration, data = {}) {
    const logData = {
      timestamp: this.getTimestamp(),
      operation,
      duration: `${duration}ms`,
      environment: this.environment,
      ...data
    };

    if (this.isGoogleCloud) {
      console.log(JSON.stringify({
        severity: 'INFO',
        message: `Performance metric: ${operation}`,
        ...logData
      }));
    } else {
      const performanceEmoji = duration < 100 ? '⚡' : duration < 500 ? '🐌' : '🐌🐌';
      console.log(`${performanceEmoji} [${logData.timestamp}] ${operation} took ${duration}ms`);
    }
  }
}

// Create singleton instance
const logger = new Logger();

export default logger;