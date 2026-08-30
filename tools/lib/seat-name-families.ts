
export type SeatNameFamily = "person" | "bare-persona" | "composed-identity"

export interface SeatNameFamilyDeclaration {
  readonly family: SeatNameFamily
  readonly shape: string
}

export const SEAT_NAME_FAMILIES: readonly SeatNameFamilyDeclaration[] = [
  { family: "person", shape: "{person}[-{role}]" },
  { family: "bare-persona", shape: "{persona}" },
  { family: "composed-identity", shape: "[{domain}-][{role}][-{flex}]" },
]

export function seatNameShapes(): readonly string[] {
  return SEAT_NAME_FAMILIES.map((declared) => declared.shape)
}
