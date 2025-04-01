# Ticket Booking Frontend

A modern React frontend for the Ticket Booking application. Built with TypeScript, Material-UI, and React Router.

## Features

- 🎨 Modern UI with Material-UI components
- 🔐 User authentication (Login/Register)
- 📱 Responsive design
- 🎫 Event browsing and searching
- 🎟️ Ticket booking system
- 👤 User dashboard
- 👑 Admin panel
- 🔄 Real-time updates
- 🎯 TypeScript for type safety

## Tech Stack

- React 18
- TypeScript
- Material-UI (MUI)
- React Router v6
- Axios
- Context API for state management

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Backend API running on http://localhost:8081

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ticket-booking-frontend.git
   cd ticket-booking-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

The application will be available at http://localhost:3000

## Project Structure

```
src/
├── components/         # Reusable components
├── pages/             # Page components
├── hooks/             # Custom hooks
├── utils/             # Utility functions
├── types/             # TypeScript type definitions
├── App.tsx            # Main application component
└── index.tsx          # Application entry point
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
REACT_APP_API_URL=http://localhost:8081/api
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 