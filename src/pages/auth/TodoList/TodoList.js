import React, { useState, useEffect } from 'react';
import './TodoList.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate1234

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [editedTodo, setEditedTodo] = useState(null);
  const [newContent, setNewContent] = useState('');
  const userName = localStorage.getItem('userName') || 'User';
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const userTodos = JSON.parse(localStorage.getItem(`todos_${userName}`)) || [];
    // Reverse the todos array to show the latest entries first
    setTodos(userTodos.reverse());
  }, [userName]);

  const handleEdit = (todo) => {
    setEditedTodo(todo.id);
    setNewContent(todo.content);
  };

  const handleUpdate = (id) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, content: newContent } : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem(`todos_${userName}`, JSON.stringify(updatedTodos));
    setEditedTodo(null);
    setNewContent('');
  };

  const handleDelete = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem(`todos_${userName}`, JSON.stringify(updatedTodos));
  };

  const handleBack = () => {
    navigate('/userdashboard'); // Navigate back to UserDashboard
  };

  return (
    <div className="todo-list-container">
      <button className="back-button" onClick={handleBack}>Back</button> {/* Back button */}
      <h1>{userName}'s Todo List</h1>
      <div className="todo-list">
        {todos.length > 0 ? (
          todos.map((todo) => (
            <div key={todo.id} className="todo-item">
              {editedTodo === todo.id ? (
                <div>
                  <input
                    type="text"
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                  />
                  <button className="update" onClick={() => handleUpdate(todo.id)}>Update</button>
                </div>
              ) : (
                <div className='ed'>
                  <p>{todo.content}</p>
                  <div className="button-container">
                    <button className="edit" onClick={() => handleEdit(todo)}>Edit</button>
                    <button className="delete" onClick={() => handleDelete(todo.id)}>Delete</button>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No todos available.</p>
        )}
      </div>
    </div>
  );
};

export default TodoList;
