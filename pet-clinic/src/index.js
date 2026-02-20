import React from 'react';
import ReactDOM from 'react-dom/client';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { datadogRum } from '@datadog/browser-rum';
import { reactPlugin } from '@datadog/browser-rum-react';
import { datadogLogs } from '@datadog/browser-logs';

datadogRum.init({
  applicationId: '17247517-f9b6-4e25-9451-26aac0a7e677',
  clientToken: 'pubd8c8cc6cf8c8ace811d48aac63e30c99',
  site: 'datadoghq.com',
  service: 'spring-petclinic',
  env: 'dev',
  // Specify a version number to identify the deployed version of your application in Datadog
  // version: '1.0.0',
  sessionSampleRate: 100,
  sessionReplaySampleRate: 20,
  defaultPrivacyLevel: 'mask-user-input',
  plugins: [reactPlugin({ router: true })],
});

datadogLogs.init({
  clientToken: 'pubd8c8cc6cf8c8ace811d48aac63e30c99',
  site: 'datadoghq.com',
  service: 'spring-petclinic',
  env: 'dev',
  forwardErrorsToLogs: true,
  forwardConsoleLogs: 'all',
  sessionSampleRate: 100,
});

datadogLogs.logger.info('Application initialized', {
  api_base: process.env.REACT_APP_API_URL || 'http://localhost:5000',
});

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();