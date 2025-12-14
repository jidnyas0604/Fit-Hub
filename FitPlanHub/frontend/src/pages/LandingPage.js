import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import userService from '../services/userService';
import { Grid, Card, CardContent, CardActions, Typography, Button } from '@mui/material';

const LandingPage = () => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchAllPlans = async () => {
      try {
        const response = await userService.getAllPlans();
        setPlans(response.data);
      } catch (error) {
        console.error('Error fetching plans:', error);
      }
    };
    fetchAllPlans();
  }, []);

  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>
        All Fitness Plans
      </Typography>
      <Grid container spacing={4}>
        {plans.map(plan => (
          <Grid item key={plan._id} xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  {plan.title}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  by {plan.trainer.name}
                </Typography>
                <Typography variant="h6">
                  ${plan.price}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" component={Link} to={`/plan/${plan._id}`}>View Details</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default LandingPage;


