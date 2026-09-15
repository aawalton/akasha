export function saidBy(thrown: unknown): string {
  return thrown instanceof Error ? thrown.message : String(thrown)
}
