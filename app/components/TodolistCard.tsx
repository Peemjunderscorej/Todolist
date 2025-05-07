import { Todolist } from "../Todolist"

interface TodolistProps {
    todolist : Todolist,
    handleEdit : () => void,
    handleDelete : () => void
}

export default function TodolistCard({todolist , handleEdit, handleDelete}: TodolistProps ){
    return(
        <div className="container">
       
            <div className="card">
                <p><strong>Name : </strong>{todolist.name}</p>
                <p><strong>Description : </strong>{todolist.description}</p>
                <p><strong>Status : </strong>{todolist.status}</p>
         

        <span>
            <button onClick={handleEdit}>
                edit
            </button>
        </span>

        <span>
            <button onClick={handleDelete} >
                delete
            </button>
        </span>

        

        </div>
    </div>
    );
   
}