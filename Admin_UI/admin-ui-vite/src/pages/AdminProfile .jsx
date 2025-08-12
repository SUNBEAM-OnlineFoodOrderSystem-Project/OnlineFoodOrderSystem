import React from "react";
import { Card, CardContent, Typography, Avatar, Button, Grid } from "@mui/material";
import { deepPurple } from "@mui/material/colors";

const AdminProfile = () => {
  // Mock admin data (replace with backend later)
  const admin = {
    name: "Admin",
    email: "admin@gmail.com",
    phone: "+91 9876543210",
    role: "Administrator",
    joined: "2023-08-01",
  };

  return (
    <Grid container justifyContent="center" sx={{ mt: 4 }}>
      <Grid item xs={12} sm={8} md={6}>
        <Card sx={{ p: 2, textAlign: "center" }}>
          <Avatar
            sx={{
              bgcolor: deepPurple[500],
              width: 80,
              height: 80,
              fontSize: 32,
              margin: "0 auto",
            }}
          >
            {admin.name.charAt(0)}
          </Avatar>
          <CardContent>
            <Typography variant="h5" sx={{ fontWeight: "bold", mt: 2 }}>
              {admin.name}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {admin.role}
            </Typography>
            <Typography sx={{ mt: 2 }}>
              📧 {admin.email}
            </Typography>
            <Typography>
              📞 {admin.phone}
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }}>
              Joined on {admin.joined}
            </Typography>

            <Button variant="contained" sx={{ mt: 3 }}>
              Edit Profile
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default AdminProfile;
