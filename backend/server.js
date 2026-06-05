const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 80;

app.use(cors());
app.use(express.json());

let tasks = [
  {
    ID: 1,
    Name: "Frontend React ",
    Description: "Done UI for Task App using Bootstrap 5",
    DueDate: "2024-05-20T00:00:00.000Z",
    Status: "Completed"
  },
  {
    ID: 2,
    Name: "Backend API",
    Description: "Done API with Node.js and Express",
    DueDate: "2024-05-25T00:00:00.000Z",
    Status: "In Progress"
  },
  {
    ID: 3,
    Name: "Dockerize App",
    Description: "Create Dockerfile and docker-compose for the app",
    DueDate: "2024-06-01T00:00:00.000Z",
    Status: "Pending"
  }
];

// GET /tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// POST /tasks
app.post('/tasks', (req, res) => {
  const { ID, Name, Description, DueDate, Status } = req.body;
  if (!Name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  const newTask = {
    ID: ID || Math.floor(Math.random() * 10000),
    Name,
    Description: Description || '',
    DueDate: DueDate || '',
    Status: Status || 'Pending'
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT /tasks/:id
app.put('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { Name, Description, DueDate, Status } = req.body;

  const taskIndex = tasks.findIndex(t => t.ID === id);
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const updatedTask = {
    ...tasks[taskIndex],
    Name: Name !== undefined ? Name : tasks[taskIndex].Name,
    Description: Description !== undefined ? Description : tasks[taskIndex].Description,
    DueDate: DueDate !== undefined ? DueDate : tasks[taskIndex].DueDate,
    Status: Status !== undefined ? Status : tasks[taskIndex].Status
  };

  tasks[taskIndex] = updatedTask;
  res.json(updatedTask);
});

// DELETE /tasks/:id
app.delete('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const taskIndex = tasks.findIndex(t => t.ID === id);

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  tasks.splice(taskIndex, 1);
  res.json({ message: `Task with ID ${id} deleted successfully` });
});

app.listen(port, () => {
  console.log(`Backend mock Express server listening on port ${port}`);
});
