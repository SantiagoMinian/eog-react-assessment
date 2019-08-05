import createReducer from "../utils/createReducer";
import { ACTION_TYPES } from "../actions/measurements";

const initialState = {};

const measurementsReceived = (state, action) => {
  return action.payload.measurements.reduce(
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

const handlers = {
  [ACTION_TYPES.MEASUREMENTS_RECEIVED]: measurementsReceived
};

export default createReducer(initialState, handlers);
