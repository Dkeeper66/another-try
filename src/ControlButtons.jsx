import { useState } from "react";
import styles from "./css/ControlButtons.module.css";

export default function ControlButtons({
	taskList,
	setTaskList,
	setShowOnlyComplete,
}) {
	const [filterButton, setFilterButton] = useState(true);
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
			<div className={styles.extraButtons}>
				<button type="button" onClick={handleCompleteAll}>
					Complete all
				</button>
				<button
					type="button"
					className={`${styles.button} ${
						!filterButton ? styles.buttonActive : ""
					}`}
					onClick={() => handleFilter()}
				>
					Show only completed
				</button>
			</div>
		</>
	);
}
