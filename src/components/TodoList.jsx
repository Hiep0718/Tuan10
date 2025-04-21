"use client"

import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { addTodo, toggleTodo, removeTodo, selectTodos } from "../features/todos/todosSlice"

export function TodoList() {
  const [newTodo, setNewTodo] = useState("")
  const todos = useSelector(selectTodos)
  const dispatch = useDispatch()

  const handleAddTodo = (e) => {
    e.preventDefault()
    if (newTodo.trim()) {
      dispatch(addTodo(newTodo))
      setNewTodo("")
    }
  }

  return (
    <div className="todo-container">
      <h2>Danh sách công việc</h2>

      <form onSubmit={handleAddTodo} className="todo-form">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Thêm công việc mới..."
          className="todo-input"
        />
        <button type="submit" className="add-button">
          Thêm
        </button>
      </form>

      <ul className="todo-list">
        {todos.length === 0 ? (
          <li className="empty-message">Chưa có công việc nào</li>
        ) : (
          todos.map((todo) => (
            <li key={todo.id} className="todo-item">
              <div className="todo-content">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => dispatch(toggleTodo(todo.id))}
                  className="todo-checkbox"
                />
                <span className={`todo-text ${todo.completed ? "completed" : ""}`}>{todo.text}</span>
              </div>
              <button onClick={() => dispatch(removeTodo(todo.id))} className="remove-button">
                Xoá
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}
