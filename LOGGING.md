# Server Logging System

This application includes a comprehensive logging system that works seamlessly across both local development and Google Cloud environments.

## Features

### 🔍 Request Logging
- **All HTTP requests** (GET, POST, PUT, DELETE, etc.) are automatically logged
- **Request details** including method, URL, headers, IP address, and user agent
- **Request body** for POST requests
- **Unique request IDs** for tracking requests through the system
- **Response status codes** and timing information

### 🌍 Environment Detection
The system automatically detects the environment:
- **Local Development**: Human-readable console output with emojis
- **Google Cloud**: Structured JSON logging for Cloud Logging integration

### 📊 Performance Monitoring
- **Request duration** tracking
- **Memory usage** monitoring
- **Uptime** tracking
- **Performance metrics** for API calls

## Local Development Logging

When running locally, you'll see colorful, emoji-rich logs:

```
🚀 [2024-01-15T10:30:45.123Z] GET /api/health
📍 Environment: Local
🆔 Request ID: abc123def456
🌐 IP: ::1
👤 User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)...

✅ [2024-01-15T10:30:45.145Z] GET /api/health - 200 (22ms)

🚀 [2024-01-15T10:30:46.789Z] POST /api/rewrite
📍 Environment: Local
🆔 Request ID: xyz789ghi012
🌐 IP: ::1
👤 User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)...
📦 Request Body: {
  "text": "Hello world"
}

✅ [2024-01-15T10:30:47.123Z] POST /api/rewrite - 200 (334ms)
```

## Google Cloud Logging

In Google Cloud, logs are structured as JSON for easy filtering and analysis:

```json
{
  "severity": "INFO",
  "timestamp": "2024-01-15T10:30:45.123Z",
  "message": "Incoming GET request",
  "requestId": "abc123def456",
  "environment": "Google Cloud",
  "method": "GET",
  "url": "/api/health",
  "path": "/api/health",
  "query": {},
  "headers": {
    "user-agent": "Mozilla/5.0...",
    "x-forwarded-for": "203.0.113.1",
    "content-type": "application/json"
  },
  "ip": "203.0.113.1"
}
```

## Available Endpoints

### Health Check
```
GET /api/health
```
Returns server health information including:
- Environment
- Uptime
- Memory usage
- Node.js version

### Text Rewrite API
```
POST /api/rewrite
Content-Type: application/json

{
  "text": "Your text to rewrite"
}
```

## Logging Levels

### Local Development
- 🚀 **Request Start**: Incoming requests
- ✅ **Success**: 2xx status codes
- ⚠️ **Warning**: 3xx status codes  
- ❌ **Error**: 4xx/5xx status codes
- 💥 **Exception**: Server errors
- 🏥 **Health**: Health check requests
- 🌐 **API**: External API calls
- ⚡ **Performance**: Fast operations (< 100ms)
- 🐌 **Performance**: Slow operations (100-500ms)
- 🐌🐌 **Performance**: Very slow operations (> 500ms)

### Google Cloud
- **INFO**: Normal operations, successful requests
- **WARNING**: 3xx redirects, non-critical issues
- **ERROR**: 4xx/5xx errors, exceptions

## Environment Variables

The logging system uses these environment variables for detection:

- `GOOGLE_CLOUD_PROJECT`: Google Cloud project ID
- `K_SERVICE`: Cloud Run service name
- `K_REVISION`: Cloud Run revision

## Custom Logging

You can use the logger utility in your code:

```javascript
import logger from './utils/logger.js';

// Log info
logger.info('User logged in', { userId: 123, timestamp: Date.now() });

// Log warnings
logger.warn('API rate limit approaching', { currentUsage: 95, limit: 100 });

// Log errors
logger.error('Database connection failed', error, { retryCount: 3 });

// Log API calls
logger.logApiCall('/api/users', 'GET', {}, response, null);

// Log performance
logger.logPerformance('Database query', 150, { table: 'users', rows: 1000 });
```

## Monitoring and Alerts

### Google Cloud Logging Queries

Find all errors:
```
severity>=ERROR
```

Find slow requests (> 1 second):
```
jsonPayload.duration:>1000
```

Find requests by IP:
```
jsonPayload.ip="203.0.113.1"
```

Find requests by endpoint:
```
jsonPayload.url="/api/rewrite"
```

### Performance Monitoring

Track response times:
```
jsonPayload.duration
```

Monitor memory usage:
```
jsonPayload.memory
```

Check uptime:
```
jsonPayload.uptime
```

## Best Practices

1. **Don't log sensitive data** (passwords, tokens, personal info)
2. **Use appropriate log levels** (INFO, WARN, ERROR)
3. **Include context** in log messages
4. **Monitor log volume** to avoid excessive costs
5. **Set up alerts** for critical errors
6. **Regular log analysis** for performance optimization

## Troubleshooting

### Logs not appearing
- Check if the server is running
- Verify environment variables are set
- Check console output for errors

### Google Cloud logs missing
- Verify the service has proper IAM permissions
- Check if logs are being sent to the correct project
- Ensure structured logging format is correct

### Performance issues
- Monitor log volume and frequency
- Consider log sampling for high-traffic applications
- Use log aggregation for better performance