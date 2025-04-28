import "./App.css";
import React, { useState } from "react";
import Counters from "./Counter";
import ListItems from "./ListItems";
import Input from "./Input";
import ControlButtons from "./ControlButtons";

export default function App() {
	const [taskList, setTaskList] = useState([]);
	const [editedTask, setEditedTask] = useState(null);
	const [showDelete, setShowDelete] = useState(false);
	const [showOnlyComplete, setShowOnlyComplete] = useState(false);

	return (
		<>
			<div className="ToDo">
				<h1>ToDo tracker</h1>
				<div className="topZone">
					<Input setTaskList={setTaskList} editedTask={editedTask} />
					<ControlButtons
						setShowOnlyComplete={setShowOnlyComplete}
						taskList={taskList}
						setTaskList={setTaskList}
					/>
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
