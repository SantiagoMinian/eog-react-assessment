export const ACTION_TYPES = {
  METRICS_RECEIVED: "METRICS/METRICS_RECEIVED",
  TOGGLE_METRIC: "METRICS/TOGGLE_METRIC",
  UPDATE_METRIC: "METRICS/UPDATE_METRIC"
};

export const metricsReceived = data => ({
  type: ACTION_TYPES.METRICS_RECEIVED,
  payload: { data }
});

export const toggleMetric = metricName => ({
  type: ACTION_TYPES.TOGGLE_METRIC,
  payload: { metricName }
});

export const updateMetric = (metricName, value) => ({
  type: ACTION_TYPES.UPDATE_METRIC,
  payload: { metricName, value }
});
