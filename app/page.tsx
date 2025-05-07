"use client";

import { useState, useEffect } from "react";
import Todolistlist from "./components/Todolistlist";
import { Todolist } from "./Todolist";
import TodolistAPI from "./TodolistAPI";
import ModalFormCreate from "./createPopup";
import ModalFormUpdate from "./components/updatePopup";

export default function Home() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("to-do");

  const [todolists, setTodolists] = useState<Todolist[]>([]);
  const [searchText, setSearchText] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [editTodoId, setEditTodoId] = useState<number | undefined>();

  const resetForm = () => {
    setName("");
    setDescription("");
    setStatus("to-do");
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    resetForm();
    setIsModalOpen(false);
    setIsModalUpdateOpen(false);
    setEditTodoId(undefined);
  };

  const openEditModal = (id: number) => {
    const todo = todolists.find((t) => t.id === id);
    if (todo) {
      setName(todo.name);
      setDescription(todo.description);
      setStatus(todo.status);
      setEditTodoId(id);
      setIsModalUpdateOpen(true);
    }
  };

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newTodo = { name, description, status };
      const created = await TodolistAPI.create(newTodo);
      setTodolists((prev) => [...prev, created]);
    } catch (error) {
      console.error(error);
    } finally {
      closeModal();
    }
  };

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>, id?: number) => {
    e.preventDefault();
    if (!id) return;
    try {
      const updated = new Todolist(name, description, status, id);
      const data = await TodolistAPI.update(id, updated);
      setTodolists((prev) => prev.map((t) => (t.id === id ? data : t)));
    } catch (error) {
      console.error(error);
    } finally {
      closeModal();
    }
  };

  const handleDelete = async (id?: number) => {
    if (!id) return;
    try {
      await TodolistAPI.remove(id);
      setTodolists((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await TodolistAPI.getAll(searchText);
        setTodolists(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [searchText]);

  useEffect(() => {
    const init = async () => {
      try {
        const data = await TodolistAPI.getAll();
        setTodolists(data);
      } catch (error) {
        console.error(error);
      }
    };
    init();
  }, []);

  return (
    <div className="container">
      <h1>Todo-List</h1>
      <button onClick={openModal}>Add Todo</button>

      {isModalOpen && (
        <ModalFormCreate
          name={name}
          description={description}
          status={status}
          setName={setName}
          setDescription={setDescription}
          setStatus={setStatus}
          handleSubmit={handleCreate}
          closeModal={closeModal}
        />
      )}

      {isModalUpdateOpen && (
        <ModalFormUpdate
          name={name}
          description={description}
          status={status}
          setName={setName}
          setDescription={setDescription}
          setStatus={setStatus}
          handleSubmit={(e) => handleEdit(e, editTodoId)}
          closeModal={closeModal}
          id={editTodoId}
        />
      )}

      <form>
        <label>
          <strong>Search: </strong>
          <input value={searchText} onChange={(e) => setSearchText(e.target.value)} />
        </label>
      </form>

      <Todolistlist
        todolists={todolists}
        handleEdit={openEditModal}
        handleDelete={handleDelete}
      />
    </div>
  );
}
