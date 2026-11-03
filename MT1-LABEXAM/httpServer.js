import http from "http";
import fs from "fs";

const tasks = [
    {
        id: 1,
        taskName: "Develop Student Registration Page",
        assignedTo: "Rahul Sharma",
        status: "Pending"
    },
    {
        id: 2,
        taskName: "Create Attendance System",
        assignedTo: "Priya Verma",
        status: "Completed"
    },
    {
        id: 3,
        taskName: "Design Student Dashboard",
        assignedTo: "Amit Kumar",
        status: "Pending"
    }
];

const server = http.createServer((req, res) => {

    // Route 1: Home route
    if (req.url === "/" && req.method === "GET") {

        res.writeHead(200, {
            "Content-Type": "text/html"
        });

        res.end("<h1>Welcome to Employee Task Management</h1>");
    }

    // Route 2: Display all tasks
    else if (req.url === "/tasks" && req.method === "GET") {

        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify(tasks));
    }

    // Route 3: About route
    else if (req.url === "/about" && req.method === "GET") {

        res.writeHead(200, {
            "Content-Type": "text/html"
        });

        res.end("<h2>Employee Task Management Application</h2><p>Manage and track employee tasks easily.</p>");
    }

    // Route 4: Serve HTML using FS module
    else if (req.url === "/home" && req.method === "GET") {

        fs.readFile("./public/index.html", (err, data) => {

            if (err) {
                res.writeHead(500, {
                    "Content-Type": "text/plain"
                });

                res.end("Error reading HTML file");
            } else {
                res.writeHead(200, {
                    "Content-Type": "text/html"
                });

                res.end(data);
            }
        });
    }

    // Invalid route
    else {
        res.writeHead(404, {
            "Content-Type": "text/plain"
        });

        res.end("404 Page Not Found");
    }

});

server.listen(3000, () => {
    console.log("HTTP Server running at http://localhost:3000");
});