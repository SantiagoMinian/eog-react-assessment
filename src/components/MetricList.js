import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "urql";

import * as actions from "../store/actions";
import MetricChip from "./MetricChip";
import { metricsReceived, toggleMetric } from "../store/actions/metrics";
import { getMetricsQuery } from "../store/api";

const MetricList = () => {
  const metrics = useSelector(state => state.metrics);

  const dispatch = useDispatch();

  const [result] = useQuery({ query: getMetricsQuery });
  const { fetching, data, error } = result;

  useEffect(() => {
    if (error) {
      dispatch({ type: actions.API_ERROR, error: error.message });
      return;
    }
    if (!data) return;
    const { getMetrics } = data;
    dispatch(metricsReceived(getMetrics));
  }, [dispatch, data, error]);

  const toggle = useCallback(
    metric => {
      dispatch(toggleMetric(metric));
    },
    [dispatch]
  );

  if (fetching) return "Loading...";

  return (
    <div>
      {metrics &&
        metrics.map(metric => {
          return (
            <MetricChip
              key={metric.name}
              metric={metric.name}
              selected={metric.selected}
              toggleSelected={toggle}
            />
          );
        })}
    </div>
  );
};

export default MetricList;
