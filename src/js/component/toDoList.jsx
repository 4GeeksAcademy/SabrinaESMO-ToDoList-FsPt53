import React, { useEffect, useState } from "react";

const toDoList = () => {

    const [inputValue, setInputValue] = useState("");
    const [list, setList] = useState([]);
    const [user, setUser] = useState([]);
    

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

    const getList = async (user) => {
        try {
            await fetch(`https://playground.4geeks.com/apis/fake/todos/user/${user}`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then( response => response.json())
            .then(
                response => setList(response)
            );
        } catch (error){
            console.error("Ha habido un error al cargar las tareas", error);
        }
    }

    const updateList = async (user) => {
        try {
            await fetch(`https://playground.4geeks.com/apis/fake/todos/user/${user}`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(list)
            }).then(response => response.ok);
        } catch (error) {
            console.error("Ha habido un error al actualizar las tareas", error);
        }
    }

    const createUser = async () => {
        const response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/sesmodev',
        {
            method: 'POST',
            body: JSON.stringify([]),
            headers: {
                "Content-Type": "application/json"
            }
        }
        ).then(response => console.log(response.ok));
        return response;
    };

    const handleOnCreateUser = () => {
        createUser();
    };

    const handlegetList = () => {
        getList()
    }


    useEffect(async () => {
        await getList(user);
    }, [user]);

    useEffect (() => {
        if (list.length !== 0){
            updateList(user)
        }
    }, [list, user]);


    return (
        <div className="contentBox text-center w-75 mx-auto p-2 mt-5">
            <h1 className="text-center mt-1 ">PRO To-Do-List</h1>
            <br></br>
                <div>
                    <button onClick={() => handleOnCreateUser()}>Crear usuario</button>
                    <button onClick={() => handlegetList()}>Cargar tareas</button>
                </div>
            <br></br>

            <input type="text" onChange={handleInputChange} onKeyDown={handleKeyDown} value={inputValue} placeholder="Añadir nueva tarea" />

            <ul className="listContainer mt-3 w-75 mx-auto p-2">
                {list.length === 0 ? (<p className="text-center text-muted">No hay tareas pendientes.</p>) : (<div>{
                    list.map((el, i) => (
                        <li key={i} className="itemContainer  mb-2 text-start position-relative">
                            <i>-&emsp;</i>
                            {el}
                            <button className="deleteButton position-absolute end-0" onClick={() => onDelete(i)}><i className="trashCan fa-regular fa-trash-can"></i></button>
                        </li>
                    ))
                }
                </div>)} 
            </ul>
        </div>
    );
};

export default toDoList;