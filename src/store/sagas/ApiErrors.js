import { takeEvery, call, put } from "redux-saga/effects";
import { toast } from "react-toastify";

import * as actions from "../actions";
import { ACTION_TYPES } from "../actions/measurements";
import { updateMetric } from "../actions/metrics";

function* apiErrorReceived(action) {
  yield call(toast.error, `Error Received: ${action.error}`);
}

function* newMeasurementReceivedSaga(action) {
  yield put(
    updateMetric(
      action.payload.data.newMeasurement.metric,
      action.payload.data.newMeasurement.value
    )
  );
}

function* watchApiError() {
  yield takeEvery(actions.API_ERROR, apiErrorReceived);
  yield takeEvery(
    ACTION_TYPES.NEW_MEASUREMENT_RECEIVED,
    newMeasurementReceivedSaga
  );
}

export default [watchApiError];
