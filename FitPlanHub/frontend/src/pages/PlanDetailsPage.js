import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import userService from '../services/userService';
import { Container, Card, CardContent, Typography, Button, Box, Alert, CircularProgress } from '@mui/material';

const PlanDetailsPage = () => {
  const { id } = useParams();
  const [plan, setPlan] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlanDetails = async () => {
      try {
        const response = await userService.getPlanDetails(id);
        setPlan(response.data.plan);
        setIsSubscribed(response.data.isSubscribed);
      } catch (error) {
        console.error('Error fetching plan details:', error);
        setMessage('Error fetching plan details.');
      } finally {
        setLoading(false);
      }
    };
    fetchPlanDetails();
  }, [id]);

  const handleSubscribe = async () => {
    try {
      await userService.subscribeToPlan(id);
      setIsSubscribed(true);
      setMessage('Successfully subscribed!');
    } catch (error) {
      setMessage('Failed to subscribe. You may already be subscribed or an error occurred.');
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (!plan) {
    return <Alert severity="error">Plan not found.</Alert>;
  }

  return (
    <Container maxWidth="md">
      <Card>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom>
            {plan.title}
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            by {plan.trainer.name}
          </Typography>
          <Typography variant="h5" component="p" gutterBottom>
            ${plan.price}
          </Typography>
          
          {isSubscribed ? (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6">Full Plan Details</Typography>
              <Typography variant="body1">{plan.description}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Duration: {plan.duration} days
              </Typography>
            </Box>
          ) : (
            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Typography variant="body1" gutterBottom>
                Subscribe to see the full plan details.
              </Typography>
              <Button variant="contained" color="primary" onClick={handleSubscribe}>
                Subscribe Now
              </Button>
              {message && <Alert severity={isSubscribed ? "success" : "error"} sx={{ mt: 2 }}>{message}</Alert>}
            </Box>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default PlanDetailsPage;


