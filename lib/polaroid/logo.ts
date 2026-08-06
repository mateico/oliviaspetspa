import { SHOP_NAME } from "./layout";

export function buildLogoSvg(diameter: number): string {
  const radius = diameter / 2;

  // Simple paw icon path (5 circles: 1 pad + 4 toes)
  // Centered at (50, 50) in a 100x100 viewBox
  const pawPath = `
    <circle cx="50" cy="65" r="12" fill="currentColor"/>
    <circle cx="25" cy="35" r="8" fill="currentColor"/>
    <circle cx="50" cy="20" r="8" fill="currentColor"/>
    <circle cx="75" cy="35" r="8" fill="currentColor"/>
    <circle cx="65" cy="55" r="7" fill="currentColor"/>
  `;

  return `
    <svg width="${diameter}" height="${diameter}" viewBox="0 0 ${diameter} ${diameter}" xmlns="http://www.w3.org/2000/svg">
      <!-- Semi-opaque circular background -->
      <circle cx="${radius}" cy="${radius}" r="${radius}" fill="white" opacity="0.85"/>
      
      <!-- Paw icon (scaled to fit) -->
      <g transform="translate(${radius * 0.3}, ${radius * 0.2}) scale(${radius * 0.015})">
        ${pawPath}
      </g>
      
      <!-- Shop name text (small, centered in lower half) -->
      <text x="${radius}" y="${radius + radius * 0.35}" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="${radius * 0.5}" font-weight="600" fill="#333" letter-spacing="0.5">
        ${SHOP_NAME}
      </text>
    </svg>
  `;
}
