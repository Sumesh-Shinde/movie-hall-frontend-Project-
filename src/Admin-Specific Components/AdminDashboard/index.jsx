import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.scss";

const AdminDashboard = () => {
  const [dashboardStats, setDashboardStats] = useState({
    totalMovies: 0,
    totalBookings: 0,
    upcomingShowtimes: 0,
  });

  useEffect(() => {
    axios.get("http://localhost:8080/api/admin/dashboard")
      .then(response => {
        setDashboardStats(response.data);
      })
      .catch(error => {
        console.error("Error fetching dashboard stats:", error);
      });
  }, []);

  return (
    <div className="admin-dashboard">
      <h1 className="admin-dashboard__heading">Admin Dashboard</h1>
      <div className="admin-dashboard__stats">
        <div className="stat">
          <h2>Total Movies</h2>
          <p>{dashboardStats.totalMovies}</p> {/* ✅ Dynamically fetched data */}
        </div>
        <div className="stat">
          <h2>Total Bookings</h2>
          <p>{dashboardStats.totalBookings}</p> {/* ✅ Dynamically fetched data */}
        </div>
        <div className="stat">
          <h2>Upcoming Showtimes</h2>
          <p>{dashboardStats.upcomingShowtimes}</p> {/* ✅ Dynamically fetched data */}
        </div>
      </div>
      <div className="admin-dashboard__links">
        <a href="/admin/manage-movie">Manage Movies</a>
        <a href="/admin/manage-showtimes">Manage Showtimes</a>
        <a href="/admin/manage-booking">Manage Bookings</a>
      </div>
    </div>
  );
};

export default AdminDashboard;
