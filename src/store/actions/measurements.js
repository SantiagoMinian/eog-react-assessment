export const ACTION_TYPES = {
  MEASUREMENTS_RECEIVED: "MEASUREMENTS/MEASUREMENTS_RECEIVED",
  NEW_MEASUREMENT_RECEIVED: "MEASUREMENT/NEW_MEASUREMENT_RECEIVED"
};

export const measurementsReceived = data => ({
  type: ACTION_TYPES.MEASUREMENTS_RECEIVED,
  payload: { data }
});

export const newMeasurementReceived = data => ({
  type: ACTION_TYPES.NEW_MEASUREMENT_RECEIVED,
  payload: { data }
});
