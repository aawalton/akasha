import {
  createDataFile,
  type DataFile,
} from "akasha/code/type/narrowing/modules/create-data-file/create-data-file.module.code.ts"

interface TargetArmorTemplate {
  id: string
  name: string
  armor: number
  isDefault: boolean
}

export type TargetArmorId = string

type TargetArmors = DataFile<TargetArmorId, TargetArmorTemplate>

const UNREAD =
  "the target armors are read from pages, and nothing has read them yet — gate the screen on `MetricCatalogGate` or `CompanionCatalogGate`, or hold them before the work starts"

class TargetArmorsUnread extends Error {
  constructor() {
    super(UNREAD)
    this.name = "TargetArmorsUnread"
  }
}

type Row = Readonly<Record<string, unknown>>

function armorOf(row: Row): TargetArmorTemplate {
  const at = `the target armor page \`${String(row.slug)}\``
  const { key, title, armor } = row
  if (typeof key !== "string") throw new Error(`${at} states no key`)
  if (typeof title !== "string") throw new Error(`${at} states no title`)
  if (typeof armor !== "number") throw new Error(`${at} states no armor`)
  return { id: key, name: title, armor, isDefault: row.defaultTarget === true }
}

export function targetArmorsOf(pages: Iterable<Row>): TargetArmors {
  const read = [...pages].map(armorOf).sort((one, two) => one.id.localeCompare(two.id))
  return createDataFile<TargetArmorTemplate>()(Object.fromEntries(read.map((one) => [one.id, one])))
}

let held: TargetArmors | null = null

export function holdTargetArmors(read: TargetArmors): TargetArmors {
  held = read
  return read
}

export function targetArmor(): TargetArmors {
  if (held === null) throw new TargetArmorsUnread()
  return held
}

export function defaultTargetArmorId(): TargetArmorId {
  const found = Object.values(targetArmor().data).find((one) => one.isDefault)
  if (found === undefined) throw new Error("no target armor page is the default target")
  return found.id
}

export function targetArmorValue(id: TargetArmorId): number {
  const found = targetArmor().data[id]
  if (found === undefined) throw new Error(`no target armor page states the key \`${id}\``)
  return found.armor
}
