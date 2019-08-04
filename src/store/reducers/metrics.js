import createReducer from "../utils/createReducer";
import { ACTION_TYPES } from "../actions/metrics";

const initialState = [];

const metricsReceived = (_, action) => {
  return action.payload.metrics.map(metric => ({
    name: metric,
    selected: false
  }));
};

const toggleMetric = (state, action) => {
  const { metricName } = action.payload;
  return state.map(metric =>
    metric.name === metricName
      ? { ...metric, selected: !metric.selected }
      : metric
  );
};

const handlers = {
  [ACTION_TYPES.METRICS_RECEIVED]: metricsReceived,
  [ACTION_TYPES.TOGGLE_METRIC]: toggleMetric
};

export default createReducer(initialState, handlers);
