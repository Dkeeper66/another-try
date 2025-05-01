import { useState } from "react";
import styles from ".//../css/DeletAll.module.css";

export default function DeleteAll({ setTaskList, setEditedTask }) {
	const [showDelete, setShowDelete] = useState(false);
	return (
		<>
			<div className={styles.deleteAllArea}>
				{!showDelete && (
					<button type="button" onClick={() => setShowDelete(true)}>
						Delete all
					</button>
				)}
				{showDelete && (
					<div className={styles.choose}>
						<p>Are you sure?</p>
						<div className={styles.chooseButtons}>
							<button
								type="button"
								className={styles.buttonOption}
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
								className={styles.buttonOption}
								style={{ color: "green" }}
								onClick={() => setShowDelete(false)}
							>
								No
							</button>
						</div>
					</div>
				)}
			</div>
		</>
	);
}
