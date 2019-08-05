export const getMetricsQuery = `	
query getMetrics {	
  getMetrics
}	
`;

export const getMeasurementsQuery = `	
query getMeasurements($input: [MeasurementQuery]!) {
  getMultipleMeasurements(input:$input) {
    metric
		measurements {
      value
      at
      unit
    }
  }
}
`;

export const newMeasurementSubscription = `
subscription newMeasurement {
  newMeasurement {
    metric
    value
    at
    unit
  }
}
`;
