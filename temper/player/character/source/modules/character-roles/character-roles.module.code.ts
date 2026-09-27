import {
  createDataFile,
  type DataFile,
} from "akasha/code/type/narrowing/modules/create-data-file/create-data-file.module.code.ts"
import type { RoleId as RolePageSlug } from "akasha/temper/player/character/role/modules/role-ids/role-ids.data-table.code.ts"

export type RoleId = RolePageSlug

interface RoleTemplate {
  id: RoleId
  name: string
}

type Roles = DataFile<RoleId, RoleTemplate>

type Row = Readonly<Record<string, unknown>>

const NO_ROLE: RoleId = "no-role"

const UNREAD =
  "the character roles are read with the skill catalogue, and nothing has read them yet — gate the screen on `SkillCatalogGate`, or await `loadSkillCatalog()` where the work starts"

class CharacterRolesUnread extends Error {
  constructor() {
    super(UNREAD)
    this.name = "CharacterRolesUnread"
  }
}

function placed(row: Row): readonly [number, RoleTemplate] {
  const at = `the character role page \`${String(row.slug)}\``
  if (typeof row.displayOrder !== "number") throw new Error(`${at} states no display order`)
  if (typeof row.title !== "string") throw new Error(`${at} states no title`)
  return [row.displayOrder, { id: String(row.slug) as RoleId, name: row.title }]
}

export function rolesOf(pages: Iterable<Row>): Roles {
  const read = [...pages]
    .map(placed)
    .sort(([one], [two]) => one - two)
    .map(([, role]) => role)
  const data = Object.fromEntries(read.map((one) => [one.id, one])) as Record<RoleId, RoleTemplate>
  return createDataFile<RoleTemplate>()(data)
}

let held: Roles | null = null

export function holdRoles(read: Roles): Roles {
  held = read
  return read
}

export function characterRoles(): Roles {
  if (held === null) throw new CharacterRolesUnread()
  return held
}

export function heldCharacterRoles(): Roles | null {
  return held
}

export function getRoleName(roleIds: readonly RoleId[]): string {
  const { data } = characterRoles()
  const filtered = roleIds.filter((id) => id !== NO_ROLE)
  if (filtered.length === 0) return data[NO_ROLE].name
  return filtered.map((id) => data[id].name).join(" + ")
}
