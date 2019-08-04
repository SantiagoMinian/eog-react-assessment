export const ACTION_TYPES = {
  METRICS_RECEIVED: "METRICS/METRICS_RECEIVED",
  TOGGLE_METRIC: "METRICS/TOGGLE_METRIC"
};

export const metricsReceived = metrics => ({
  type: ACTION_TYPES.METRICS_RECEIVED,
  payload: { metrics }
});

export const toggleMetric = metricName => ({
  type: ACTION_TYPES.TOGGLE_METRIC,
  payload: { metricName }
});
