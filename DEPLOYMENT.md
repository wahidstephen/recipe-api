# Deployment Guide

Deploy your Recipe API to Railway with MySQL database via GitHub.

## Prerequisites

- Railway account at [railway.app](https://railway.app)
- Code pushed to GitHub repository

## Quick Start

### 1. Create Railway Project

1. Go to [railway.app](https://railway.app) → "New Project"
2. Select "Deploy from GitHub repo" → Choose your repository
3. Railway auto-detects Node.js and uses the `railway.json` configuration

### 2. Add MySQL Database

1. In your Railway project dashboard → "Add Service" → "Database" → "MySQL"
2. Railway automatically provides the `MYSQL_URL` environment variable

### 3. Configure Environment Variables

In your Railway service → "Variables" tab, add:
```
NODE_ENV=production
RAILWAY_ENVIRONMENT=production
```

### 4. Initialize Database

1. Go to MySQL service → "Data" tab
2. Run the SQL commands from `create.sql` file

### 5. Deploy

Push to GitHub - Railway deploys automatically:
```bash
git push origin main
```

## Environment Variables

### Local Development
```env
MYSQL_URL=mysql://root:password@localhost:3306/recipe_db
PORT=3000
NODE_ENV=development
RAILWAY_ENVIRONMENT=development
```

### Production (Railway)
```env
MYSQL_URL=mysql://user:pass@host:port/db  # Auto-provided
NODE_ENV=production                        # Set manually
RAILWAY_ENVIRONMENT=production             # Set manually
PORT=3000                                  # Auto-detected
```

## Verification

After deployment, test these endpoints:
- Health check: `https://your-app.railway.app/recipes/admin/test`
- List recipes: `https://your-app.railway.app/recipes`

## Troubleshooting

**Build Issues:**
- Check Railway dashboard → Service → "Deployments" → Build logs
- Ensure `npm run build` works locally

**Database Issues:**
- Verify MySQL service is running in Railway dashboard
- Check `MYSQL_URL` is set correctly
- Test database connection in MySQL service → "Data" tab

**App Issues:**
- Check application logs in Railway dashboard
- Verify health endpoint responds: `/recipes/admin/test`
- Ensure environment variables are set

## Railway Features

- **Auto-deploy**: Push to GitHub triggers deployment
- **Logs**: Service → "Deployments" → Click deployment
- **Database**: MySQL service → "Data" tab for SQL editor
- **Monitoring**: Built-in metrics and health checks

## API Documentation

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/recipes` | GET | List all recipes |
| `/recipes/:id` | GET | Get recipe by ID |
| `/recipes` | POST | Create recipe |
| `/recipes/:id` | PATCH | Update recipe |
| `/recipes/:id` | DELETE | Delete recipe |
| `/recipes/admin/test` | GET | Health check |

For detailed API usage, see the main [README.md](./README.md). 