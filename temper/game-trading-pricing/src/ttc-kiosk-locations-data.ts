import { TTC_KIOSK_LOCATIONS } from "./generated/ttc-kiosk-locations.generated"

export function kioskLocationName(id: number | string): string {
  const numId = typeof id === "string" ? Number(id) : id
  return TTC_KIOSK_LOCATIONS[numId] ?? `Location ${id}`
}
