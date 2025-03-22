# AI Resume Web Application

A modern web application that helps users improve their resumes using AI analysis and find relevant job opportunities.

## Features

- Resume upload and analysis
- AI-powered resume improvement suggestions
- Job search functionality
- MongoDB integration for job data storage
- Real-time resume feedback

## Tech Stack

- Frontend: React.js
- Backend: Node.js, Express
- Database: MongoDB
- Styling: CSS3 with modern design principles

## Getting Started

1. Clone the repository
```bash
git clone https://github.com/javago101/AI_RESUME_WEB.git
cd AI_RESUME_WEB
```

2. Install dependencies
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
```

3. Start the application
```bash
# Start backend server (from server directory)
npm run dev

# Start frontend development server (from root directory)
npm start
```

## Environment Setup

Make sure to set up your `.env` file in the server directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/jobSearch
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

MIT