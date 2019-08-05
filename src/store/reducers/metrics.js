import createReducer from "../utils/createReducer";
import { ACTION_TYPES } from "../actions/metrics";

const initialState = [];

const metricsReceived = (_, action) => {
  return action.payload.data.getMetrics.map(metric => ({
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

const updateMetric = (state, action) => {
  const { metricName, value } = action.payload;
  return state.map(metric =>
    metric.name === metricName ? { ...metric, value } : metric
  );
};

const handlers = {
  [ACTION_TYPES.METRICS_RECEIVED]: metricsReceived,
  [ACTION_TYPES.TOGGLE_METRIC]: toggleMetric,
  [ACTION_TYPES.UPDATE_METRIC]: updateMetric
};

export default createReducer(initialState, handlers);
