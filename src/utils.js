export function createPageUrl(pageName) {
  const routes = {
    'Home': '/',
    'ClimateDashboard': '/climate-dashboard',
    'CarbonCalculator': '/carbon-calculator',
    'ClimateGame': '/climate-game',
    'SDG13Targets': '/sdg13-targets',
    'QRCodes': '/qr-codes'
  };
  
  return routes[pageName] || '/';
}

export function cn(...inputs) {
  return inputs.filter(Boolean).join(' ');
}