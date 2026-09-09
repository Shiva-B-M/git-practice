const express = require("express");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Hello from Jenkins CI/CD Pipeline!");
});

app.get("/health", (req, res) => {
    res.json({
        status: "UP",
        application: "sample-node-app"
    });
});

app.listen(PORT, () => {
    console.log(`Application running on port ${PORT}`);
});
