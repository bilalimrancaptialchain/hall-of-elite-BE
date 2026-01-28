# Hall of Elite API - Postman Collection

This directory contains Postman collection and environment files for testing all Hall of Elite backend API endpoints.

## Files

- **`Hall_of_Elite_API.postman_collection.json`** - Complete API collection with all endpoints
- **`Hall_of_Elite_Environment.postman_environment.json`** - Development environment variables

## Setup Instructions

### 1. Import Collection

1. Open Postman
2. Click **Import** button
3. Select `Hall_of_Elite_API.postman_collection.json`
4. Collection will appear in your Postman workspace

### 2. Import Environment

1. Click **Environments** in left sidebar
2. Click **Import**
3. Select `Hall_of_Elite_Environment.postman_environment.json`
4. Select the environment from dropdown (top right) to activate it

### 3. Configure Base URL

The default base URL is set to `http://localhost:6200`. To change it:

1. Select the environment from dropdown
2. Click **Edit** (pencil icon)
3. Update `baseUrl` variable
4. Save changes

## API Endpoints Overview

### Health
- **GET** `/health` - Server health check

### Authentication
- **POST** `/auth/register` - Register new user
- **POST** `/auth/login` - Login and get JWT token (auto-saves token to environment)
- **POST** `/auth/logout` - Logout

### Elite Traders
- **GET** `/elite/traders` - Get paginated list of traders (query: `page`, `limit`, `tier`)
- **GET** `/elite/traders/:id` - Get trader profile by ID

### Rewards
- **GET** `/rewards/traders/:id` - Get reward eligibility for trader

### Admin
- **GET** `/admin/tiers` - Get all tier configurations
- **GET** `/admin/tiers/:id` - Get tier config by ID
- **GET** `/admin/rewards` - Get all reward configurations

### MT5
- **GET** `/mt5/status` - Get MT5 connection status
- **POST** `/mt5/connect` - Connect to MT5 server
- **POST** `/mt5/disconnect` - Disconnect from MT5
- **GET** `/mt5/accounts` - Get all MT5 accounts
- **GET** `/mt5/trades/:accountId` - Get trades for account (query: `startDate`, `endDate`)

### Scoring
- **POST** `/scoring/run` - Run full scoring pipeline (metrics → eligibility → scoring → tier → ranking → snapshot)

## Testing Workflow

### 1. Health Check
Start by testing the health endpoint to ensure server is running.

### 2. Authentication Flow
1. **Register** a new user (or use existing credentials)
2. **Login** - This will automatically save the JWT token to the `authToken` environment variable
3. All subsequent requests will use this token automatically

### 3. Test Protected Endpoints
Once authenticated, you can test:
- Elite Traders endpoints
- Rewards endpoints
- Admin endpoints
- MT5 endpoints
- Scoring endpoints

## Request Examples

### Register Request Body
```json
{
  "email": "trader@example.com",
  "password": "SecurePass123",
  "displayName": "John Trader"
}
```

**Password Requirements:**
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number

### Login Request Body
```json
{
  "email": "trader@example.com",
  "password": "SecurePass123"
}
```

### Get Traders Query Parameters
- `page` (optional, default: 1) - Page number
- `limit` (optional, default: 10) - Items per page
- `tier` (optional) - Filter by tier: BRONZE, SILVER, GOLD, PLATINUM, DIAMOND, ELITE

### Get Trades Query Parameters
- `startDate` (optional) - ISO 8601 format: `YYYY-MM-DD` or `YYYY-MM-DDTHH:mm:ssZ`
- `endDate` (optional) - ISO 8601 format: `YYYY-MM-DD` or `YYYY-MM-DDTHH:mm:ssZ`

## Environment Variables

The collection uses these environment variables:

- **`baseUrl`** - API base URL (default: `http://localhost:6200`)
- **`authToken`** - JWT token (auto-populated after login)
- **`userId`** - User ID (auto-populated after login)

## Notes

- The **Login** request includes a test script that automatically saves the JWT token to the environment
- All protected endpoints use `Bearer {{authToken}}` in the Authorization header
- Replace `:id` path variables with actual UUIDs when testing
- Date parameters should be in ISO 8601 format

## Troubleshooting

### Token Not Working
1. Make sure you've run the **Login** request first
2. Check that the environment is selected (top right dropdown)
3. Verify `authToken` variable is set in the environment

### 401 Unauthorized
- Token may have expired (default: 7 days)
- Re-run the **Login** request to get a new token

### 404 Not Found
- Verify the server is running on the correct port
- Check that `baseUrl` environment variable is correct

### 500 Server Error
- Check server logs for detailed error messages
- Verify database connection is working
- Ensure all required environment variables are set in `.env` file

## Production Environment

To test against production:

1. Create a new environment in Postman
2. Set `baseUrl` to your production API URL
3. Update other variables as needed
4. Use production credentials for authentication
