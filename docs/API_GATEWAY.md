# EchoSelf API Gateway Documentation

## Overview

The EchoSelf API Gateway provides secure access to users' behavioral AI twins for external platforms and applications. It uses OAuth 2.0 for authentication and supports multiple integration patterns.

## Base URL

```
https://wbjzqmtwwzujbbxqvryi.supabase.co/functions/v1/
```

## Authentication

### OAuth 2.0 Flow

EchoSelf uses the OAuth 2.0 Authorization Code flow for secure authentication.

#### 1. Register Your Application

First, create an OAuth application in the EchoSelf dashboard:

```javascript
POST /api-gateway-oauth/applications
Authorization: Bearer USER_ACCESS_TOKEN

{
  "name": "Your App Name",
  "description": "Description of your integration",
  "platform_type": "api|email|chat|social",
  "redirect_uris": ["https://your-app.com/oauth/callback"],
  "scopes": ["read", "write"]
}
```

#### 2. Authorization Request

Redirect users to the authorization endpoint:

```
GET /api-gateway-oauth/authorize?
  response_type=code&
  client_id=YOUR_CLIENT_ID&
  redirect_uri=YOUR_REDIRECT_URI&
  scope=read write&
  state=RANDOM_STATE
```

#### 3. Exchange Authorization Code for Token

```javascript
POST /api-gateway-oauth/token

{
  "grant_type": "authorization_code",
  "code": "AUTHORIZATION_CODE",
  "client_id": "YOUR_CLIENT_ID",
  "client_secret": "YOUR_CLIENT_SECRET",
  "redirect_uri": "YOUR_REDIRECT_URI"
}
```

Response:
```json
{
  "access_token": "ACCESS_TOKEN",
  "refresh_token": "REFRESH_TOKEN",
  "token_type": "Bearer",
  "expires_in": 86400,
  "scope": "read write"
}
```

#### 4. Refresh Token

```javascript
POST /api-gateway-oauth/token

{
  "grant_type": "refresh_token",
  "refresh_token": "REFRESH_TOKEN",
  "client_id": "YOUR_CLIENT_ID",
  "client_secret": "YOUR_CLIENT_SECRET"
}
```

## Core API Endpoints

All API requests require the `Authorization: Bearer ACCESS_TOKEN` header.

### Chat with Echo

Send a message to a user's behavioral AI twin:

```javascript
POST /api-gateway/echo/chat
Authorization: Bearer ACCESS_TOKEN

{
  "message": "How should I respond to this email?",
  "context": "Professional email about project timeline",
  "platform_format": "email"
}
```

Response:
```json
{
  "response": "I'd suggest a professional and proactive response...",
  "metadata": {
    "user_id": "user-uuid",
    "timestamp": "2024-01-15T10:30:00Z",
    "platform": "email",
    "context": "Professional email about project timeline"
  }
}
```

### Get Echo Profile

Retrieve public information about a user's Echo:

```javascript
GET /api-gateway/echo/profile
Authorization: Bearer ACCESS_TOKEN
```

Response:
```json
{
  "communication_style": "professional",
  "personality_traits": ["analytical", "collaborative"],
  "interests": ["technology", "productivity"],
  "platform_preferences": {
    "email": "formal",
    "chat": "casual"
  },
  "created_at": "2024-01-01T00:00:00Z",
  "last_updated": "2024-01-15T00:00:00Z"
}
```

### Submit Behavioral Data

Contribute behavioral data to improve the Echo:

```javascript
POST /api-gateway/echo/behavioral-data
Authorization: Bearer ACCESS_TOKEN

{
  "data_type": "communication_pattern",
  "data_value": {
    "platform": "email",
    "response_time_minutes": 15,
    "tone": "professional",
    "length": "medium"
  },
  "platform_context": {
    "source": "gmail_integration",
    "thread_id": "thread-123"
  }
}
```

## Platform-Specific Endpoints

### Email Platform

Generate email content using the user's Echo:

```javascript
POST /api-gateway/platforms/email/compose
Authorization: Bearer ACCESS_TOKEN

{
  "recipient": "john@example.com",
  "subject": "Project Update",
  "context": "Weekly status update to stakeholder"
}
```

Response:
```json
{
  "email": {
    "to": "john@example.com",
    "subject": "Project Update",
    "body": "Hi John,\n\nI wanted to provide you with a quick update...",
    "format": "text"
  }
}
```

### Slack Platform

Generate Slack messages:

```javascript
POST /api-gateway/platforms/slack/message
Authorization: Bearer ACCESS_TOKEN

{
  "channel": "#general",
  "context": "Announcing new feature release",
  "thread_ts": "1234567890.123456"
}
```

