import createReducer from "../utils/createReducer";
import { ACTION_TYPES } from "../actions/measurements";

const initialState = {};

const measurementsReceived = (state, action) => {
  return action.payload.data.getMultipleMeasurements.reduce(
    (accumulator, { metric, measurements }) => {
      return {
        ...accumulator,
        [metric]: {
          measurements: measurements.map(measure => ({
            at: measure.at,
            [metric]: measure.value
          })),
          unit: measurements[0].unit
        }
      };
    },
    state
  );
};

const newMeasurementReceived = (state, action) => {
  const measurement = action.payload.data.newMeasurement;
  if (!state[measurement.metric]) return state;
  return {
    ...state,
    [measurement.metric]: {
      measurements: [
        ...state[measurement.metric].measurements,
        {
          at: measurement.at,
          [measurement.metric]: measurement.value
        }
      ],
      unit: measurement.unit
    }
  };
};

const handlers = {
  [ACTION_TYPES.MEASUREMENTS_RECEIVED]: measurementsReceived,
  [ACTION_TYPES.NEW_MEASUREMENT_RECEIVED]: newMeasurementReceived
};

export default createReducer(initialState, handlers);
