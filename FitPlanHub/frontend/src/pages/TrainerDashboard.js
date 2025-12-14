import React, { useState, useEffect } from 'react';
import planService from '../services/planService';
import { Container, Box, TextField, Button, Typography, Alert, Grid, Card, CardContent, CardActions, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const TrainerDashboard = () => {
  const [plans, setPlans] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await planService.getMyPlans();
        setPlans(response.data);
      } catch (error) {
        console.error('Error fetching plans:', error);
      }
    };
    fetchPlans();
  }, []);

  const handleCreatePlan = async (e) => {
    e.preventDefault();
    try {
      const response = await planService.createPlan(title, description, price, duration);
      setPlans([...plans, response.data]);
      // Clear form
      setTitle('');
      setDescription('');
      setPrice('');
      setDuration('');
      setMessage('Plan created successfully!');
    } catch (error) {
      setMessage('Failed to create plan.');
    }
  };

  const handleDeletePlan = async (id) => {
    try {
      await planService.deletePlan(id);
      setPlans(plans.filter(plan => plan._id !== id));
      setMessage('Plan deleted successfully!');
    } catch (error) {
      setMessage('Failed to delete plan.');
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Trainer Dashboard
      </Typography>
      
      {/* Create Plan Form */}
      <Box component="form" onSubmit={handleCreatePlan} sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Create New Plan
        </Typography>
        {message && <Alert severity="info">{message}</Alert>}
        <TextField label="Title" value={title} onChange={e => setTitle(e.target.value)} fullWidth required margin="normal" />
        <TextField label="Description" value={description} onChange={e => setDescription(e.target.value)} fullWidth required margin="normal" multiline rows={4} />
        <TextField label="Price" type="number" value={price} onChange={e => setPrice(e.target.value)} fullWidth required margin="normal" />
        <TextField label="Duration (days)" type="number" value={duration} onChange={e => setDuration(e.target.value)} fullWidth required margin="normal" />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>Create Plan</Button>
      </Box>

      {/* List of Plans */}
      <Typography variant="h5" component="h2" gutterBottom>
        Your Plans
      </Typography>
      <Grid container spacing={4}>
        {plans.map(plan => (
          <Grid item key={plan._id} xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">{plan.title}</Typography>
                <Typography color="text.secondary">${plan.price} - {plan.duration} days</Typography>
                <Typography variant="body2">{plan.description}</Typography>
              </CardContent>
              <CardActions>
                <IconButton onClick={() => handleDeletePlan(plan._id)} color="error">
                  <DeleteIcon />
                </IconButton>
                {/* Edit functionality can be added here */}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TrainerDashboard;


