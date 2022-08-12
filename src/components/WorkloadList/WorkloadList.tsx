import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { AnimatedList } from "react-animated-list";

import { RootAction, RootState } from "../../state";
import { cancel } from "../../state/workloads/actions";
import { WorkloadItem, WorkloadItemStateProps } from "../WorkloadItem";

export interface WorkloadListStateProps {
	workloads: WorkloadItemStateProps[];
}

export interface WorkloadListDispatchProps {
	cancelWorkload: (id: number) => void;
}

export interface WorkloadListProps
	extends WorkloadListStateProps,
		WorkloadListDispatchProps {}

const WorkloadList: React.SFC<WorkloadListProps> = ({
	workloads,
	cancelWorkload,
}) =>
	!workloads.length ? (
		<span className="workload-available">No workloads to display</span>
	) : (
		<div>
			<div className="workload-available">
				Total Workloads: {workloads && workloads.length}
			</div>
			<AnimatedList animation={"grow"} initialAnimationDuration={1000}>
				{workloads.reverse().map((workload) => (
					<div key={workload.id}>
						<WorkloadItem
							{...workload}
							onCancel={() => cancelWorkload(workload.id)}
						/>
					</div>
				))}
			</AnimatedList>
		</div>
	);

const mapStateToProps = (state: RootState): WorkloadListStateProps => ({
	workloads: Object.values(state.workloads),
});

const mapDispatchToProps = (
	dispatch: Dispatch<RootAction>
): WorkloadListDispatchProps => ({
	cancelWorkload: (id: number) => dispatch(cancel({ id })),
});

const WorkloadListContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(WorkloadList);

export { WorkloadList, WorkloadListContainer };

export default WorkloadList;
