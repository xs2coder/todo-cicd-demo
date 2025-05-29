/**
Runtime Configuration (Advanced)
For truly dynamic configuration that can change without rebuilding:
Create a config endpoint or file:

public/config.js (served as static file)
 */
window.APP_CONFIG = {
  apiUrl: 'https://api.myapp.com',
  environment: 'production'
};