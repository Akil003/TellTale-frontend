import axios from "axios";

// Function to create a request to the tmdb API
// API fetching from themoviedb
const instance = axios.create({
  baseURL: "https://telltale-backend-0tqm.onrender.com",
});

// Exporting instance object.Making it available
export default instance;
