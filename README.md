# MarketplaceX - E-Commerce Application

A clean, full-stack e-commerce application.

## Features

- **User Authentication**: Secure registration and login with JWT tokens
- **Product Catalog**: Browse products with search functionality
- **Product Details**: View detailed product information
- **Dummy Payment Gateway**: Simulated payment processing
- **Order History**: View past orders and order details

## Tech Stack

### Frontend
- **React** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Modern CSS** - Custom styling with design system

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **SQLite3** - Database
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing

## Architecture

The application follows a **3-tier layered architecture**:

### Frontend Layer (Presentation)
```
UI Components → Pages → Context (Auth) → Services (API)
```

### Backend Layer (Business Logic)
```
Routes → Middleware (Auth/Validation) → Controllers → Business Logic
```

### Data Layer
```
Models → SQLite Database
```

## Component Interactions

1. **Authentication Flow**:
   - User submits credentials → AuthService → API → AuthController
   - Controller validates → UserModel → Database
   - JWT token generated → Stored in localStorage → Used in API requests

2. **Product Browsing**:
   - Dashboard loads → ProductService → ProductController
   - Search query → Filters products → Returns results
   - Click product → Navigate to ProductDetail

3. **Purchase Flow**:
   - ProductDetail → Buy Now → Payment page
   - Payment form → Dummy processing → OrderController
   - Create order → OrderModel → Database
   - Redirect to Orders page

## Project Structure

```
MarketplaceX/
├── backend/
│   ├── config/
│   │   └── database.js          # Database connection and schema
│   ├── controllers/
│   │   ├── auth.controller.js   # Authentication business logic
│   │   ├── product.controller.js
│   │   └── order.controller.js
│   ├── middleware/
│   │   ├── auth.middleware.js   # JWT verification
│   │   └── validation.middleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── product.routes.js
│   │   └── order.routes.js
│   ├── scripts/
│   │   └── seed.js              # Database seeding
│   ├── .env                     # Environment variables
│   ├── server.js                # Express app entry point
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── ProductCard.jsx
    │   │   ├── SearchBar.jsx
    │   │   └── ProtectedRoute.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx  # Global auth state
    │   ├── pages/
    │   │   ├── Register.jsx
    │   │   ├── Login.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── ProductDetail.jsx
    │   │   ├── Payment.jsx
    │   │   └── Orders.jsx
    │   ├── services/
    │   │   ├── api.js           # Axios instance
    │   │   ├── authService.js
    │   │   ├── productService.js
    │   │   └── orderService.js
    │   ├── App.jsx              # Route configuration
    │   ├── main.jsx             # Entry point
    │   └── index.css            # Global styles
    ├── .env
    └── package.json
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create and configure environment variables:

Create a `.env` file in the `backend` directory:
```bash
# Server Configuration
PORT=5000

# JWT Secret Key - Keep this secret and secure!
JWT_SECRET=your_super_secure_jwt_secret_key_change_this_in_production

# Database Configuration
DB_PATH=./database.sqlite
```

**Important**: Generate a secure JWT_SECRET for production:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the generated string and replace the `JWT_SECRET` value in your `.env` file.

**Security Note**: Never commit the `.env` file to version control. Add it to `.gitignore`.

4. Seed the database with sample products:
```bash
npm run seed
```

5. Start the backend server:
```bash
npm start
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory (in a new terminal):
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## Usage

1. **Register**: Create a new account at `/register`
2. **Login**: Login with your credentials at `/login`
3. **Browse Products**: View product catalog at `/dashboard`
4. **Search**: Use the search bar to filter products
5. **View Details**: Click on any product to see details
6. **Make Purchase**: Click "Buy Now" to proceed to payment
7. **Complete Payment**: Fill the dummy payment form (any values work)
8. **View Orders**: Check your order history at `/orders`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Products
- `GET /api/products` - Get all products (supports ?search=query)
- `GET /api/products/:id` - Get product by ID

### Orders (Protected)
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user's orders

## Database Schema

### users
- id, name, email, password, created_at

### products
- id, name, description, price, category, image_url, stock, created_at

### orders
- id, user_id, total_amount, status, created_at

### order_items
- id, order_id, product_id, quantity, price

## Security Features

- Passwords hashed with bcryptjs
- JWT token-based authentication
- Protected routes on both frontend and backend
- Input validation middleware
- CORS enabled for frontend-backend communication

## Notes

- This is a **demonstration application**
- The payment gateway is **dummy** and does not process real payments
- Database is SQLite stored locally as `database.sqlite`
- **Important**: Generate a secure JWT_SECRET before deploying to production (see Backend Setup step 3)
- Never commit `.env` files to version control - use `.env.example` as a template

## License

MIT License
