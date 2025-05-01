import "./css/App.css";
import React, { useState } from "react";
import Counters from "./components/Counter";
import ListItems from "./components/ListItems";
import Input from "./components/Input";
import ControlButtons from "./components/ControlButtons";
import DeleteAll from "./components/DeleteAll";

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
