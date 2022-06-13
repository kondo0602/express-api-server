// Simple Request
fetch("http://localhost:3002", {
  method: "POST",
  body: { request: "simple-request" },
})
  .then((response) => response.json())
  .then((data) => console.log(data));

// Preflight Request
fetch("http://localhost:3002", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: { request: "not-simple-request" },
})
  .then((response) => response.json())
  .then((data) => console.log(data));
