import axios from "axios";

// Function to create a request to the tmdb API
// API fetching from themoviedb
const recommendation = axios.create({
  baseURL: "https://telltale-recommendation.onrender.com/"
})

// Exporting instance object.Making it available
export default recommendation;
