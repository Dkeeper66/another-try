import { useState } from "react";
import styles from ".//../css/ListItems.module.css";

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
		let hiddenStatus = false;
		if (showOnlyComplete && !status) {
			hiddenStatus = true;
		}

		return (
			<div className={styles.taskshow} key={id}>
				<div className={styles.singleTask} hidden={hiddenStatus}>
					<div>
						<li className={`${status ? styles.trueTask : styles.falseTask}`}>
							{showEdit !== id ? (
								<span
									className={`${styles.taskName} ${
										status ? styles.lineThrough : ""
									}`}
								>
									{name}
								</span>
							) : (
								<form onSubmit={handleSave}>
									<textarea
										className={styles.inputSave}
										type="text"
										autoComplete="off"
										placeholder={name}
										value={task}
										onChange={(e) => setTask(e.target.value)}
									></textarea>
									<button className={styles.saveButton} type="submit">
										Save
									</button>
								</form>
							)}

							<span className={styles.taskStatus}>
								{status ? "Completed" : "Not completed"}
							</span>
						</li>
					</div>
					<input
						className={styles.checkbox}
						type="checkbox"
						checked={status}
						onChange={() => toggleStatus(id)}
					></input>
					<div>
						<button
							type="button"
							disabled={showEdit === id}
							onClick={() => handleEdit({ name, id })}
						>
							Edit
						</button>
					</div>
					<button
						type="button"
						onClick={() => handleDelete({ id })}
						className={styles.deleteSingleButton}
					>
						Delete
					</button>
				</div>
			</div>
		);
	});

	return (
		<>
			<div className={styles.taskArea}>
				<ul>{listItems}</ul>
			</div>
		</>
	);
}
