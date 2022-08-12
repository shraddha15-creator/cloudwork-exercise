import React from "react";
import TimeAgo from "react-timeago";
import { Status } from "../../state/workloads";

import "./workloadItem.css";

export interface WorkloadItemStateProps {
	id: number;
	complexity: number;
	status: Status;
	completeDate: Date;
}

export interface WorkloadItemMethodProps {
	onCancel: () => void;
}

export interface WorkloadItemProps
	extends WorkloadItemStateProps,
		WorkloadItemMethodProps {}

const WorkloadItem: React.SFC<WorkloadItemProps> = (props) => (
	<div className="workload-items-container">
		<div>
			<p className="workload-id">Workload #{props.id}</p>
			<span className="workload-complexity">
				Complexity: {props.complexity}
			</span>
		</div>
		<div>
			{props.status === "WORKING" ? (
				<div className="item">
					<span className="status-working">
						<TimeAgo date={props.completeDate} />
					</span>
					<button className="btn-cancel" onClick={props.onCancel}>
						Cancel
					</button>
				</div>
			) : (
				<span
					className={`status ${props.status === "SUCCESS" ? "green" : "red"} ${
						props.status === "CANCELED" ? "yellow" : ""
					}`}
				>
					{props.status.toLowerCase()}
				</span>
			)}
		</div>
	</div>
);

export { WorkloadItem };

export default WorkloadItem;
