import express from 'express';
import cors from 'cors';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Path to data.json file
const dataFilePath = join(__dirname, '..', 'src', 'data.json');

// Helper function to read data
async function readData() {
    try {
        const data = await fs.readFile(dataFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading data:', error);
        return [];
    }
}

// Helper function to write data
async function writeData(data) {
    try {
        await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error writing data:', error);
        throw error;
    }
}

// GET all tasks
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await readData();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Error reading tasks' });
    }
});

// POST new task
app.post('/tasks', async (req, res) => {
    try {
        const tasks = await readData();
        const newTask = {
            id: Date.now().toString(),
            ...req.body,
            completed: false
        };
        tasks.push(newTask);
        await writeData(tasks);
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: 'Error creating task' });
    }
});

// PUT update task
app.put('/tasks/:id', async (req, res) => {
    try {
        const tasks = await readData();
        const taskIndex = tasks.findIndex(task => task.id === req.params.id);
        
        if (taskIndex === -1) {
            return res.status(404).json({ error: 'Task not found' });
        }

        tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
        await writeData(tasks);
        res.json(tasks[taskIndex]);
    } catch (error) {
        res.status(500).json({ error: 'Error updating task' });
    }
});

// DELETE task
app.delete('/tasks/:id', async (req, res) => {
    try {
        const tasks = await readData();
        const filteredTasks = tasks.filter(task => task.id !== req.params.id);
        
        if (filteredTasks.length === tasks.length) {
            return res.status(404).json({ error: 'Task not found' });
        }

        await writeData(filteredTasks);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Error deleting task' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
