import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  CircularProgress,
  TextField,
  Alert,
  Grid,
} from '@mui/material';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';

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

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const response = await axios.get(`${API_URL}/event/${id}`);
      setEvent(response.data);
    } catch (err) {
      setError('Failed to fetch event details');
      console.error('Error fetching event:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      await axios.post(`${API_URL}/ticket`, {
        event_id: id,
        quantity,
      });
      setSuccess('Tickets booked successfully!');
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (err) {
      setError('Failed to book tickets');
      console.error('Error booking tickets:', err);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!event) {
    return (
      <Container>
        <Alert severity="error">Event not found</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <img
              src={event.imageUrl || 'https://via.placeholder.com/600x400'}
              alt={event.title}
              style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h1" gutterBottom>
              {event.title}
            </Typography>
            <Typography variant="body1" paragraph>
              {event.description}
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Date: {new Date(event.date).toLocaleDateString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Location: {event.location}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Price: ${event.price}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Available Tickets: {event.totalTickets}
              </Typography>
            </Box>
            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}
            {success && (
              <Alert severity="success" sx={{ mt: 2 }}>
                {success}
              </Alert>
            )}
            <Box sx={{ mt: 3 }}>
              <TextField
                type="number"
                label="Number of Tickets"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                inputProps={{ min: 1, max: event.totalTickets }}
                sx={{ mr: 2 }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleBooking}
                disabled={!user}
              >
                {user ? 'Book Tickets' : 'Login to Book'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default EventDetail; 