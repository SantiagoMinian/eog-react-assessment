export const ACTION_TYPES = {
  MEASUREMENTS_RECEIVED: "MEASUREMENTS/MEASUREMENTS_RECEIVED"
};

export const measurementsReceived = measurements => {
  return {
    type: ACTION_TYPES.MEASUREMENTS_RECEIVED,
    payload: { measurements }
  };
};
