# Railway Deployment Guide

This guide will help you deploy your NestJS Recipe API to Railway with MySQL database service.

## Prerequisites

1. **Railway Account**: Create an account at [railway.app](https://railway.app)
2. **Railway CLI**: Install the Railway CLI globally:
   ```bash
   npm install -g @railway/cli
   ```

## Step 1: Prepare Your Application

The application is already configured for Railway deployment with:
- ✅ Railway configuration (`railway.json`)
- ✅ Docker configuration (`Dockerfile` and `.dockerignore`)
- ✅ Environment variables support for Railway MySQL service
- ✅ Production-ready TypeORM configuration with SSL support
- ✅ Health check endpoint (`/recipes/admin/test`)

## Step 2: Login to Railway

```bash
npm run railway:login
# or
railway login
```

## Step 3: Create a New Railway Project

1. **Option A: Deploy from GitHub (Recommended)**
   - Push your code to GitHub
   - Go to [railway.app](https://railway.app)
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

2. **Option B: Deploy from CLI**
   ```bash
   railway init
   railway link
   ```

## Step 4: Add MySQL Database Service

1. **From Railway Dashboard:**
   - Open your project dashboard
   - Click "Add Service"
   - Select "Database"
   - Choose "MySQL"
   - Railway will automatically create the database and provide connection details

2. **From CLI:**
   ```bash
   railway add --database mysql
   ```

## Step 5: Configure Environment Variables

Railway automatically provides MySQL connection variables:
- `MYSQL_URL`
- `MYSQLHOST`
- `MYSQLPORT`
- `MYSQLUSER`
- `MYSQLPASSWORD`
- `MYSQLDATABASE`

**Additional variables to set:**
```bash
railway variables set NODE_ENV=production
railway variables set RAILWAY_ENVIRONMENT=production
```

## Step 6: Initialize Database Schema

After deployment, you need to run the database schema creation:

1. **Option A: Use Railway's Database Tools**
   - Go to your MySQL service in Railway dashboard
   - Click "Data" tab
   - Use the SQL editor to run the contents of `create.sql`

2. **Option B: Connect via CLI**
   ```bash
   railway connect mysql
   ```
   Then run your SQL commands from `create.sql`

## Step 7: Deploy Your Application

1. **From GitHub (if using Option A):**
   - Push your code to GitHub
   - Railway will automatically build and deploy

2. **From CLI:**
   ```bash
   npm run railway:deploy
   # or
   railway deploy
   ```

## Step 8: Verify Deployment

1. **Check the deployment URL** provided by Railway
2. **Test the health endpoint:**
   ```
   https://your-app-url.railway.app/recipes/admin/test
   ```
3. **Test the API endpoints:**
   ```
   GET https://your-app-url.railway.app/recipes
   POST https://your-app-url.railway.app/recipes
   ```

## Environment Variables Reference

The application uses Railway's environment variable names consistently for both local and production environments:

### Local Development
```env
# Database Configuration (Railway-compatible names)
MYSQL_URL=mysql://root:password@localhost:3306/recipe_db
MYSQLHOST=localhost
MYSQLPORT=3306
MYSQLUSER=root
MYSQLPASSWORD=your_password
MYSQLDATABASE=recipe_db

# Application Configuration
PORT=3000
NODE_ENV=development
RAILWAY_ENVIRONMENT=development
```

### Railway Production (Auto-populated)
```env
# Database (automatically set by Railway MySQL service)
MYSQL_URL=mysql://username:password@host:port/database
MYSQLHOST=railway_mysql_host
MYSQLPORT=3306
MYSQLUSER=railway_user
MYSQLPASSWORD=railway_password
MYSQLDATABASE=railway_database

# Application (set manually)
NODE_ENV=production
RAILWAY_ENVIRONMENT=production
PORT=3000  # Auto-detected by Railway
```

## Troubleshooting

### Common Issues

1. **Database Connection Issues**
   - Verify MySQL service is running in Railway dashboard
   - Check that environment variables are properly set
   - Ensure SSL configuration is correct for production

2. **Build Failures**
   - Check build logs in Railway dashboard
   - Verify all dependencies are in `package.json`
   - Ensure TypeScript builds without errors locally

3. **Health Check Failures**
   - Test the health endpoint: `/recipes/admin/test`
   - Check application logs for startup errors
   - Verify the port configuration

### Useful Commands

```bash
# View logs
railway logs

# Open service in browser
railway open

# View environment variables
railway variables

# Connect to database
railway connect mysql

# Deploy latest changes
railway deploy

# Check service status
railway status
```

## Production Considerations

### Security
- ✅ SSL/TLS enabled for database connections
- ✅ Environment variables for sensitive data
- ✅ Non-root user in Docker container
- ✅ Input validation with class-validator

### Performance
- ✅ Multi-stage Docker build for smaller image size
- ✅ Production-optimized TypeORM configuration
- ✅ Proper health checks configured
- ✅ CORS enabled for cross-origin requests

### Monitoring
- ✅ Health check endpoint at `/recipes/admin/test`
- ✅ Application logging enabled
- ✅ Database synchronization disabled in production

## API Documentation

Once deployed, your API will be available at:
- **Base URL**: `https://your-app-url.railway.app`
- **Health Check**: `GET /recipes/admin/test`
- **List Recipes**: `GET /recipes`
- **Create Recipe**: `POST /recipes`
- **Get Recipe**: `GET /recipes/:id`
- **Update Recipe**: `PATCH /recipes/:id`
- **Delete Recipe**: `DELETE /recipes/:id`

## Support

For Railway-specific issues:
- [Railway Documentation](https://docs.railway.app)
- [Railway Discord Community](https://discord.gg/railway)
- [Railway Status Page](https://status.railway.app)

For application issues:
- Check the application logs via `railway logs`
- Verify database connectivity
- Test endpoints using the health check route 