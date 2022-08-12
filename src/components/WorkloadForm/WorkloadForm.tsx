import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { submit } from "../../state/workloads/actions";

import "./workloadform.css";

interface WorkloadFormDispatchProps {
	submitWorkload: (complexity: number) => void;
}

interface WorkloadFormProps extends WorkloadFormDispatchProps {}

interface WorkloadFormState {
	complexity: number;
}

class WorkloadForm extends React.PureComponent<
	WorkloadFormProps,
	WorkloadFormState
> {
	defaultState = {
		complexity: 5,
	};

	state = this.defaultState;

	handleSubmit = (e: React.MouseEvent) => {
		this.props.submitWorkload(this.state.complexity);
		this.setState(this.defaultState);
		e.preventDefault();
	};

	render() {
		return (
			<form>
				<p className="form-title">Create workload</p>

				<div>
					<label>
						Complexity: {this.state.complexity}
						<input
							value={this.state.complexity}
							onChange={(e) =>
								this.setState({ complexity: Number(e.target.value) })
							}
							type="range"
							min="1"
							max="10"
							className="slider"
						/>
					</label>
				</div>

				<div>
					<button className="btn" onClick={this.handleSubmit} type="submit">
						Start work
					</button>
				</div>
			</form>
		);
	}
}

const mapDispatchToProps = (dispatch: Dispatch): WorkloadFormDispatchProps => ({
	submitWorkload: (complexity: number) => dispatch(submit({ complexity })),
});

const WorkloadFormContainer = connect(null, mapDispatchToProps)(WorkloadForm);

export { WorkloadForm, WorkloadFormContainer };

export default WorkloadForm;
