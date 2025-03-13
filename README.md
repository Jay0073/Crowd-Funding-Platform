# Crowd-Funding-Website

This project is a platform that enables users to create and support crowdfunding campaigns. Users can initiate campaigns, set fundraising goals, and contribute to existing campaigns to support various causes.

## Features

- **User Registration and Authentication**: Secure sign-up and login functionalities for users.
- **Campaign Creation**: Registered users can create new crowdfunding campaigns with specific goals and descriptions.
- **Campaign Browsing**: Users can explore existing campaigns and view details about each cause.
- **Donations**: Supporters can contribute to campaigns securely through the platform.
- **Admin Moderation**: Administrative interface to oversee and manage campaigns and user activities.

## Technologies Used

- **Frontend**: React.js for building interactive user interfaces.
- **Backend**: Node.js with Express.js for server-side logic and API endpoints.
- **Database**: MongoDB for data storage and retrieval.
- **Authentication**: JWT (JSON Web Tokens) for secure user authentication.
- **Payment Integration**: Stripe API for handling donations and transactions.

## Installation and Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Jay0073/Crowd-Funding-Website.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd Crowd-Funding-Website
   ```

3. **Install server dependencies**:

   ```bash
   cd server
   npm install
   ```

4. **Install client dependencies**:

   ```bash
   cd ../client
   npm install
   ```

5. **Set up environment variables**:

   - Create a `.env` file in the `server` directory with the following variables:

     ```env
     PORT=5000
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     STRIPE_SECRET_KEY=your_stripe_secret_key
     ```

6. **Start the development servers**:

   - **Backend**:

     ```bash
     cd server
     node index.js
     ```

   - **Frontend**:

     ```bash
     cd ../client
     npm run dev
     ```

7. **Access the application**:

   Open your browser and navigate to `http://localhost:5173` to view the application.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

