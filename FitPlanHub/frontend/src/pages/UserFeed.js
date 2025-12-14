import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import userService from '../services/userService';
import { Container, Grid, Card, CardContent, CardActions, Typography, Button, Box, Chip } from '@mui/material';

const UserFeed = () => {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const response = await userService.getUserFeed();
        setFeed(response.data);
      } catch (error) {
        console.error('Error fetching feed:', error);
      }
    };
    fetchFeed();
  }, []);

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Your Feed
      </Typography>
      {feed.length > 0 ? (
        <Grid container spacing={4}>
          {feed.map(plan => (
            <Grid item key={plan._id} xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {plan.title}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    by {plan.trainer.name}
                  </Typography>
                  {plan.isSubscribed && <Chip label="Subscribed" color="success" size="small" />}
                </CardContent>
                <CardActions>
                  <Button size="small" component={Link} to={`/plan/${plan._id}`}>View Details</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>Your feed is empty. Follow some trainers to see their plans here.</Typography>
      )}
    </Container>
  );
};

export default UserFeed;


