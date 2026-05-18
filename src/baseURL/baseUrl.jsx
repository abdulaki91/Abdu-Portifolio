const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://myportfolio.backend.abdulaki.com"
    : "http://localhost:5000";
export default baseUrl;
