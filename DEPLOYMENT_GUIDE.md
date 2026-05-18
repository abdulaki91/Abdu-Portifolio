# Deployment Guide

## Backend Deployment Status

- **Backend URL**: https://myportfolio.backend.abdulaki.com/
- **Status**: Currently returning 503 Service Unavailable

## Troubleshooting Steps

### 1. Check Backend Dependencies

Ensure all dependencies are installed on the server:

```bash
npm install
```

### 2. Environment Configuration

Make sure these environment variables are set on your hosting server:

```env
# Database Configuration
DB_USER=abdulaki_abdulaki
DB_HOST=localhost
DB_PORT=5432
DB_PASS="Alhamdulillaah##91"
DB_NAME=abdulaki_my-portfolio
DB_SSL=false

# Disable SSH Tunnel for production
USE_SSH_TUNNEL=false

# API Port
PORT=5000

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Node Environment
NODE_ENV=production
```

### 3. Database Connection

Verify that:

- PostgreSQL database is running
- Database credentials are correct
- Database `abdulaki_my-portfolio` exists
- User `abdulaki_abdulaki` has proper permissions

### 4. Application Entry Point

Ensure your hosting provider is using the correct entry point:

- **Main file**: `server.cjs` (for cPanel/Passenger compatibility)
- **Alternative**: `index.js` (if ES modules are supported)

### 5. Node.js Version

Check that your hosting provider supports Node.js and the correct version.

## Frontend Deployment

### Current Configuration

- **Frontend**: Ready for deployment
- **API Base URL**: Configured to use `https://myportfolio.backend.abdulaki.com`

### Deployment Files

Upload the contents of the `dist/` folder to your main domain's public directory:

```
dist/index.html → public_html/index.html
dist/assets/ → public_html/assets/
dist/abdulhak.svg → public_html/abdulhak.svg
dist/profile.jpg → public_html/profile.jpg
dist/robots.txt → public_html/robots.txt
dist/sitemap.xml → public_html/sitemap.xml
dist/vite.svg → public_html/vite.svg
dist/PDF/ → public_html/PDF/
```

## Next Steps

1. **Fix Backend Issues**:
   - Check server logs for specific error messages
   - Verify database connection
   - Ensure all environment variables are set

2. **Test Backend Endpoints**:
   - Health check: `GET https://myportfolio.backend.abdulaki.com/`
   - API routes: `GET https://myportfolio.backend.abdulaki.com/api/`

3. **Deploy Frontend**:
   - Once backend is working, upload the `dist/` folder contents

## Common Hosting Provider Issues

### Shared Hosting

- May not support Node.js applications
- Limited environment variable configuration
- Restricted database access

### Solutions

- Contact hosting support for Node.js setup assistance
- Verify hosting plan includes Node.js support
- Check if additional configuration is needed for your hosting provider
