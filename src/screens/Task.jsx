import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const Task = () => {
	const [todo, setTodo] = useState("");
	const [todolist, setTodoList] = useState([]);
	const [theme, setTheme] = useState("light");

	const addTodo = () => {
		if (todo.trim() === "") return;
		setTodoList([
			...todolist,
			{ id: Date.now(), text: todo, completed: false },
		]);
		setTodo("");
	};

	const toggleComplete = (id) => {
		setTodoList(
			todolist.map((item) =>
				item.id === id ? { ...item, completed: !item.completed } : item
			)
		);
	};

	const deleteTodo = (id) => {
		setTodoList(todolist.filter((item) => item.id !== id));
	};

	const lightTheme = () => {
		console.log("setting up light theme");
		setTheme("light");
	};

	const darkTheme = () => {
		console.log("setting up dark theme");
		setTheme("dark");
	};

	return (
		<div className={`theme-container ${theme}`}>
			<div>
				<button id='light' onClick={lightTheme}>
					Light
				</button>
				<button id='dark' onClick={darkTheme}>
					Dark
				</button>
			</div>
			<div className='container'>
				<h1>TODO List</h1>
				<div className='input-container'>
					<input type='text' placeholder='Search Task' />
					<input
						type='text'
						placeholder='Add a new task'
						value={todo}
						onChange={(e) => setTodo(e.target.value)}
					/>
					<button className='add-btn' onClick={addTodo}>
						Add Task
					</button>
					<nav className='flex flex-row space-x-3'>
						<Link to='features'>Features</Link>
						<Link to='newTask'>New</Link>
					</nav>
					<Outlet />
					<h2>Task 1</h2>
					<h2>Task 2</h2>
					<h2>Task 3</h2>
				</div>
				<ul className='todo-list'>
					{todolist.map((item) => (
						<li
							key={item.id}
							onClick={() => toggleComplete(item.id)}
							style={{
								cursor: "pointer",
								textDecoration: item.completed ? "line-through" : "none",
								color: item.completed ? "grey" : "black",
							}}
						>
							<span>{item.text}</span>
							<button
								className='delete-btn'
								onClick={(e) => {
									e.stopPropagation();
									deleteTodo(item.id);
								}}
							>
								Delete
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default Task;
