import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  totalTickets: number;
  price: number;
  imageUrl?: string;
}

const API_URL = 'http://localhost:8081/api';

const Home = () => {
  const navigate = useNavigate();
  const [featuredEvents, setFeaturedEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedEvents();
  }, []);

  const fetchFeaturedEvents = async () => {
    try {
      const response = await axios.get(`${API_URL}/event`);
      // Get the first 3 events as featured events
      setFeaturedEvents(response.data.slice(0, 3));
    } catch (err) {
      console.error('Error fetching featured events:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          mb: 6,
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom align="center">
            Welcome to Ticket Booking
          </Typography>
          <Typography variant="h5" align="center" paragraph>
            Book tickets for the best events in town
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => navigate('/events')}
            >
              Browse Events
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Featured Events Section */}
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom align="center">
          Featured Events
        </Typography>
        {loading ? (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={4} sx={{ mt: 2 }}>
            {featuredEvents.map((event) => (
              <Grid item key={event.id} xs={12} md={4}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={event.imageUrl || 'https://via.placeholder.com/300x200'}
                    alt={event.title}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h3">
                      {event.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {event.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Date: {new Date(event.date).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Location: {event.location}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Price: ${event.price}
                    </Typography>
                  </CardContent>
                  <Box sx={{ p: 2 }}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={() => navigate(`/events/${event.id}`)}
                    >
                      View Details
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {/* Features Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h5" gutterBottom>
                Easy Booking
              </Typography>
              <Typography variant="body1">
                Book your tickets in just a few clicks with our user-friendly interface.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h5" gutterBottom>
                Secure Payment
              </Typography>
              <Typography variant="body1">
                Your payment information is secure and encrypted.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h5" gutterBottom>
                Instant Confirmation
              </Typography>
              <Typography variant="body1">
                Get instant confirmation and e-tickets for your bookings.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 