import { useState } from "react";

export default function ListItems({
	taskList,
	setTaskList,
	editedTask,
	setEditedTask,
	showOnlyComplete,
}) {
	const [task, setTask] = useState("");
	const [showEdit, setShowEdit] = useState(null);

	const toggleStatus = (id) => {
		const newTaskList = taskList.map((task) =>
			task.id === id ? { ...task, status: !task.status } : task
		);
		setTaskList(newTaskList);
	};

	const handleEdit = (taskObj) => {
		setEditedTask(taskObj.id);
		setTask(taskObj.name);
		setShowEdit(taskObj.id);
	};

	const handleSave = (e) => {
		e.preventDefault();
		if (editedTask) {
			const newTaskList = taskList.map((t) =>
				t.id === editedTask ? { ...t, name: task } : t
			);
			setTaskList(newTaskList);
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
			<ul>{listItems}</ul>
		</>
	);
}
