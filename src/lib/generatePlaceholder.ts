export const generatePlaceholderSVG = (text: string) => {
  const svg = `
    <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#3B82F6;stop-opacity:0.2" />
          <stop offset="100%" style="stop-color:#8B5CF6;stop-opacity:0.2" />
        </linearGradient>
      </defs>
      <rect width="200" height="200" fill="url(#grad)" />
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui" font-size="24" fill="#3B82F6" font-weight="bold">
        ${text}
      </text>
    </svg>
  `;
  
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

export const placeholderImages = {
  brand1: generatePlaceholderSVG('Brand 1'),
  brand2: generatePlaceholderSVG('Brand 2'),
  brand3: generatePlaceholderSVG('Brand 3'),
}; 