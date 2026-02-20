import { datadogLogs } from '@datadog/browser-logs';

const reportWebVitals = onPerfEntry => {
  const logMetric = (metric) => {
    datadogLogs.logger.info('Web vital metric', {
      metric_name: metric.name,
      metric_value: metric.value,
      metric_rating: metric.rating,
      metric_id: metric.id,
    });
    if (onPerfEntry && onPerfEntry instanceof Function) {
      onPerfEntry(metric);
    }
  };

  import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
    getCLS(logMetric);
    getFID(logMetric);
    getFCP(logMetric);
    getLCP(logMetric);
    getTTFB(logMetric);
  });
};

export default reportWebVitals;
