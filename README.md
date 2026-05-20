# 🚀 Google Drive Clone

A full-stack file storage application built with React, Express, PostgreSQL, and AWS S3.

## 📋 Features

✅ **User Authentication**
- User registration and login
- JWT-based authentication
- Secure password hashing with bcryptjs

✅ **File Management**
- Upload files with drag-and-drop
- Delete files
- Download files
- View file metadata

✅ **Folder Management**
- Create folders
- Delete folders
- Nested folder structure
- Organize files by folders

✅ **File Sharing**
- Share files with other users
- Set permissions (VIEW, EDIT, ADMIN)
- Revoke shares

✅ **Real-time Updates**
- WebSocket integration with Socket.io
- Real-time file upload/delete notifications

✅ **Responsive Design**
- Mobile-friendly UI
- Tailwind CSS styling
- Intuitive dashboard

## 🛠️ Tech Stack

**Frontend:**
- React 18
- TypeScript
- Redux Toolkit
- Tailwind CSS
- Axios
- Socket.io Client

**Backend:**
- Node.js + Express
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT Authentication
- AWS S3 (optional)
- Socket.io

**DevOps:**
- Docker
- Docker Compose
- PostgreSQL Docker Image

## 📦 Installation

### Prerequisites
- Node.js 18+
- Docker & Docker Compose (optional)
- PostgreSQL 15+ (or use Docker)
- AWS Account (optional, for S3)

### Quick Start with Docker (Recommended)

```bash
# 1. Clone the repository
git clone https://github.com/soujanyabhirade/google-drive-clone.git
cd google-drive-clone

# 2. Setup environment variables
cp .env.example .env

# 3. Start all services
docker-compose up

# 4. Run database migrations (in another terminal)
docker exec google-drive-backend npx prisma migrate dev --name init
```

Then visit: **http://localhost:3000**

### Manual Setup

#### Backend

```bash
cd backend

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your database URL and other configs

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# Start development server
npm run dev
```

#### Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

## 🔑 Environment Variables

### Backend (.env)
```env
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/google_drive_clone
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRY=7d
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-bucket-name
FRONTEND_URL=http://localhost:3000
MAX_FILE_SIZE=52428800
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000
```

## 📚 API Documentation

### Authentication

**Register**
```
POST /api/auth/register
Body: { email, password, firstName, lastName }
```

**Login**
```
POST /api/auth/login
Body: { email, password }
```

### Files

**Get Files**
```
GET /api/files?folderId=<optional>
Headers: { Authorization: Bearer <token> }
```

**Upload File**
```
POST /api/files/upload
Headers: { Authorization: Bearer <token> }
Body: FormData { file, folderId: <optional> }
```

**Delete File**
```
DELETE /api/files/<fileId>
Headers: { Authorization: Bearer <token> }
```

### Folders

**Get Folders**
```
GET /api/folders
Headers: { Authorization: Bearer <token> }
```

**Create Folder**
```
POST /api/folders
Headers: { Authorization: Bearer <token> }
Body: { name, parentId: <optional> }
```

**Delete Folder**
```
DELETE /api/folders/<folderId>
Headers: { Authorization: Bearer <token> }
```

### Sharing

**Share File**
```
POST /api/sharing/share
Headers: { Authorization: Bearer <token> }
Body: { fileId, userId, permission }
```

**Get Shares**
```
GET /api/sharing/<fileId>
Headers: { Authorization: Bearer <token> }
```

**Revoke Share**
```
DELETE /api/sharing/<shareId>
Headers: { Authorization: Bearer <token> }
```

## 🐛 Troubleshooting

### "Cannot find module" errors
```bash
# Reinstall dependencies
cd backend
rm -rf node_modules package-lock.json
npm install

# Generate Prisma client
npx prisma generate
```

### Database connection errors
```bash
# Check PostgreSQL is running
# If using Docker:
docker logs google-drive-db

# Verify DATABASE_URL in .env
echo $DATABASE_URL
```

### Port already in use
```bash
# Change port in .env or docker-compose.yml
# Then restart services
docker-compose restart
```

### Frontend can't connect to backend
```bash
# Check REACT_APP_API_URL in frontend .env
# Should match your backend URL
# Rebuild frontend
cd frontend
npm run build
```

## 🚀 Deployment

### Deploy Backend to Heroku

```bash
# 1. Create Heroku app
heroku create your-app-name

# 2. Add PostgreSQL addon
heroku addons:create heroku-postgresql:hobby-dev

# 3. Set environment variables
heroku config:set JWT_SECRET=your-secret
heroku config:set FRONTEND_URL=your-frontend-url

# 4. Deploy
git push heroku main
```

### Deploy Frontend to Vercel

```bash
# 1. Push to GitHub
git push origin main

# 2. Connect to Vercel
# Visit https://vercel.com/import
# Select your repository

# 3. Add environment variables
REACT_APP_API_URL=your-backend-url

# 4. Deploy
```

## 📈 Future Enhancements

- [ ] File preview (images, PDFs, documents)
- [ ] Advanced search and filtering
- [ ] File versioning and restore
- [ ] Trash/Recycle bin
- [ ] Real-time collaboration
- [ ] Dark mode
- [ ] Mobile app (React Native)
- [ ] Comments and annotations
- [ ] Advanced sharing options
- [ ] Activity log

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 💬 Support

If you have any questions or issues, please open an issue on GitHub.

---

**Built with ❤️ by Soujanya Bhirade**
