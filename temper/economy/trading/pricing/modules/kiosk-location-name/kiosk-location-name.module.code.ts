import {
  numberAt,
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

export type KioskNames = ReadonlyMap<number, string>

export const KIOSK_NAME_FIELDS: readonly string[] = ["slug", "kioskId", "title"]

export const NO_KIOSK_NAMES: KioskNames = new Map()

function unread(slug: string, name: string): Error {
  return new Error(`kioskNamesFrom: guild trader \`${slug}\` states no \`${name}\``)
}

export function kioskNamesFrom(rows: readonly Value[]): KioskNames {
  const names = new Map<number, string>()
  for (const row of rows) {
    const slug = textAt(row, "slug") ?? "?"
    const kioskId = numberAt(row, "kioskId")
    if (kioskId === null) throw unread(slug, "kioskId")
    const title = textAt(row, "title")
    if (title === null) throw unread(slug, "title")
    names.set(kioskId, title)
  }
  return names
}

export function kioskLocationName(names: KioskNames, id: number | string): string {
  const numId = typeof id === "string" ? Number(id) : id
  return names.get(numId) ?? `Location ${id}`
}

let held: KioskNames | null = null

export function holdKioskNames(names: KioskNames): KioskNames {
  held = names
  return names
}

export function heldKioskNames(): KioskNames | null {
  return held
}
