# Visual Learning - Learn Programming Concepts the Fun Way

A visual learning platform that helps developers understand programming concepts through metaphors and interactive examples.

## Project Structure

- **Client**: React application with TypeScript and Vite
- **Server**: Express.js API server with TypeScript
- **Data**: Programming concepts stored in JSON format

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install all dependencies:
   ```bash
   npm run setup
   ```

### Development

Run both client and server in development mode:
```bash
npm run dev
```

This will start:
- Client on http://localhost:3000
- Server on http://localhost:4000

### Individual Commands

**Client only:**
```bash
npm run client:dev
```

**Server only:**
```bash
npm run server:dev
```

### Production

Build both client and server:
```bash
npm run build
```

Start production servers:
```bash
npm start
```

## API Endpoints

- `GET /api/concepts` - Get all programming concepts

## Technologies Used

- **Frontend**: React, TypeScript, Vite
- **Backend**: Express.js, TypeScript
- **Development**: Concurrently for running both servers