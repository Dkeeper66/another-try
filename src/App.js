import "./css/App.css";
import React, { useState } from "react";
import Counters from "./Counter";
import ListItems from "./ListItems";
import Input from "./Input";
import ControlButtons from "./ControlButtons";
import DeleteAll from "./DeleteAll";

export default function App() {
	const [taskList, setTaskList] = useState([]);
	const [editedTask, setEditedTask] = useState(null);

	const [showOnlyComplete, setShowOnlyComplete] = useState(false);

	return (
		<>
			<div className="ToDo">
				<h1>ToDo tracker</h1>
				<div>
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
				<div>
					<DeleteAll setTaskList={setTaskList} setEditedTask={setEditedTask} />
				</div>
				<Counters taskList={taskList} />
			</div>
		</>
	);
}
