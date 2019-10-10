export const transformPath = (path: [string, string][]) =>
  path.map(([lat, lng]) => ({ lat: Number(lat), lng: Number(lng) }));
