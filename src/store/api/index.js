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
