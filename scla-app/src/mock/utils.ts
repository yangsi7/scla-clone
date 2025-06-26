/**
 * Generates a UUID v4 string
 * Used throughout the mock data system to create unique identifiers for all entities
 * @returns A UUID v4 formatted string (e.g., "550e8400-e29b-41d4-a716-446655440000")
 * @example
 * const symptomId = uuidv4(); // "123e4567-e89b-12d3-a456-426614174000"
 */
export function uuidv4(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * Randomly selects one item from an array
 * Used for generating random symptoms, triggers, and notes in mock data
 * @param array - Array of items to choose from
 * @returns A randomly selected item from the array
 * @example
 * const symptom = randomChoice(PREDEFINED_SYMPTOMS); // "Brain Fog"
 */
export function randomChoice<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Randomly samples multiple unique items from an array
 * Used for selecting multiple triggers for a symptom
 * @param array - Array of items to sample from
 * @param count - Number of items to sample
 * @returns Array of randomly selected unique items
 * @example
 * const triggers = randomSample(PREDEFINED_TRIGGERS, 3); // ["Caffeine", "Stress", "Poor sleep"]
 */
export function randomSample<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/**
 * Selects a value based on weighted probabilities
 * Used to create realistic data distributions (e.g., most days have 0-1 symptoms)
 * @param values - Array of possible values to return
 * @param weights - Array of weights corresponding to each value (higher weight = higher probability)
 * @returns One of the values based on weighted random selection
 * @example
 * // 60% chance of 0, 30% chance of 1, 8% chance of 2, 2% chance of 3
 * const symptomCount = weightedRandom([0, 1, 2, 3], [0.6, 0.3, 0.08, 0.02]);
 */
export function weightedRandom(values: number[], weights: number[]): number {
  const total = weights.reduce((a, b) => a + b, 0);
  const random = Math.random() * total;
  let cumulative = 0;
  
  for (let i = 0; i < values.length; i++) {
    cumulative += weights[i];
    if (random < cumulative) return values[i];
  }
  
  return values[values.length - 1];
}

/**
 * Creates a Promise that resolves after a specified delay
 * Used to simulate network latency in mock API calls
 * @param ms - Milliseconds to delay
 * @returns Promise that resolves after the delay
 * @example
 * await delay(800); // Simulates 800ms network request
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}