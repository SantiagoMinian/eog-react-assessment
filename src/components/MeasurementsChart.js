import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "urql";
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
import { getMeasurementsQuery } from "../store/api";
import { measurementsReceived } from "../store/actions/measurements";

const from = Date.now() - 30 * 60 * 1000;
const MeasurementsChart = () => {
  const metrics = useSelector(state =>
    state.metrics
      .filter(metric => metric.selected)
      .map(metric => ({
        ...metric,
        unit:
          state.measurements &&
          state.measurements[metric.name] &&
          state.measurements[metric.name].unit
      }))
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
  const dispatch = useDispatch();

  const [result] = useQuery({
    query: getMeasurementsQuery,
    variables: {
      input: metrics.map(metric => ({ metricName: metric.name, after: from }))
    }
  });
  const { fetching, data, error } = result;

  useEffect(() => {
    if (error) {
      dispatch({ type: actions.API_ERROR, error: error.message });
      return;
    }
    if (!data) return;
    const { getMultipleMeasurements } = data;
    dispatch(measurementsReceived(getMultipleMeasurements));
  }, [dispatch, data, error]);

  if (fetching) return "Loading...";

  return (
    metrics.length > 0 && (
      <ResponsiveContainer width="100%" height="80%">
        <LineChart
          data={measurements}
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
              stroke="#8884d8"
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
