import React, { useState } from "react";

const Input = () => {

    const [inputValue, setInputValue] = useState("");
    const [list, setList] = useState([]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }

    const addItem = () => {
        if (inputValue.trim() !== ""){
            setList([inputValue, ...list]);
        setInputValue("");
        }      
    }
    
    const handleKeyDown = (e) => {
         if (e.key === "Enter"){
            e.preventDefault();    
            addItem();
            }
        }

    const onDelete = (index) => {
        const updatedItems = [...list.slice(0, index), ...list.slice(index + 1)];
        setList(updatedItems);
      }

    return (
        <div className="text-center">
            <h1 className="text-center mt-5">¿Empezamos a organizarnos?</h1>
            <br></br>
            <input type="text" onChange={handleInputChange} onKeyDown={handleKeyDown} value={inputValue} placeholder="Añadir nueva tarea"/>

            <ul>
                <h5 className="mt-5 text-center">Lista de tareas pendientes:</h5>
                {
                    list.map((el, i) => (
                        <li key={i}>
                            {el}
                            <button onClick={() => onDelete(i)}>Cruz</button>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default Input;