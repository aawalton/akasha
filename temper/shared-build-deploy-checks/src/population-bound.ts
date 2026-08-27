export function renderPopulationBound(examined: number, declared: number, unit: string): string {
  if (declared === 0) {
    return `[EMPTY POPULATION — 0 ${unit}: this run examined nothing, so it certifies nothing]`
  }
  const missing = declared - examined
  return missing > 0
    ? `[over ${examined} of ${declared} ${unit} — ${missing} could not be examined]`
    : `[over ${examined} of ${declared} ${unit}]`
}
