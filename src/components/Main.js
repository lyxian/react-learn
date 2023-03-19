import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import Modal from "./Modal";

function Main({ socket }) {
    const [todo, setTodo] = useState("");
    const [todoList, setTodoList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedItemID, setSelectedItemID] = useState("false");

    const toggleModal = (itemId) => {
        socket.emit("viewComments", itemId);
        // 👇🏻 Pass this ID into the Modal component
        setSelectedItemID(itemId);
        setShowModal(!showModal);
    };

    //👇🏻 Generates a random string as the todo ID
    const generateID = () => Math.random().toString(36).substring(2, 10);

    const handleAddTodo = (e) => {
        e.preventDefault();
        //👇🏻 Sends a event - addTodo via Socket.io
        // containing the id, todo, and the comments array
        const data = {
            id: generateID(),
            todo,
            comments: [],
        }
        socket.emit("addTodo", data);
        setTodo("");
        // Post to DB
        fetch(`${process.env.LOCALHOST}:${process.env.PORT}/api/post`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            body: JSON.stringify({ ...data, user: localStorage.getItem("_username") }), // body data type must match "Content-Type" header
            // mode: "cors", // no-cors, *cors, same-origin
            // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            // credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                alert("Error in adding task!");
                // console.log("Error in adding task!");
            });
    };

    const deleteTodo = (id) => {
        socket.emit("deleteTodo", id)
        // Post to DB
        fetch(`${process.env.LOCALHOST}:${process.env.PORT}/api/delete`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            body: JSON.stringify({ id }), // body data type must match "Content-Type" header
            // mode: "cors", // no-cors, *cors, same-origin
            // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            // credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                alert("Error in deleting task!");
                // console.log("Error in adding task!");
            });
    };

    useEffect(() => {
        function fetchTodos() {
            fetch(`${process.env.LOCALHOST}:4000/api/getAll`)
                .then((res) => res.json())
                .then((data) => setTodoList(data))
                .catch((err) => console.error(err));
        }
        fetchTodos();

        socket.on("todos", (data) => setTodoList(data));
    }, [socket]);

    return (
        <div>
            <Nav />
            <form className='form' onSubmit={handleAddTodo}>
                <input
                    value={todo}
                    onChange={(e) => setTodo(e.target.value)}
                    className='input'
                    required
                />
                <button className='form__cta'>ADD TODO</button>
            </form>

            <div className='todo__container'>
                {todoList.map((item) => (
                    <div className='todo__item' key={item.id}>
                        <p>{item.todo}</p>
                        <div>
                            <button className='commentsBtn' onClick={() => toggleModal(item.id)}>
                                View Comments
                            </button>

                            <button className='deleteBtn' onClick={() => deleteTodo(item.id)}>
                                DELETE
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {/*👇🏻 The Modal replaces the Main component*/}
            {showModal ? (
                <Modal socket={socket} showModal={showModal} setShowModal={setShowModal} selectedItemID={selectedItemID} />
            ) : (
                ""
            )}
        </div>
    );
}

export default Main;