import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2"; // For the chart
import { Card, CardContent, Typography, Button, Grid } from "@mui/material"; // For Material UI components
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// Registering chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [chartData, setChartData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = JSON.parse(localStorage.getItem("user"))?.token;

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/api/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
        fetchChartData(); // Fetch chart data when user is fetched
      } catch (err) {
        console.error(err);
        navigate("/login");
      }
    };

    const fetchChartData = async () => {
      // Simulating fetching data for the chart (you can replace this with actual API call)
      setChartData({
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
          {
            label: "Monthly User Growth",
            data: [65, 59, 80, 81, 56, 55, 40],
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            fill: true,
          },
        ],
      });
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h3" gutterBottom>
        Dashboard
      </Typography>

      {user ? (
        <>
          <Typography variant="h5" gutterBottom>
            Welcome, {user.username}!
          </Typography>

          <Grid container spacing={3}>
            {/* Card 1: User Details */}
            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6">User Info</Typography>
                  <Typography variant="body2">Username: {user.username}</Typography>
                  <Typography variant="body2">Email: {user.email}</Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Card 2: Chart */}
            <Grid item xs={12} sm={8}>
              <Card>
                <CardContent>
                  <Typography variant="h6">User Growth</Typography>
                  <Line data={chartData} />
                </CardContent>
              </Card>
            </Grid>

            {/* Card 3: Stats */}
            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Stats</Typography>
                  <Typography variant="body2">Active Sessions: 120</Typography>
                  <Typography variant="body2">New Messages: 45</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Button
            variant="contained"
            color="primary"
            onClick={handleLogout}
            style={{ marginTop: "20px" }}
          >
            Logout
          </Button>
        </>
      ) : (
        <Typography variant="h6">Loading user information...</Typography>
      )}
    </div>
  );
};

export default Dashboard;
