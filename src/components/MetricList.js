import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "urql";

import * as actions from "../store/actions";
import MetricChip from "./MetricChip";
import { metricsReceived, toggleMetric } from "../store/actions/metrics";
import { getMetricsQuery } from "../store/api";
import colors from "../constants/colors";
import useUrqlWithRedux from "../store/utils/useUrqlWithRedux";

const MetricList = () => {
  const metrics = useSelector(state => state.metrics);

  const dispatch = useDispatch();

  const fetching = useUrqlWithRedux(
    useQuery,
    { query: getMetricsQuery },
    actions.apiError,
    metricsReceived
  );

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
        metrics.map((metric, index) => {
          return (
            <MetricChip
              key={metric.name}
              metric={metric.name}
              selected={metric.selected}
              selectedColor={colors[index]}
              toggleSelected={toggle}
            />
          );
        })}
    </div>
  );
};

export default MetricList;