Response:
```json
{
  "slack_message": {
    "channel": "#general",
    "text": "Hey team! 🎉 Excited to announce...",
    "thread_ts": "1234567890.123456"
  }
}
```

### Discord Platform

Generate Discord messages:

```javascript
POST /api-gateway/platforms/discord/message
Authorization: Bearer ACCESS_TOKEN

{
  "channel_id": "123456789",
  "context": "Responding to community question"
}
```

Response:
```json
{
  "discord_message": {
    "channel_id": "123456789",
    "content": "Great question! Here's how I'd approach this..."
  }
}
```

## Integration Management

### List Integrations

Get user's active platform integrations:

```javascript
GET /api-gateway/integrations
Authorization: Bearer ACCESS_TOKEN
```

Response:
```json
[
  {
    "id": "integration-uuid",
    "platform_type": "gmail",
    "platform_username": "user@gmail.com",
    "is_active": true,
    "last_sync_at": "2024-01-15T10:00:00Z",
    "created_at": "2024-01-01T00:00:00Z"
  }
]
```

### Create Integration

Register a new platform integration:

```javascript
POST /api-gateway/integrations
Authorization: Bearer ACCESS_TOKEN

{
  "platform_type": "slack",
  "platform_user_id": "U1234567890",
  "platform_username": "johndoe",
  "integration_data": {
    "workspace_id": "T1234567890",
    "permissions": ["read", "write"]
  }
}
```

## Rate Limits

- Default: 1000 requests per hour per application
- Rate limit headers are included in responses:
  - `X-RateLimit-Limit`: Request limit per hour
  - `X-RateLimit-Remaining`: Remaining requests
  - `X-RateLimit-Reset`: Unix timestamp when limit resets

When rate limit is exceeded:
```json
{
  "error": "Rate limit exceeded",
  "limit": 1000,
  "reset_time": "2024-01-15T11:00:00Z"
}
```

## Error Handling

All errors follow a consistent format:

```json
{
  "error": "error_code",
  "message": "Human readable error message",
  "details": {
    "field": "Additional error details"
  }
}
```

Common HTTP status codes:
- `400`: Bad Request - Invalid parameters
- `401`: Unauthorized - Invalid or missing token
- `403`: Forbidden - Insufficient permissions
- `404`: Not Found - Resource doesn't exist
- `429`: Too Many Requests - Rate limit exceeded
- `500`: Internal Server Error - Server error

## Webhooks (Coming Soon)

EchoSelf will support webhooks for real-time notifications:

- User behavioral pattern updates
- Echo training completion
- New integration authorizations

## SDKs and Libraries

### JavaScript/Node.js

```javascript
npm install @echoself/api-client
```

```javascript
import { EchoSelfClient } from '@echoself/api-client';

const client = new EchoSelfClient({
  accessToken: 'YOUR_ACCESS_TOKEN'
});

const response = await client.echo.chat({
  message: 'Hello Echo!',
  context: 'casual conversation'
});
```

### Python

```python
pip install echoself-api
```

```python
from echoself import EchoSelfClient

client = EchoSelfClient(access_token='YOUR_ACCESS_TOKEN')

response = client.echo.chat(
    message='Hello Echo!',
    context='casual conversation'
)
```

## Example Integrations

### Gmail Auto-Reply

```javascript
// Gmail integration using EchoSelf API
async function generateReply(email) {
  const response = await fetch('/api-gateway/platforms/email/compose', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      recipient: email.from,
      subject: `Re: ${email.subject}`,
      context: `Replying to email about: ${email.summary}`
    })
  });
  
  const data = await response.json();
  return data.email.body;
}
```

### Slack Bot

```javascript
// Slack bot integration
app.message(async ({ message, say }) => {
  if (message.text.includes('@echo')) {
    const response = await fetch('/api-gateway/platforms/slack/message', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        channel: message.channel,
        context: `Responding to: ${message.text}`
      })
    });
    
    const data = await response.json();
    await say(data.slack_message.text);
  }
});
```

## Security Best Practices

1. **Store credentials securely**: Never expose client secrets in client-side code
2. **Use HTTPS**: All API calls must use HTTPS
3. **Validate redirects**: Only use registered redirect URIs
4. **Token rotation**: Regularly refresh access tokens
5. **Scope limitation**: Request minimal required scopes
6. **Rate limiting**: Implement client-side rate limiting

## Support

- API Documentation: [https://docs.echoself.com/api](https://docs.echoself.com/api)
- Developer Forum: [https://community.echoself.com](https://community.echoself.com)
- Support Email: api-support@echoself.com

## Changelog

### Version 1.0.0 (Current)
- Initial API Gateway release
- OAuth 2.0 authentication
- Core Echo endpoints
- Platform-specific integrations
- Rate limiting and security features