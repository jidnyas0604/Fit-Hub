import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import userService from '../services/userService';
import { Container, Box, Typography, Button, Grid, Card, CardContent, CardActions, CircularProgress, Alert } from '@mui/material';

const TrainerProfile = () => {
  const { id } = useParams();
  const [trainer, setTrainer] = useState(null);
  const [plans, setPlans] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrainerProfile = async () => {
      try {
        const response = await userService.getTrainerProfile(id);
        setTrainer(response.data.trainer);
        setPlans(response.data.plans);
        setIsFollowing(response.data.isFollowing);
      } catch (error) {
        console.error('Error fetching trainer profile:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrainerProfile();
  }, [id]);

  const handleFollow = async () => {
    try {
      await userService.followTrainer(id);
      setIsFollowing(true);
    } catch (error) {
      console.error('Error following trainer:', error);
    }
  };

  const handleUnfollow = async () => {
    try {
      await userService.unfollowTrainer(id);
      setIsFollowing(false);
    } catch (error) {
      console.error('Error unfollowing trainer:', error);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (!trainer) {
    return <Alert severity="error">Trainer not found.</Alert>;
  }

  return (
    <Container>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1">{trainer.name}</Typography>
        <Typography variant="body1" color="text.secondary">{trainer.bio || 'No bio available.'}</Typography>
        <Button 
          variant="contained" 
          onClick={isFollowing ? handleUnfollow : handleFollow} 
          sx={{ mt: 2 }}
        >
          {isFollowing ? 'Unfollow' : 'Follow'}
        </Button>
      </Box>

      <Typography variant="h5" component="h2" gutterBottom>
        Plans by {trainer.name}
      </Typography>
      <Grid container spacing={4}>
        {plans.map(plan => (
          <Grid item key={plan._id} xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">{plan.title}</Typography>
                <Typography color="text.secondary">${plan.price}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" component={Link} to={`/plan/${plan._id}`}>View Details</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TrainerProfile;


