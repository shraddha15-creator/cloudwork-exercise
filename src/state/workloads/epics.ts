import { combineEpics, Epic } from "redux-observable";
import { from } from "rxjs";
import { filter, tap, mergeMap, map, ignoreElements } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";

import { RootAction, RootState } from "../reducer";
import * as workloadsActions from "./actions";
import { WorkloadService } from "./services";

type AppEpic = Epic<RootAction, RootAction, RootState>;
const workloadService = new WorkloadService();

const logWorkloadSubmissions: AppEpic = (action$) =>
	action$.pipe(
		filter(isActionOf(workloadsActions.submit)),
		map((action) => action.payload),
		tap((action) => console.log("WORKLOAD SUBMITTED", action)),
		ignoreElements()
	);

export const createWorkLoad: AppEpic = (action$) =>
	action$.pipe(
		filter(isActionOf(workloadsActions.submit)),
		mergeMap((action) => from(workloadService.create(action.payload))),
		tap((action) => console.log("WORKLOAD CREATED", action)),
		map((response) => workloadsActions.created(response))
	);

export const cancelWorkLoad: AppEpic = (action$) =>
	action$.pipe(
		filter(isActionOf(workloadsActions.cancel)),
		map((action) => action.payload),
		tap((action) => console.log("WORKLOAD CANCELLED", action)),
		mergeMap((payload) => from(workloadService.cancel(payload))),
		map((response) => workloadsActions.updateStatus(response))
	);

export const epics = combineEpics(
	logWorkloadSubmissions,
	cancelWorkLoad,
	createWorkLoad
);

export default epics;
