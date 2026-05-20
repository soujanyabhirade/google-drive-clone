# Google Drive Clone 🚀

A full-stack web application that mimics Google Drive functionality. Built with React, Node.js, PostgreSQL, and AWS S3.

## ✨ Features

### Core Features
- ✅ **User Authentication**: Secure register/login with JWT
- ✅ **File Management**: Upload, download, delete, rename files
- ✅ **Folder Organization**: Create, rename, delete folders with hierarchy
- ✅ **File Sharing**: Share files with custom permissions (VIEW, EDIT, ADMIN)
- ✅ **Search & Filter**: Search files and folders by name, type, date
- ✅ **Responsive UI**: Works on desktop and tablet
- ✅ **Real-time Updates**: WebSocket integration for live updates
- ✅ **File Preview**: View images, PDFs, and document previews

### Advanced Features (Coming Soon)
- 📋 Trash/Recycle bin with restore
- 📝 File versioning and history
- 🔄 Real-time collaboration
- 📱 Mobile app (React Native)
- 🌙 Dark mode

## 🛠️ Tech Stack

### Frontend
- **React** 18 with TypeScript
- **Redux Toolkit** for state management
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Axios** for API calls
- **Socket.io-client** for real-time updates

### Backend
- **Node.js** with Express.js
- **TypeScript** for type safety
- **PostgreSQL** for database
- **Prisma ORM** for database queries
- **AWS S3** for file storage
- **JWT** for authentication
- **Socket.io** for WebSocket

### DevOps
- **Docker** & **Docker Compose** for containerization
- **Environment variables** for configuration

## 📋 Prerequisites

- Node.js >= 16
- PostgreSQL >= 12 (or use Docker)
- AWS Account with S3 access
- Git

## 🚀 Quick Start

### Option 1: Using Docker (Recommended)

```bash
# Clone repository
git clone https://github.com/yourusername/google-drive-clone.git
cd google-drive-clone

# Copy environment file
cp .env.example .env

# Edit .env with your AWS S3 credentials and database URL
nano .env

# Start all services
docker-compose up
```

Then visit: **http://localhost:3000**

### Option 2: Manual Setup

#### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env with your credentials

# Run database migrations
npx prisma migrate dev --name init

# Generate Prisma client
npx prisma generate

# Start backend server
npm run dev
```

Backend will run on **http://localhost:5000**

#### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
echo "REACT_APP_API_URL=http://localhost:5000" > .env

# Start frontend
npm start
```

Frontend will run on **http://localhost:3000**

## 📁 Project Structure

```
google-drive-clone/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Route handlers
│   │   ├── middleware/      # Auth, validation, error handling
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   ├── types/           # TypeScript types
│   │   ├── utils/           # Helper functions
│   │   └── index.ts         # Entry point
│   ├── prisma/
│   │   ├── schema.prisma    # Database schema
│   │   └── migrations/      # Database migrations
│   ├── .env.example         # Environment template
│   ├── Dockerfile           # Backend container
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── store/           # Redux store
│   │   ├── services/        # API services
│   │   ├── types/           # TypeScript types
│   │   ├── utils/           # Helper functions
│   │   ├── App.tsx
│   │   └── index.tsx
│   ├── public/
│   ├── .env.example         # Environment template
│   ├── Dockerfile           # Frontend container
│   ├── tailwind.config.js
│   ├── package.json
│   └── tsconfig.json
│
├── docker-compose.yml       # Docker services
├── .gitignore
└── README.md
```

## 🔐 Environment Variables

### Backend (.env)
```
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/google_drive_clone"

# JWT
JWT_SECRET="your-secret-key-here-change-in-production"
JWT_EXPIRY="7d"

# AWS S3
AWS_ACCESS_KEY_ID="your-aws-key"
AWS_SECRET_ACCESS_KEY="your-aws-secret"
AWS_REGION="us-east-1"
AWS_S3_BUCKET="your-bucket-name"

# Server
PORT=5000
NODE_ENV="development"
CLIENT_URL="http://localhost:3000"
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_MAX_FILE_SIZE=104857600
```

## 📚 API Documentation

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh JWT token
- `POST /api/auth/logout` - Logout user

### Files
- `GET /api/files` - List files in folder
- `POST /api/files/upload` - Upload file
- `GET /api/files/:id/download` - Download file
- `DELETE /api/files/:id` - Delete file
- `PUT /api/files/:id` - Update file (rename)
- `POST /api/files/:id/share` - Share file

### Folders
- `GET /api/folders` - List all folders
- `POST /api/folders` - Create folder
- `DELETE /api/folders/:id` - Delete folder
- `PUT /api/folders/:id` - Update folder (rename)

### Sharing
- `GET /api/sharing` - List shared files
- `POST /api/sharing/:id/revoke` - Revoke share
- `PUT /api/sharing/:id` - Update permissions

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test

# E2E tests
npm run test:e2e
```

## 🔧 Development

### Database Migrations
```bash
# Create new migration
npx prisma migrate dev --name add_feature

# View database
npx prisma studio
```

### Code Quality
```bash
# Lint code
npm run lint

# Format code
npm run format

# Type check
npm run type-check
```

## 📦 Building for Production

### Backend
```bash
cd backend
npm run build
npm start
```

### Frontend
```bash
cd frontend
npm run build
# Serve with: npm install -g serve
serve -s build
```

## 🚢 Deployment

### Deploy to Heroku
```bash
heroku create your-app-name
heroku addons:create heroku-postgresql:hobby-dev
heroku config:set JWT_SECRET=your-secret
heroku config:set AWS_ACCESS_KEY_ID=your-key
# ... add other env variables
git push heroku main
```

### Deploy to AWS EC2
1. Create EC2 instance
2. Install Docker and Docker Compose
3. Clone repository
4. Set environment variables
5. Run `docker-compose up -d`

## 🐛 Troubleshooting

### PostgreSQL connection error
```bash
# Check if PostgreSQL is running
sudo service postgresql status

# Start PostgreSQL
sudo service postgresql start
```

### Port already in use
```bash
# Kill process on port 5000 (backend)
lsof -ti:5000 | xargs kill -9

# Kill process on port 3000 (frontend)
lsof -ti:3000 | xargs kill -9
```

### AWS S3 errors
- Verify AWS credentials in .env
- Check S3 bucket permissions
- Ensure bucket name is correct
- Check AWS region matches

### Docker issues
```bash
# Rebuild containers
docker-compose build --no-cache

# View logs
docker-compose logs -f

# Clean up
docker-compose down -v
```

## 📝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

MIT License - feel free to use this project for personal and commercial purposes.

## 🤝 Support

Have questions? Open an issue on GitHub or contact the maintainer.

## 🎯 Roadmap

- [ ] Advanced search with filters
- [ ] File versioning
- [ ] Trash functionality
- [ ] Real-time collaboration
- [ ] Mobile app
- [ ] Dark mode
- [ ] Activity log
- [ ] Backup & restore
- [ ] API rate limiting
- [ ] Admin dashboard

---

**Made with ❤️ by Soujanya Bhirade**
