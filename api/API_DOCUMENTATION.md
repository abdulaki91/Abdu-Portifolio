# Portfolio API Documentation

## Setup Instructions

### 1. Initialize Database

First, create all necessary tables:

```bash
POST http://localhost:5000/api/init
```

### 2. Register Admin User

Create your first admin account:

```bash
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "username": "admin",
  "email": "admin@abdulaki.com",
  "password": "your-secure-password"
}
```

Response:

```json
{
  "message": "Admin registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "admin": {
    "id": 1,
    "username": "admin",
    "email": "admin@abdulaki.com",
    "role": "admin"
  }
}
```

## Authentication

### Login

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@abdulaki.com",
  "password": "your-password"
}
```

### Get Profile

```bash
GET /api/auth/profile
Authorization: Bearer YOUR_JWT_TOKEN
```

### Verify Token

```bash
GET /api/auth/verify
Authorization: Bearer YOUR_JWT_TOKEN
```

## Projects API

### Get All Projects (Public)

```bash
GET /api/projects
```

### Get Single Project (Public)

```bash
GET /api/projects/:id
```

### Create Project (Admin Only)

```bash
POST /api/projects
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "title": "My Awesome Project",
  "description": "Short description",
  "fullDescription": "Detailed description",
  "features": ["Feature 1", "Feature 2"],
  "techStack": ["React", "Node.js", "PostgreSQL"],
  "githubLink": "https://github.com/username/repo",
  "liveLink": "https://project.abdulaki.com",
  "imageUrl": "https://example.com/image.jpg",
  "isFeatured": true,
  "displayOrder": 1
}
```

### Update Project (Admin Only)

```bash
PUT /api/projects/:id
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "title": "Updated Project Title",
  ...
}
```

### Delete Project (Admin Only)

```bash
DELETE /api/projects/:id
Authorization: Bearer YOUR_JWT_TOKEN
```

## Skills API

### Get All Skills (Public)

```bash
GET /api/skills
```

### Create Skill (Admin Only)

```bash
POST /api/skills
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "name": "React",
  "level": 90,
  "category": "Frontend",
  "icon": "react-icon",
  "displayOrder": 1
}
```

### Update Skill (Admin Only)

```bash
PUT /api/skills/:id
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "name": "React",
  "level": 95,
  "category": "Frontend"
}
```

### Delete Skill (Admin Only)

```bash
DELETE /api/skills/:id
Authorization: Bearer YOUR_JWT_TOKEN
```

## Experiences API

### Get All Experiences (Public)

```bash
GET /api/experiences
```

### Create Experience (Admin Only)

```bash
POST /api/experiences
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "title": "Senior Developer",
  "subtitle": "Company Name - 2023 to Present",
  "icon": "briefcase",
  "type": "work",
  "startDate": "2023-01-01",
  "endDate": null,
  "isCurrent": true,
  "description": "Job description",
  "displayOrder": 1
}
```

### Update Experience (Admin Only)

```bash
PUT /api/experiences/:id
Authorization: Bearer YOUR_JWT_TOKEN
```

### Delete Experience (Admin Only)

```bash
DELETE /api/experiences/:id
Authorization: Bearer YOUR_JWT_TOKEN
```

## Settings API

### Get All Settings (Public)

```bash
GET /api/settings
```

Response:

```json
{
  "settings": {
    "site_title": "Abdulaki Mohammed - Portfolio",
    "hero_title": "Hi, I'm Abdulaki Mohammed",
    "contact_email": "contact@abdulaki.com"
  }
}
```

### Update Setting (Admin Only)

```bash
POST /api/settings
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "key": "site_title",
  "value": "New Portfolio Title",
  "type": "text",
  "description": "Website title"
}
```

### Delete Setting (Admin Only)

```bash
DELETE /api/settings/:key
Authorization: Bearer YOUR_JWT_TOKEN
```

## Database Schema

### Admins Table

- id (SERIAL PRIMARY KEY)
- username (VARCHAR UNIQUE)
- email (VARCHAR UNIQUE)
- password (VARCHAR - hashed)
- role (VARCHAR)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

### Projects Table

- id (SERIAL PRIMARY KEY)
- title (VARCHAR)
- description (TEXT)
- full_description (TEXT)
- features (TEXT[])
- tech_stack (TEXT[])
- github_link (VARCHAR)
- live_link (VARCHAR)
- image_url (VARCHAR)
- is_featured (BOOLEAN)
- display_order (INTEGER)
- status (VARCHAR)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

### Skills Table

- id (SERIAL PRIMARY KEY)
- name (VARCHAR)
- level (INTEGER 0-100)
- category (VARCHAR)
- icon (VARCHAR)
- display_order (INTEGER)
- status (VARCHAR)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

### Experiences Table

- id (SERIAL PRIMARY KEY)
- title (VARCHAR)
- subtitle (TEXT)
- icon (VARCHAR)
- type (VARCHAR)
- start_date (DATE)
- end_date (DATE)
- is_current (BOOLEAN)
- description (TEXT)
- display_order (INTEGER)
- status (VARCHAR)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

### Settings Table

- id (SERIAL PRIMARY KEY)
- setting_key (VARCHAR UNIQUE)
- setting_value (TEXT)
- setting_type (VARCHAR)
- description (TEXT)
- updated_at (TIMESTAMP)

## Error Responses

### 400 Bad Request

```json
{
  "message": "Validation error message"
}
```

### 401 Unauthorized

```json
{
  "message": "Access token required"
}
```

### 403 Forbidden

```json
{
  "message": "Invalid or expired token"
}
```

### 404 Not Found

```json
{
  "message": "Resource not found"
}
```

### 500 Internal Server Error

```json
{
  "message": "Something went wrong!",
  "error": "Error details (development only)"
}
```

## Best Practices

1. **Always use HTTPS in production**
2. **Store JWT tokens securely** (httpOnly cookies or secure storage)
3. **Change JWT_SECRET** in production to a strong random string
4. **Use environment variables** for sensitive data
5. **Implement rate limiting** for API endpoints
6. **Add input validation** for all user inputs
7. **Use prepared statements** (already implemented with parameterized queries)
8. **Regular backups** of PostgreSQL database
9. **Monitor API logs** for suspicious activity
10. **Keep dependencies updated**
