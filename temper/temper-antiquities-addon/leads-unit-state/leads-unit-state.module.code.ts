let units: Record<number, LeadsUnitData> = {}
let setsMinFound: Record<number, number> = {}

export function getUnits(): Record<number, LeadsUnitData> {
  return units
}

export function setUnits(next: Record<number, LeadsUnitData>): undefined {
  units = next
}

export function getSetsMinFound(): Record<number, number> {
  return setsMinFound
}

export function setSetsMinFound(next: Record<number, number>): undefined {
  setsMinFound = next
}

export function isFinishedNonRepeatable(data: LeadsUnitData): boolean {
  return !data.Repeatable && data.Dug === 1
}

export function isOverCollectedSet(data: LeadsUnitData): boolean {
  if (data.SetId <= 0) {
    return false
  }
  const minFound = setsMinFound[data.SetId]
  return minFound !== undefined && data.Dug > minFound
}
