import client from 'prom-client';

export const register = new client.Registry();

client.collectDefaultMetrics({ register });

export const httpRequestsTotal = new client.Counter({
  name: 'http_requests_total_2',
  help: 'Total de requisições recebidas',
  labelNames: ['method', 'route', 'status'],
});

register.registerMetric(httpRequestsTotal);

export const httpRequestDurationSeconds = new client.Histogram({
  name: 'http_request_duration_seconds_2',
  help: 'Duração das requisições HTTP em segundos',
  labelNames: ['method', 'route', 'status'],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 1.5, 2, 3, 5],
});

register.registerMetric(httpRequestDurationSeconds);
