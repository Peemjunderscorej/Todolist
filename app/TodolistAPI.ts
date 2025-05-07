import { Todolist } from "./Todolist";

const BASE_URL = "http://localhost:4000/todolists";

const TodolistAPI = {
  // GET all todos
  async getAll(search: string = ''): Promise<Todolist[]> {
    // Construct the URL with an optional search query
    const url = search 
      ? `${BASE_URL}?name_like=${search}`  // Filter by name
      : BASE_URL;  // No filter, fetch all items
  
    const response = await fetch(url);
  
    if (!response.ok) throw new Error("Failed to fetch todos");
  
    return await response.json();
  },
  

  // POST (create) a new todo
  async create(todo: Omit<Todolist, "id">): Promise<Todolist> {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    if (!response.ok) throw new Error("Failed to create todo");
    return await response.json();
  },

  // PUT (update) an existing todo by ID
  async update(id: number | undefined, updatedTodo: Todolist): Promise<Todolist> {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTodo),
    });
    if (!response.ok) throw new Error("Failed to update todo");
    return await response.json();
  },

  // DELETE a todo by ID
  async remove(id: number | undefined): Promise<void> {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete todo");
  },
};

export default TodolistAPI;
