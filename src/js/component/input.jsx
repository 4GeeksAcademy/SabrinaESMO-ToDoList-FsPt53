import React, { useState } from "react";

const Input = () => {

    const [inputValue, setInputValue] = useState('');
    const [list, setList] = useState([]);

    const validate = (value) => {
        setInputValue(value);
    }

    const addItem = () => {
        list.unshift(inputValue);
        setList(list);
        setInputValue('');
    }
    
    const _handleKeyDown = () => {
        function(e) {
            if (e.key === "Enter"){
                addItem();
            }
        }
    }

    return (
        <div className="text-center">
            <h1 className="text-center mt-5">¿Empezamos a organizarnos?</h1>
            <br></br>
            <p>Añadir nueva tarea:</p>
            <input type="text" onChange={e => validate(e.target.value)} onKeyDown={this._handleKeyDown} value={inputValue} />

            {/* <button onClick={() => addItem()}>
                Añadir
            </button> */}

            <ul>
                <h5 className="mt-5 text-center">Lista de tareas pendientes:</h5>
                {
                    list.map((el, i) => (
                        <li key={i}>
                            {el}
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default Input;