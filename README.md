# TodoList App

A full-stack todo application with authentication built with React, TypeScript, Express, and SQLite.

## Tech Stack

**Frontend:**
- React 18 + TypeScript
- Vite
- Tailwind CSS v4
- shadcn/ui components

**Backend:**
- Node.js + Express
- TypeScript
- SQLite (better-sqlite3)
- JWT authentication

**DevOps:**
- Docker + Docker Compose

## Project Structure

```
to-do-app/
├── frontend/                # React frontend
│   ├── src/
│   │   ├── api/            # API client
│   │   ├── components/     # Reusable components
│   │   ├── context/        # React contexts
│   │   ├── hooks/          # Custom hooks
│   │   ├── layouts/        # Page layouts
│   │   ├── pages/          # Page components
│   │   ├── routes/         # Route configuration
│   │   └── types/          # TypeScript types
│   ├── Dockerfile
│   └── nginx.conf
├── backend/                 # Express backend
│   ├── src/
│   │   ├── controllers/    # HTTP handlers
│   │   ├── services/       # Business logic
│   │   ├── repositories/   # Data access
│   │   ├── routes/         # Route definitions
│   │   ├── middleware/     # Express middleware
│   │   ├── db/             # Database setup
│   │   └── types/          # TypeScript types
│   └── Dockerfile
└── docker-compose.yml
```

## Prerequisites

- Node.js 20+
- npm or yarn
- Docker & Docker Compose (for containerized deployment)

## Installation

### Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd to-do-app
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   ```

3. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   ```

4. **Run Development Servers**

   Terminal 1 - Backend:
   ```bash
   cd backend
   npm run dev
   ```

   Terminal 2 - Frontend:
   ```bash
   cd frontend
   npm run dev
   ```

5. **Access the app**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

### Docker Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd to-do-app
   ```

2. **Create environment file**
   ```bash
   cp .env.example .env
   ```

3. **Build and run containers**
   ```bash
   docker-compose up --build
   ```

4. **Access the app**
   - App: http://localhost

## Environment Variables

### Backend (.env)
```
PORT=3001
JWT_SECRET=your-super-secret-jwt-key-change-in-production
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:3001/api
```

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |

### Todos (requires authentication)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/todos` | Get all todos |
| POST | `/api/todos` | Create a todo |
| PUT | `/api/todos/:id` | Update a todo |
| DELETE | `/api/todos/:id` | Delete a todo |

### Health Check
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Check API status |

## Scripts

### Backend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
```

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Features

- User registration and login
- JWT-based authentication
- Create, read, update, delete todos
- Mark todos as complete/incomplete
- Double-click to edit todo title
- Delete confirmation dialog
- Responsive design

## License

MIT
