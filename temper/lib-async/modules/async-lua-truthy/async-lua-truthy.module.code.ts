export function luaTruthy(value: unknown): boolean {
  return value !== undefined && value !== false
}
