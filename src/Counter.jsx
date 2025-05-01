import styles from "./css/Counters.module.css";

export default function Counters({ taskList }) {
	const doneCount = taskList.filter((task) => task.status === true).length;
	const undoneCount = taskList.filter((task) => task.status !== true).length;
	const sumCount = taskList.length;
	return (
		<>
			<div className={styles.counters}>
				<div className={styles.singleCounter}>ToDos: {sumCount}</div>
				<div className={styles.singleCounter}>Completed: {doneCount}</div>
				<div className={styles.singleCounter}>Not completed: {undoneCount}</div>
			</div>
		</>
	);
}
