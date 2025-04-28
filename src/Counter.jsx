export default function Counters({ taskList }) {
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
}
