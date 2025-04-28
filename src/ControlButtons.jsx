import { useState } from "react";

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
		</>
	);
}
