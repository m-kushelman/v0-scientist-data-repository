# Spin: Scientific Data Repository

A modern, elegant platform for scientists to share and discover research data across all disciplines including biology, geospatial, LIDAR, video, and more.

## Features

- **User Authentication**: Secure registration and login with JWT tokens
- **Email Verification**: Email verification system for account security
- **Data Sharing**: Upload and share scientific datasets with detailed metadata
- **Advanced Search**: Powerful search with filters for field of study, data type, author, methods, and more
- **Tagging System**: Tag datasets for easy discovery and categorization
- **User Profiles**: Manage your profile and view your contributions
- **Featured Content**: Browse featured articles of the month
- **Responsive Design**: Beautiful, modern UI that works on all devices

## Tech Stack

### Frontend
- HTML5, CSS3, JavaScript (Vanilla)
- Modern, responsive design with elegant typography

### Backend
- Node.js with Express
- SQLite database
- JWT authentication
- Email verification (Nodemailer)
- File upload support (Multer)
- RESTful API

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the backend server:**
   ```bash
   npm start
   ```
   The server will run on `http://localhost:3000`

3. **Start a static file server for the frontend:**
   In a new terminal window:
   ```bash
   python3 -m http.server 8000
   ```
   Or use any other static file server.

4. **Access the application:**
   - Frontend: `http://localhost:8000`
   - API: `http://localhost:3000/api`

## Database

The application uses SQLite, which will be automatically created on first run. The database file (`spin.db`) will be created in the project root.

### Database Schema

- **users**: User accounts with authentication
- **posts**: Scientific datasets/posts
- **tags**: Tag definitions
- **post_tags**: Junction table for post-tag relationships

## API Endpoints

### Authentication
- `POST /api/register` - Register new user (sends verification email)
- `POST /api/login` - Login user (requires verified email)
- `GET /api/me` - Get current user profile
- `GET /api/verify-email?token=...` - Verify email address
- `POST /api/resend-verification` - Resend verification email

### Posts/Datasets
- `GET /api/posts` - Get all posts (with search/filter params)
- `GET /api/posts/:id` - Get single post
- `GET /api/posts/featured` - Get featured posts
- `POST /api/posts` - Create new post (requires auth)
- `GET /api/users/:userId/posts` - Get user's posts

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile (requires auth)

### Stats
- `GET /api/stats` - Get platform statistics

## File Uploads

Uploaded files are stored in the `uploads/` directory. Supported formats:
- CSV, TSV, TXT
- JSON
- ZIP, TAR.GZ
- H5, HDF5

Maximum file size: 100MB

## Environment Variables

Create a `.env` file in the project root for configuration:

```bash
# Server Configuration
PORT=3000
JWT_SECRET=your-secret-key-change-in-production

# Frontend URL (for email verification links)
FRONTEND_URL=http://localhost:8000

# Email Configuration (SMTP)
# For Gmail, use an "App Password" instead of your regular password
# Get one at: https://myaccount.google.com/apppasswords
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@spin-repository.com
```

### Email Setup

**For Gmail:**
1. Enable 2-factor authentication on your Google account
2. Go to [App Passwords](https://myaccount.google.com/apppasswords)
3. Generate a new app password for "Mail"
4. Use that password as `SMTP_PASS` in your `.env` file

**For other email services:**
- See `.env.example` for configuration examples for SendGrid, Mailgun, etc.

**Note:** If email is not configured, users can still register but won't receive verification emails. The verification token will be logged to the console for testing purposes.

## Development

For development with auto-reload:

```bash
npm run dev
```

(Requires `nodemon` to be installed: `npm install -g nodemon`)

## Project Structure

```
spin-website/
├── server.js          # Express server and API routes
├── api.js             # Frontend API client
├── script.js          # Frontend JavaScript
├── styles.css         # Stylesheet
├── index.html         # Main search page
├── browse.html        # Browse datasets page
├── signup.html        # User registration
├── login.html         # User login
├── create-post.html   # Create new dataset
├── package.json       # Node.js dependencies
├── uploads/           # Uploaded files (created automatically)
└── spin.db           # SQLite database (created automatically)
```

## Security Notes

- Passwords are hashed using bcrypt
- JWT tokens expire after 7 days
- File uploads are validated by type and size
- CORS is enabled for local development
- **Important**: Change the JWT_SECRET in production!

## License

ISC

