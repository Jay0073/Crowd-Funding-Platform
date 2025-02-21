# Crowd-Funding Platform

## Overview
The **Crowd-Funding Platform** is a web-based application that enables users to create and support fundraising campaigns. The platform provides a secure and transparent way for individuals and organizations to raise funds for various causes and projects.

## Features
- User authentication and profile management
- Create, edit, and delete fundraising campaigns
- Secure payment gateway integration
- Track donations and campaign progress
- Admin panel for campaign moderation
- Responsive and intuitive UI/UX

## Tech Stack
- **Frontend:** React.js, Redux, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Token)
- **Payment Integration:** Stripe/PayPal

## Installation
### Prerequisites
- Node.js (>= 14.x)
- MongoDB (Local or Cloud-based)

### Setup
1. **Clone the Repository:**
   ```sh
   git clone https://github.com/Jay0073/Crowd-Funding-Platform.git
   cd Crowd-Funding-Platform
   ```
2. **Install Dependencies:**
   ```sh
   npm install
   ```
3. **Set up Environment Variables:**
   Create a `.env` file in the root directory and add the following:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   STRIPE_SECRET=your_stripe_api_key
   ```
4. **Run the Server:**
   ```sh
   npm start
   ```
5. **Start the Frontend (if applicable):**
   ```sh
   cd client
   npm start
   ```

## Usage
1. Sign up or log in to create a campaign.
2. Set up fundraising goals, descriptions, and images.
3. Share the campaign link to attract donors.
4. Users can donate via the integrated payment system.
5. Track progress and update supporters.

## Contributing
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch`
3. Make changes and commit: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature-branch`
5. Open a pull request.

