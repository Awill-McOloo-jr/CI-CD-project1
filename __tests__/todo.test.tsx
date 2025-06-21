import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom"
import TodoApp from "../app/page"
import { jest } from '@jest/globals'
import test, { describe, beforeEach } from "node:test"
import { expect } from "@jest/globals"

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
}
global.localStorage = localStorageMock as any

describe("TodoApp", () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear()
    localStorageMock.setItem.mockClear()
    localStorageMock.getItem.mockReturnValue(null)
  })

  test("renders todo app with initial state", () => {
    render(<TodoApp />)

    expect(screen.getByText("Todo App")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("What needs to be done?")).toBeInTheDocument()
    expect(screen.getByText("No todos yet. Add one above!")).toBeInTheDocument()
  })

  test("adds a new todo", async () => {
    render(<TodoApp />)

    const input = screen.getByTestId("todo-input")
    const addButton = screen.getByTestId("add-button")

    fireEvent.change(input, { target: { value: "Test todo" } })
    fireEvent.click(addButton)

    await waitFor(() => {
      expect(screen.getByText("Test todo")).toBeInTheDocument()
    })
  })

  test("toggles todo completion", async () => {
    render(<TodoApp />)

    // Add a todo first
    const input = screen.getByTestId("todo-input")
    const addButton = screen.getByTestId("add-button")

    fireEvent.change(input, { target: { value: "Test todo" } })
    fireEvent.click(addButton)

    await waitFor(() => {
      expect(screen.getByText("Test todo")).toBeInTheDocument()
    })

    // Toggle completion
    const toggleButton = screen.getByTestId("toggle-todo")
    fireEvent.click(toggleButton)

    await waitFor(() => {
      const todoText = screen.getByText("Test todo")
      expect(todoText).toHaveClass("line-through")
    })
  })

  test("deletes a todo", async () => {
    render(<TodoApp />)

    // Add a todo first
    const input = screen.getByTestId("todo-input")
    const addButton = screen.getByTestId("add-button")

    fireEvent.change(input, { target: { value: "Test todo" } })
    fireEvent.click(addButton)

    await waitFor(() => {
      expect(screen.getByText("Test todo")).toBeInTheDocument()
    })

    // Delete the todo
    const deleteButton = screen.getByTestId("delete-todo")
    fireEvent.click(deleteButton)

    await waitFor(() => {
      expect(screen.queryByText("Test todo")).not.toBeInTheDocument()
    })
  })

  test("filters todos correctly", async () => {
    render(<TodoApp />)

    // Add two todos
    const input = screen.getByTestId("todo-input")
    const addButton = screen.getByTestId("add-button")

    fireEvent.change(input, { target: { value: "Active todo" } })
    fireEvent.click(addButton)

    fireEvent.change(input, { target: { value: "Completed todo" } })
    fireEvent.click(addButton)

    // Complete one todo
    const toggleButtons = screen.getAllByTestId("toggle-todo")
    fireEvent.click(toggleButtons[0]) // Complete the second todo (first in list)

    // Test active filter
    fireEvent.click(screen.getByTestId("filter-active"))
    await waitFor(() => {
      expect(screen.getByText("Active todo")).toBeInTheDocument()
      expect(screen.queryByText("Completed todo")).not.toBeInTheDocument()
    })

    // Test completed filter
    fireEvent.click(screen.getByTestId("filter-completed"))
    await waitFor(() => {
      expect(screen.queryByText("Active todo")).not.toBeInTheDocument()
      expect(screen.getByText("Completed todo")).toBeInTheDocument()
    })
  })
})
