import { useState } from "react";
import styles from "./css/Input.module.css";

export default function Input({ setTaskList, editedTask }) {
	const [task, setTask] = useState("");
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
	return (
		<>
			<form className={styles.inputArea} onSubmit={handleSubmit}>
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
		</>
	);
}
