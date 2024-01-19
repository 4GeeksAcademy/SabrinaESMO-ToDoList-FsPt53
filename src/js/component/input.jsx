import React, { useState } from "react";

const Input = () => {

    const [inputValue, setInputValue] = useState("");
    const [list, setList] = useState([]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }

    const addItem = () => {
        if (inputValue.trim() !== "") {
            setList([inputValue, ...list]);
            setInputValue("");
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addItem();
        }
    }

    const onDelete = (index) => {
        const updatedItems = [...list.slice(0, index), ...list.slice(index + 1)];
        setList(updatedItems);
    }

    return (
        <div className="contentBox text-center w-75 mx-auto p-2 mt-5">
            <h1 className="text-center mt-1 ">¿Nos organizamos?</h1>
            <br></br>
            <input type="text" onChange={handleInputChange} onKeyDown={handleKeyDown} value={inputValue} placeholder="Añadir nueva tarea" />

            <ul className="listContainer mt-3 w-75 mx-auto p-2">
                
                {list.length === 0 ? (<p className="text-center text-muted">No hay tareas pendientes.</p>) : (<div>{
                    list.map((el, i) => (
                        <li key={i} className="itemContainer  mb-2 text-start position-relative">
                            <i>-&emsp;</i>
                            {el}
                            <button className="deleteButton position-absolute end-0" onClick={() => onDelete(i)}><i class="trashCan fa-regular fa-trash-can"></i></button>
                        </li>
                    ))
                }
                </div>)} 
                
            
                
            </ul>
        </div>
    );
};

export default Input;