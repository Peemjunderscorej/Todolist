import React from 'react';

interface ModalFormProps {
  name: string;
  description: string;
  status: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>, id: number | undefined) => void;
  closeModal: () => void;
  id : number | undefined;
}

const ModalFormUpdate: React.FC<ModalFormProps> = ({
  name,
  description,
  status,
  setName,
  setDescription,
  setStatus,
  handleSubmit,
  closeModal,
  id,
}) => {

    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent default form submission
    
        // Call handleSubmit with event and id
        if (id !== undefined) {
          handleSubmit(e, id);  // For editing, pass the id to update the todo
        } else {
          handleSubmit(e, undefined);  // For new todo, pass undefined or -1 as placeholder
        }
      };


  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal" onClick={(e) => e.stopPropagation()}> {/* Prevent closing when clicking inside the modal */}
        <h2>Add Todo</h2>
        <form onSubmit={onSubmitHandler}>
          <div>
            <label>
              Name:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Description:
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Status:
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="to-do">To-Do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </label>
          </div>
          <div>
            <button type="submit">Submit</button>
            <button type="button" onClick={closeModal}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalFormUpdate;
