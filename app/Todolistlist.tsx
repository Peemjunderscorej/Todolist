import { Todolist } from "./Todolist";
import TodolistCard from "./TodolistCard";

interface TodolistsProps {
    todolists : Todolist[] ,
    handleEdit : (id: number ) => void,
    handleDelete : (id : number ) => void
}

export default function Todolistlist( {todolists, handleEdit, handleDelete} : TodolistsProps ){
    return(
        <>
     
 
    <div>
      {todolists.map((todolist) => (
          <div key={todolist.id} className=' '>
              <TodolistCard todolist={todolist} handleEdit={() => handleEdit(todolist.id)} handleDelete={() => handleDelete(todolist.id)}/>
          </div>

        ))}
    </div>
 

    
        </>
    );
}