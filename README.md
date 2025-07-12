# Recipe API

A production-ready Recipe API built with NestJS, TypeORM, and MySQL. Features comprehensive CRUD operations, input validation, error handling, and extensive test coverage.

## Features

- ✅ **CRUD Operations**: Create, read, update, delete recipes
- ✅ **Data Validation**: Class-validator with comprehensive input validation
- ✅ **Database Integration**: TypeORM with MySQL support
- ✅ **Error Handling**: Centralized error messages and proper HTTP status codes
- ✅ **Testing**: Unit tests (18) and E2E tests (11) with 100% coverage
- ✅ **Health Checks**: Built-in health monitoring endpoint
- ✅ **Production Ready**: Railway deployment configuration included

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/recipes` | List all recipes |
| `GET` | `/recipes/:id` | Get recipe by ID |
| `POST` | `/recipes` | Create new recipe |
| `PATCH` | `/recipes/:id` | Update recipe |
| `DELETE` | `/recipes/:id` | Delete recipe |
| `GET` | `/recipes/admin/test` | Health check |

## Project Setup

```bash
$ npm install
```

## Environment Configuration

Copy `.env.example` to `.env` and configure your database:

```env
# REQUIRED - Database connection string
MYSQL_URL=mysql://root:your_password@localhost:3306/recipe_db

# OPTIONAL - Application settings
PORT=3000
RAILWAY_ENVIRONMENT=development
```

**⚠️ Important**: `MYSQL_URL` is required. The application will fail to start with a clear error message if this environment variable is not provided.

## Database Setup

Run the SQL commands from `create.sql` to set up your database schema and seed data.

## Development

```bash
# development mode
$ npm run start:dev

# production mode
$ npm run start:prod

# build for production
$ npm run build
```

## Testing

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

This application is configured for Railway deployment via GitHub. See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## Technology Stack

- **Framework**: NestJS
- **Database**: MySQL with TypeORM
- **Validation**: class-validator
- **Testing**: Jest (unit & E2E)
- **Deployment**: Railway

## License

This project is [MIT licensed](LICENSE).
