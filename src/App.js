import "./App.css";
import React, { useState } from "react";
import Counters from "./Counter";
import ListItems from "./ListItems";

export default function App() {
	const [task, setTask] = useState("");
	const [taskList, setTaskList] = useState([]);
	const [editedTask, setEditedTask] = useState(null);
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
		setTaskList((prev) => [...prev, objTask]);
		setTask("");
	};

	const handleCompleteAll = () => {
		const newTaskList = taskList.map((task) => ({ ...task, status: true }));
		setTaskList(newTaskList);
	};

	const handleFilter = () => {
		setShowOnlyComplete((prev) => !prev);
		setFilterButton((prev) => !prev);
	};

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
						<button type="button" onClick={handleCompleteAll}>
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
				<ListItems
					taskList={taskList}
					setTaskList={setTaskList}
					editedTask={editedTask}
					setEditedTask={setEditedTask}
					showOnlyComplete={showOnlyComplete}
				/>
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
