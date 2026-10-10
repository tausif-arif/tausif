export interface VectorPoint {
  id: string;
  text: string;
  category: 'animals' | 'tech' | 'food' | 'nature' | 'custom';
  vector: [number, number];
  similarity?: number;
}

export const initialPoints: VectorPoint[] = [
  { id: '1', text: 'Dog', category: 'animals', vector: [0.78, 0.82] },
  { id: '2', text: 'Puppy', category: 'animals', vector: [0.82, 0.85] },
  { id: '3', text: 'Cat', category: 'animals', vector: [0.65, 0.75] },
  { id: '4', text: 'Wolf', category: 'animals', vector: [0.70, 0.90] },

  { id: '5', text: 'Laptop', category: 'tech', vector: [-0.75, 0.68] },
  { id: '6', text: 'Coding', category: 'tech', vector: [-0.82, 0.75] },
  { id: '7', text: 'Server', category: 'tech', vector: [-0.68, 0.82] },
  { id: '8', text: 'Software', category: 'tech', vector: [-0.79, 0.71] },

  { id: '9', text: 'Apple', category: 'food', vector: [-0.65, -0.60] },
  { id: '10', text: 'Banana', category: 'food', vector: [-0.72, -0.65] },
  { id: '11', text: 'Pizza', category: 'food', vector: [-0.55, -0.75] },
  { id: '12', text: 'Burger', category: 'food', vector: [-0.58, -0.80] },

  { id: '13', text: 'Tree', category: 'nature', vector: [0.62, -0.65] },
  { id: '14', text: 'Forest', category: 'nature', vector: [0.68, -0.72] },
  { id: '15', text: 'Mountain', category: 'nature', vector: [0.75, -0.60] }
];

export function cosineSimilarity(v1: [number, number], v2: [number, number]): number {
  const dot = v1[0] * v2[0] + v1[1] * v2[1];
  const mag1 = Math.sqrt(v1[0] * v1[0] + v1[1] * v1[1]);
  const mag2 = Math.sqrt(v2[0] * v2[0] + v2[1] * v2[1]);
  if (mag1 === 0 || mag2 === 0) return 0;
  return Math.max(0, Math.min(1, (dot / (mag1 * mag2) + 1) / 2));
}

export function computeMockEmbedding(input: string): [number, number] {
  const lower = input.toLowerCase().trim();

  if (lower.includes('dog') || lower.includes('puppy') || lower.includes('cat') || lower.includes('pet') || lower.includes('animal') || lower.includes('bark') || lower.includes('kitten')) {
    return [0.75 + (Math.sin(lower.length) * 0.08), 0.80 + (Math.cos(lower.length) * 0.06)];
  }

  if (lower.includes('code') || lower.includes('tech') || lower.includes('computer') || lower.includes('laptop') || lower.includes('dev') || lower.includes('software') || lower.includes('programming') || lower.includes('server')) {
    return [-0.75 + (Math.sin(lower.length) * 0.08), 0.72 + (Math.cos(lower.length) * 0.07)];
  }

  if (lower.includes('food') || lower.includes('fruit') || lower.includes('eat') || lower.includes('apple') || lower.includes('banana') || lower.includes('pizza') || lower.includes('snack') || lower.includes('delicious')) {
    return [-0.65 + (Math.sin(lower.length) * 0.08), -0.68 + (Math.cos(lower.length) * 0.07)];
  }

  if (lower.includes('nature') || lower.includes('tree') || lower.includes('plant') || lower.includes('mountain') || lower.includes('river') || lower.includes('forest') || lower.includes('leaf') || lower.includes('green')) {
    return [0.65 + (Math.sin(lower.length) * 0.08), -0.65 + (Math.cos(lower.length) * 0.07)];
  }

  let hashX = 0;
  let hashY = 0;
  for (let i = 0; i < lower.length; i++) {
    hashX = (hashX * 31 + lower.charCodeAt(i)) % 1000;
    hashY = (hashY * 17 + lower.charCodeAt(i)) % 1000;
  }
  const normX = ((hashX / 500) - 1) * 0.8;
  const normY = ((hashY / 500) - 1) * 0.8;
  return [Number(normX.toFixed(2)), Number(normY.toFixed(2))];
}
