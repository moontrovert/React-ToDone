import React, { useState } from 'react'
import { AiOutlineCheck, AiOutlineDelete, AiOutlineEdit, AiOutlineSave, AiOutlineUndo } from 'react-icons/ai'

export default function TaskCard({ task, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedWork, setEditedWork] = useState(task.work);

  const handleSave = () => {
    onUpdate({ work: editedWork });
    setIsEditing(false);
  };

  const toggleComplete = () => {
    onUpdate({ completed: !task.completed });
  };

  return (    <div className='bg-gray-800 p-4 rounded shadow-md text-white'>
      {isEditing ? (
        <div className='space-y-2'>
          <input
            type="text"
            value={editedWork}
            onChange={(e) => setEditedWork(e.target.value)}
            className='w-full p-2 border border-gray-600 rounded text-base bg-gray-700 text-white placeholder-gray-400'
          />
          <button 
            onClick={handleSave} 
            className='w-full bg-green-700 text-white text-sm px-3 py-1.5 rounded hover:bg-green-800 flex items-center justify-center cursor-pointer'
          >
            <AiOutlineSave />
          </button>
        </div>
      ) : (
        <div className='space-y-2'>          <p className={`text-sm ${task.completed ? 'line-through text-gray-500' : ''}`}>
            {task.work}
          </p>          <div className='flex gap-2'>
            <button 
              onClick={() => setIsEditing(true)}              className={`flex-1 text-white text-sm px-3 py-1.5 rounded flex items-center justify-center cursor-pointer ${
                task.completed 
                  ? 'bg-blue-700/50' 
                  : 'bg-blue-700 hover:bg-blue-800'
              }`}
            >
              <AiOutlineEdit />
            </button>
            <button 
              onClick={toggleComplete} 
              className='flex-1 bg-green-700 text-white text-sm px-3 py-1.5 rounded hover:bg-green-800 flex items-center justify-center cursor-pointer'
            >
              {task.completed ? <AiOutlineUndo /> : <AiOutlineCheck />}
            </button>
            <button 
              onClick={onDelete}              className={`flex-1 text-white text-sm px-3 py-1.5 rounded flex items-center justify-center cursor-pointer ${
                task.completed 
                  ? 'bg-red-700/50' 
                  : 'bg-red-700 hover:bg-red-800'
              }`}
            >
              <AiOutlineDelete />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
