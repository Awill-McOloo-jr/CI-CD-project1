"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Plus, CheckCircle2, Circle } from "lucide-react"

interface Todo {
  id: number
  text: string
  completed: boolean
  createdAt: Date
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState("")
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all")

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos")
    if (savedTodos) {
      const parsedTodos = JSON.parse(savedTodos).map((todo: any) => ({
        ...todo,
        createdAt: new Date(todo.createdAt),
      }))
      setTodos(parsedTodos)
    }
  }, [])

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  const addTodo = () => {
    if (newTodo.trim()) {
      const todo: Todo = {
        id: Date.now(),
        text: newTodo.trim(),
        completed: false,
        createdAt: new Date(),
      }
      setTodos([todo, ...todos])
      setNewTodo("")
    }
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed))
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed
    if (filter === "completed") return todo.completed
    return true
  })

  const completedCount = todos.filter((todo) => todo.completed).length
  const activeCount = todos.length - completedCount

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-800">Todo App</CardTitle>
            <CardDescription>Stay organized with your daily tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Add Todo Form */}
            <div className="flex gap-2">
              <Input
                placeholder="What needs to be done?"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addTodo()}
                className="flex-1"
                data-testid="todo-input"
              />
              <Button onClick={addTodo} className="px-6" data-testid="add-button">
                <Plus className="w-4 h-4 mr-2" />
                Add
              </Button>
            </div>

            {/* Filter Buttons */}
            <div className="flex justify-center gap-2">
              <Button
                variant={filter === "all" ? "default" : "outline"}
                onClick={() => setFilter("all")}
                size="sm"
                data-testid="filter-all"
              >
                All ({todos.length})
              </Button>
              <Button
                variant={filter === "active" ? "default" : "outline"}
                onClick={() => setFilter("active")}
                size="sm"
                data-testid="filter-active"
              >
                Active ({activeCount})
              </Button>
              <Button
                variant={filter === "completed" ? "default" : "outline"}
                onClick={() => setFilter("completed")}
                size="sm"
                data-testid="filter-completed"
              >
                Completed ({completedCount})
              </Button>
            </div>

            {/* Todo List */}
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredTodos.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  {filter === "all"
                    ? "No todos yet. Add one above!"
                    : filter === "active"
                      ? "No active todos!"
                      : "No completed todos!"}
                </div>
              ) : (
                filteredTodos.map((todo) => (
                  <div
                    key={todo.id}
                    className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                      todo.completed ? "bg-gray-50 border-gray-200" : "bg-white border-gray-300 hover:border-gray-400"
                    }`}
                    data-testid="todo-item"
                  >
                    <button onClick={() => toggleTodo(todo.id)} className="flex-shrink-0" data-testid="toggle-todo">
                      {todo.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                    <span className={`flex-1 ${todo.completed ? "line-through text-gray-500" : "text-gray-800"}`}>
                      {todo.text}
                    </span>
                    <span className="text-xs text-gray-400">{todo.createdAt.toLocaleDateString()}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteTodo(todo.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      data-testid="delete-todo"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))
              )}
            </div>

            {/* Clear Completed */}
            {completedCount > 0 && (
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  onClick={clearCompleted}
                  className="text-red-600 border-red-200 hover:bg-red-50"
                  data-testid="clear-completed"
                >
                  Clear Completed ({completedCount})
                </Button>
              </div>
            )}

            {/* Stats */}
            <div className="text-center text-sm text-gray-500 border-t pt-4">
              {activeCount} {activeCount === 1 ? "item" : "items"} left
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
