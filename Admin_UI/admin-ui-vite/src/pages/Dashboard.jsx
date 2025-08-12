import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

export default function Dashboard() {
  return (
    <div>
      <Typography variant="h4" gutterBottom>Welcome, Admin</Typography>
      <Grid container spacing={2}>
        {[
          { title: "Total Users", value: 1234 },
          { title: "Restaurants", value: 230 },
          { title: "Orders Today", value: 45 },
          { title: "Active Offers", value: 12 },
        ].map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.title}>
            <Card>
              <CardContent>
                <Typography variant="subtitle2">{item.title}</Typography>
                <Typography variant="h5">{item.value}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Paper sx={{ mt: 3, p: 2 }}>
        <Typography variant="h6">Recent Activity</Typography>
        <Typography variant="body2" color="text.secondary">No real backend — this is mock data for UI preview.</Typography>
      </Paper>
    </div>
  );
}
