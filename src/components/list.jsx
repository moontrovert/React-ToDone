import React, { useState } from 'react'
import TaskCard from './taskCard'
import { AiOutlineEdit } from 'react-icons/ai';

export default function List({ name, tasks, onAdd, onUpdate, onDelete }) {
  const [newTask, setNewTask] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      onAdd({ work: newTask });
      setNewTask('');
    }
  };

  const handleUpdate = (taskId, updates) => {
    onUpdate(taskId, updates);
  };

  const handleDelete = (taskId) => {
    onDelete(taskId);
  };

  return (    <section className='bg-slate-900 rounded-md p-4 w-auto min-w-[300px] h-[76vh] flex flex-col'>
      <div className='text-base text-blue-400 mb-4'>{name}</div>
      
      {name === 'To Do' && (
        <form onSubmit={handleSubmit} className='mb-4'>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add new task..."
            className='w-full p-2 rounded border border-gray-600 bg-gray-800 text-white placeholder-gray-400'
          />
          <button 
            type="submit"
            className='mt-2 bg-blue-700 text-white px-3 py-1.5 rounded hover:bg-blue-800 w-full text-sm cursor-pointer'
          >
            Add Task
          </button>
        </form>
      )}

      <div className='space-y-4 overflow-y-auto flex-grow hover-scroll'>
        {tasks?.map((task) => (
          <TaskCard 
            key={task.id}
            task={task}
            onUpdate={(updates) => handleUpdate(task.id, updates)}
            onDelete={() => handleDelete(task.id)}
          />
        ))}
      </div>
    </section>
  )
}
