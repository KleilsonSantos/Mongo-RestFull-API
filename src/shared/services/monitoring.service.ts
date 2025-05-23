import Logger from '../../config/logger';

export const sendToMonitoringService = (errorData: {
  message: string;
  stack: string;
  timestamp: string;
}) => {
  // Here you would integrate with a real monitoring tool, such as Datadog, New Relic, etc.
  Logger.debug('📡 Sending error to monitoring service:', errorData);
  // Example for Datadog or another tool
  // datadogClient.sendError(errorData);
};
export const sum = (a: number, b: number): number => a + b;
