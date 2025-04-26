import "./App.css";
import React, { useState } from "react";

const Counters = ({ taskList }) => {
	const doneCount = taskList.filter((task) => task.status === true).length;
	const undoneCount = taskList.filter((task) => task.status !== true).length;
	const sumCount = taskList.length;
	return (
		<>
			<div className="counters">
				<div className="singleCounter">ToDos: {sumCount}</div>
				<div className="singleCounter">Completed: {doneCount}</div>
				<div className="singleCounter">Not completed: {undoneCount}</div>
			</div>
		</>
	);
};

export default function App() {
	const [task, setTask] = useState("");
	const [taskList, setTaskList] = useState([]);
	const [editedTask, setEditedTask] = useState(null);
	const [showEdit, setShowEdit] = useState(null);
	const [showDelete, setShowDelete] = useState(false);
	const [showOnlyComplete, setShowOnlyComplete] = useState(false);
	const [filterButton, setFilterButton] = useState(true);
	const handleSubmit = (e) => {
		e.preventDefault();
		const objTask = {
			name: task,
			status: false,
			id: Date.now(),
		};
		setTaskList([...taskList, objTask]);
		setTask("");
	};
	const toggleStatus = (id) => {
		setTaskList(
			taskList.map((task) =>
				task.id === id ? { ...task, status: !task.status } : task
			)
		);
	};

	const handleEdit = (taskObj) => {
		setEditedTask(taskObj.id);
		setTask(taskObj.name);
		setShowEdit(taskObj.id);
	};

	const handleSave = (e) => {
		e.preventDefault();
		if (editedTask) {
			setTaskList(
				taskList.map((t) => (t.id === editedTask ? { ...t, name: task } : t))
			);
			setEditedTask(null);
			setTask("");
			setShowEdit(null);
		}
	};

	const handleDelete = ({ id }) => {
		const newList = taskList.filter((task) => task.id !== id);
		setTaskList(newList);
		setEditedTask(null);
	};

	const handleCompleteAll = () => {
		setTaskList(taskList.map((task) => ({ ...task, status: true })));
	};

	const handleFilter = () => {
		setShowOnlyComplete(!showOnlyComplete);
		setFilterButton(!filterButton);
	};

	const listItems = taskList.map(({ name, id, status }) => {
		let styleID = "falseTask";
		let hiddenStatus = false;
		if (showOnlyComplete && !status) {
			hiddenStatus = true;
		}
		if (status === true) {
			styleID = "trueTask";
		}
		return (
			<div className="taskshow" key={id}>
				<div className="singleTask" hidden={hiddenStatus}>
					<div>
						<li id={styleID}>
							<span className="taskName">{name}</span>
							<span className="taskStatus">
								{status ? "Completed" : "Not completed"}
							</span>
						</li>
					</div>
					<input
						className="checkbox"
						type="checkbox"
						checked={status}
						onChange={() => toggleStatus(id)}
					></input>
					<div>
						{showEdit !== id && (
							<button type="button" onClick={() => handleEdit({ name, id })}>
								Edit
							</button>
						)}
					</div>
					<div>
						{showEdit === id && (
							<form onSubmit={handleSave}>
								<input
									id="save"
									type="text"
									autoComplete="off"
									placeholder={name}
									value={task}
									onChange={(e) => setTask(e.target.value)}
								></input>
								<button id="saveButton" type="submit">
									Save
								</button>
							</form>
						)}
					</div>
					<button
						type="button"
						onClick={() => handleDelete({ id })}
						id="deleteSingleButton"
					>
						Delete
					</button>
				</div>
			</div>
		);
	});

	return (
		<>
			<div className="ToDo">
				<h1>ToDo tracker</h1>
				<div className="topZone">
					<form className="inputArea" onSubmit={handleSubmit}>
						<input
							value={task}
							type="text"
							required
							autoComplete="off"
							onChange={(e) => setTask(e.target.value)}
							disabled={editedTask !== null}
							id="input"
						/>
						<button type="submit" disabled={editedTask !== null}>
							Sumbit
						</button>
					</form>
					<div className="extraButtons">
						<button
							type="button"
							onClick={() => handleCompleteAll({ taskList })}
						>
							Complete all
						</button>
						<button
							type="button"
							className="buttons"
							id={filterButton.toString()}
							onClick={() => handleFilter()}
						>
							Show only completed
						</button>
					</div>
				</div>
				<ul>{listItems}</ul>
				{!showDelete && (
					<button type="button" onClick={() => setShowDelete(true)}>
						Delete all
					</button>
				)}

				{showDelete && (
					<div className="choose">
						<p>Are you sure?</p>
						<div className="chooseButtons">
							<button
								type="button"
								id="choose"
								onClick={() => {
									setTaskList([]);
									setShowDelete(false);
									setEditedTask(null);
								}}
							>
								Yes
							</button>
							<button
								type="button"
								id="choose"
								style={{ color: "green" }}
								onClick={() => setShowDelete(false)}
							>
								No
							</button>
						</div>
					</div>
				)}

				<Counters taskList={taskList} />
			</div>
		</>
	);
}
