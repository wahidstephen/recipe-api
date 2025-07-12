# Railway Deployment Guide

This guide will help you deploy your NestJS Recipe API to Railway with MySQL database service via GitHub.

## Prerequisites

1. **Railway Account**: Create an account at [railway.app](https://railway.app)
2. **GitHub Repository**: Push your code to GitHub

## Step 1: Prepare Your Application

The application is already configured for Railway deployment with:
- ✅ Railway configuration (`railway.json`) with build commands and health checks
- ✅ Environment variables support for Railway MySQL service
- ✅ Production-ready TypeORM configuration with SSL support
- ✅ Health check endpoint (`/recipes/admin/test`)
- ✅ Nixpacks auto-detection for Node.js builds

## Step 2: Push to GitHub

Ensure your code is pushed to GitHub:
```bash
git push origin main
```

## Step 3: Create Railway Project from GitHub

1. **Go to Railway Dashboard**
   - Visit [railway.app](https://railway.app)
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Railway will automatically detect it's a Node.js project

## Step 4: Add MySQL Database Service

1. **From Railway Dashboard:**
   - Open your project dashboard
   - Click "Add Service"
   - Select "Database"
   - Choose "MySQL"
   - Railway will automatically create the database and provide connection details

## Step 5: Configure Environment Variables

Railway automatically provides the MySQL connection URL:
- `MYSQL_URL` - Complete connection string

**Additional variables to set in Railway Dashboard:**
- Go to your application service
- Click "Variables" tab
- Add: `NODE_ENV=production`
- Add: `RAILWAY_ENVIRONMENT=production`

## Step 6: Initialize Database Schema

After deployment, you need to run the database schema creation:

**Use Railway's Database Tools:**
- Go to your MySQL service in Railway dashboard
- Click "Data" tab
- Use the SQL editor to run the contents of `create.sql`

## Step 7: Deploy Your Application

**Automatic GitHub Deployment:**
- Push your code to GitHub: `git push origin main`
- Railway automatically detects changes and deploys
- Monitor the build progress in Railway dashboard
- Deployment typically takes 2-3 minutes

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
# Database Configuration (Railway-compatible)
MYSQL_URL=mysql://root:your_password@localhost:3306/recipe_db

# Application Configuration
PORT=3000
NODE_ENV=development
RAILWAY_ENVIRONMENT=development
```

### Railway Production (Auto-populated)
```env
# Database (automatically set by Railway MySQL service)
MYSQL_URL=mysql://username:password@host:port/database

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

### Useful Railway Dashboard Features

- **View Logs**: Go to your service → "Deployments" tab → Click on deployment
- **Open Service**: Click the generated URL in your service dashboard
- **View Environment Variables**: Service → "Variables" tab
- **Connect to Database**: MySQL service → "Data" tab for SQL editor
- **Deploy Changes**: Push to GitHub - automatic deployment
- **Check Status**: Service dashboard shows deployment status and health

## Production Considerations

### Security
- ✅ SSL/TLS enabled for database connections
- ✅ Environment variables for sensitive data
- ✅ Nixpacks secure container runtime
- ✅ Input validation with class-validator

### Performance
- ✅ Nixpacks optimized Node.js builds
- ✅ Production-optimized TypeORM configuration
- ✅ Proper health checks configured via `railway.json`
- ✅ CORS enabled for cross-origin requests

### Monitoring
- ✅ Health check endpoint at `/recipes/admin/test`
- ✅ Application logging enabled
- ✅ Database synchronization disabled in production
- ✅ Automatic deployments on GitHub push

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
- Check application logs in Railway dashboard → Deployments
- Verify database connectivity in MySQL service → Data tab
- Test endpoints using the health check route 