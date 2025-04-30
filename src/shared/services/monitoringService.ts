import Logger from '../../config/logger';

export const sendToMonitoringService = (errorData: {
  message: string;
  stack: string;
  timestamp: string;
}) => {
  // Aqui você integraria com uma ferramenta de monitoramento real, como Datadog, New Relic, etc.
  Logger.debug('Enviando erro para monitoramento:', errorData);
  // Exemplo para Datadog ou outra ferramenta
  // datadogClient.sendError(errorData);
};
