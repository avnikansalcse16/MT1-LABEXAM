import express from "express";

const app = express();
const PORT = 4000;

app.use(express.json());

let tasks = [
  { id: 1, taskName: "Develop Login Page", assignedTo: "Rahul", status: "Pending", priority: "High" },
  { id: 2, taskName: "Design Dashboard", assignedTo: "Priya", status: "In Progress", priority: "Medium" },
  { id: 3, taskName: "Test Registration Form", assignedTo: "Amit", status: "Completed", priority: "Low" }
];

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.get("/tasks/:id", (req, res) => {
  const task = tasks.find(t => t.id === Number(req.params.id));
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.json(task);
});

app.post("/tasks", (req, res) => {
  const { id, taskName, assignedTo, status, priority } = req.body;

  if (id == null || !taskName || !assignedTo || !status || !priority) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (tasks.some(t => t.id === Number(id))) {
    return res.status(400).json({ message: "ID already exists" });
  }

  const newTask = { id: Number(id), taskName, assignedTo, status, priority };
  tasks.push(newTask);
  res.status(201).json({ message: "Task added successfully", task: newTask });
});

app.put("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = tasks.findIndex(t => t.id === id);

  if (index === -1) return res.status(404).json({ message: "Task not found" });

  const { taskName, assignedTo, status, priority } = req.body;

  if (!taskName || !assignedTo || !status || !priority) {
    return res.status(400).json({ message: "All fields are required" });
  }

  tasks[index] = { id, taskName, assignedTo, status, priority };
  res.json({ message: "Task updated successfully", task: tasks[index] });
});

app.delete("/tasks/:id", (req, res) => {
  const index = tasks.findIndex(t => t.id === Number(req.params.id));

  if (index === -1) return res.status(404).json({ message: "Task not found" });

  tasks.splice(index, 1);
  res.json({ message: "Task deleted successfully" });
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Express Server running at http://localhost:${PORT}`);
});