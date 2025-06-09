import { useState, useEffect } from 'react'
import List from './components/list'
import { AiOutlinePlusCircle } from 'react-icons/ai'

const API_URL = 'http://localhost:3001';

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${API_URL}/tasks`);
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async (task) => {
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });
      const newTask = await response.json();
      setItems(prev => [...prev, newTask]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const updateTask = async (id, updates) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });
      const updatedTask = await response.json();
      setItems(prev => prev.map(item => 
        item.id === id ? updatedTask : item
      ));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`${API_URL}/tasks/${id}`, {
        method: 'DELETE',
      });
      setItems(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className='min-h-screen py-8'> 
      <div className='container mx-auto px-4 flex justify-center gap-8'>
        <List 
          name='To Do' 
          tasks={items.filter(item => !item.completed)}
          onAdd={addTask}
          onUpdate={updateTask}
          onDelete={deleteTask}
        />
        <List 
          name='Done' 
          tasks={items.filter(item => item.completed)}
          onUpdate={updateTask}
          onDelete={deleteTask}
        />
      </div>
    </div>
  )
}

export default App
