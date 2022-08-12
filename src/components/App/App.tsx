import React, { PureComponent } from "react";

import { WorkloadListContainer } from "../WorkloadList";
import { WorkloadFormContainer } from "../WorkloadForm";
import "./App.css";

class App extends PureComponent {
	render() {
		return (
			<div className="main-container">
				<nav>CloudWork</nav>
				<div className="workload-container">
					<WorkloadFormContainer />
					<WorkloadListContainer />
				</div>
			</div>
		);
	}
}

export default App;
