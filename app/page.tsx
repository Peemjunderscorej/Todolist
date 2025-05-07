"use client"
import {useState, useEffect} from 'react'
import Todolistlist from './Todolistlist'
import { Todolist } from './Todolist'
import TodolistAPI from './TodolistAPI'
import ModalFormCreate from './createPopup'
import ModalFormUpdate from './updatePopup'


export default function Home(){
  const [name,setName] = useState("")
  const [description,setDescription] = useState("")
  const [status, setStatus] = useState("to-do")

  const[todolist, setTodolist] = useState<Todolist>()
  const[todolists, setTodolists] = useState<Todolist[]>([])

  const[searchText, setSearchText] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [editTodoId, setEditTodoId] = useState<number | undefined>(undefined);

  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
      setName("")
      setDescription("")
      setStatus("")
     
    setIsModalOpen(false);
    setIsModalUpdateOpen(false);
    setEditTodoId(undefined); // Reset the edit ID when closing
  };

  const openEditModal = (id: number) => {
    setEditTodoId(id); // Set the ID to edit
    const todoToEdit = todolists.find((todo) => todo.id === id);
    if (todoToEdit) {
        setName(todoToEdit.name);
        setDescription(todoToEdit.description);
        setStatus(todoToEdit.status);
        setIsModalUpdateOpen(true); // Open the update modal
    }
};




  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      try{
        const newTodo = {name, description, status}
        
        const data = await TodolistAPI.create(newTodo)
        setTodolists([...todolists, data])
      } catch(error){
        console.log(error)
      } finally {

      }

      setName("")
      setDescription("")
      setStatus("")
      closeModal(); 
  }

  const handleEdit = async ( e: React.FormEvent<HTMLFormElement>, id: number | undefined) => {
    e.preventDefault()

    if (id === undefined) {
      console.log("Invalid ID");
      return; // Exit the function if ID is undefined
    }
    
    try{
        const newTodo = new Todolist(name, description, status, id)

        const data = await TodolistAPI.update(id, newTodo)

        setTodolists(prev => prev.map(todo => (todo.id === id ? data : todo)))
    } catch(error) {
      console.log(error)
    } finally {
      setName("")
      setDescription("")
      setStatus("")
      closeModal(); 
      closeModal();
    }
  }

  const handleDelete = async ( id: number | undefined) => {
   

    try{
      await TodolistAPI.remove(id)

      setTodolists(prev => prev.filter(todo => todo.id !== id))
    } catch(error) {
        console.log(error)
    } finally {

    }
  }

  useEffect(() => {
    const search = async () => {
        try{
          const data = await TodolistAPI.getAll(searchText)
          setTodolists(data)
        } catch(error) {
          console.log(error)
        } finally {

        }
    }

    search()

  }, [searchText])

  useEffect(() => {

    const fetchData = async () => {
      
      try {
        const data = await TodolistAPI.getAll()
        setTodolists(data)
      } catch(error) {
        console.log(error)
      } finally {
  
      }
    }

    fetchData()
    
  },[])

  return(
    <>
    <div>
      <h1>Todo-List</h1>
    </div>
    

    <div className='container'>
    <button onClick={openModal}>Add Todo</button> {/* Open the modal */}

{/* Conditionally render the modal when isModalOpen is true */}
{isModalOpen && (
  <ModalFormCreate
    name={name}
    description={description}
    status={status}
    setName={setName}
    setDescription={setDescription}
    setStatus={setStatus}
    handleSubmit={handleSubmit}
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
            handleSubmit={handleEdit}
            closeModal={closeModal}
            id={editTodoId} // Pass the correct ID for update
          />
        )}
      

      <div className='container'>
          <form>
            <label>
              <strong>Search : </strong>
              <input value={searchText} onChange = {e => setSearchText(e.target.value)}/>
            </label>


          </form>
      </div>

    </div>
    <Todolistlist todolists={todolists} handleEdit={openEditModal} handleDelete={ handleDelete}/>
    <div>

    </div>
    </>
  )
}