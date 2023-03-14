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
        socket.emit("addTodo", {
            id: generateID(),
            todo,
            comments: [],
        });
        setTodo("");
    };

    const deleteTodo = (id) => socket.emit("deleteTodo", id);

    useEffect(() => {
        function fetchTodos() {
            fetch(`${process.env.LOCALHOST}:4000/api`)
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