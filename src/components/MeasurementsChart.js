import React from "react";
import { useSelector } from "react-redux";
import { useQuery, useSubscription } from "urql";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";
import moment from "moment";

import * as actions from "../store/actions";
import { getMeasurementsQuery, newMeasurementSubscription } from "../store/api";
import {
  measurementsReceived,
  newMeasurementReceived
} from "../store/actions/measurements";
import colors from "../constants/colors";
import useUrqlWithRedux from "../store/utils/useUrqlWithRedux";

const from = Date.now() - 30 * 60 * 1000;
const MeasurementsChart = () => {
  const metrics = useSelector(state =>
    state.metrics
      .map((metric, index) => ({
        ...metric,
        unit:
          state.measurements &&
          state.measurements[metric.name] &&
          state.measurements[metric.name].unit,
        color: colors[index]
      }))
      .filter(metric => metric.selected)
  );

  const measurements = useSelector(state =>
    metrics.reduce(
      (acc, metric) => [
        ...acc,
        ...(state.measurements && state.measurements[metric.name]
          ? state.measurements[metric.name].measurements
          : [])
      ],
      []
    )
  );

  const fetching = useUrqlWithRedux(
    useQuery,
    {
      query: getMeasurementsQuery,
      variables: {
        input: metrics.map(metric => ({ metricName: metric.name, after: from }))
      }
    },
    actions.apiError,
    measurementsReceived
  );

  useUrqlWithRedux(
    useSubscription,
    { query: newMeasurementSubscription },
    actions.apiError,
    newMeasurementReceived
  );

  if (fetching) return "Loading...";

  return (
    metrics.length > 0 && (
      <ResponsiveContainer width="100%" height="80%">
        <LineChart
          data={[...measurements]}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis
            dataKey="at"
            padding={{ right: 20, left: 20 }}
            domain={["dataMin", "dataMax"]}
            name="Time"
            tickFormatter={unixTime => moment(unixTime).format("HH:mm Do")}
            type="number"
          />
          {[...new Set(metrics.map(metric => metric.unit))].map(
            unit =>
              unit && (
                <YAxis
                  key={unit}
                  yAxisId={unit}
                  label={{
                    value: unit,
                    angle: 0,
                    offset: 2,
                    position: "insideTopLeft"
                  }}
                  padding={{ top: 20, bottom: 20 }}
                  domain={["dataMin", "dataMax"]}
                />
              )
          )}
          {metrics.map(metric => (
            <Line
              key={metric.name}
              yAxisId={metric.unit}
              isAnimationActive={false}
              dataKey={metric.name}
              stroke={metric.color}
              dot={false}
            />
          ))}
          <Tooltip active />
        </LineChart>
      </ResponsiveContainer>
    )
  );
};

MeasurementsChart.propTypes = {};

export default MeasurementsChart;
