import { existsSync, readFileSync } from "node:fs"
import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { changeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.ts"
import { addFileOfAnyKind } from "akasha/change/mechanical/file/add/add-file-of-any-kind/add-file-of-any-kind.change-mechanical.ts"
import {
  type Asking,
  runMechanicalChange,
} from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import type { LocationEntry } from "akasha/temper/addon/pages/world/antiquities/modules/leads-location-types/leads-location-types.module.code.ts"
import { PACKAGE_OF } from "akasha/temper/catalog/upstream-data/modules/upstream-libraries/upstream-libraries.module.code.ts"
import { makeLuaVm } from "akasha/temper/eso/lua-runner/modules/lua-vm/lua-vm.module.code.ts"
import { addonsDir } from "akasha/temper/eso/path/modules/eso-paths-resolve/eso-paths-resolve.module.code.ts"
import { z } from "zod"

export const LEAD_LIST_SOURCE = "LeadList/locale/locationsdata_en.lua"

const ROWS_PER_PART = 50

const PUT = `${changeMechanical.slug}/${addFileOfAnyKind.slug}` as const

const MESSAGE = "Write the antiquity lead table from upstream Lead List"

const TYPES_FROM =
  "akasha/temper/addon/pages/world/antiquities/modules/leads-location-types/leads-location-types.module.code.ts"

const ROW = z.tuple([z.string(), z.string(), z.string(), z.enum(["TRUE", "FALSE"]), z.number()])

const TABLE = z.record(z.string(), ROW)

const WHOLE = z.record(z.string(), z.unknown())

const NAMED = [
  "LOCDATA_TYPE_EXCAVATIONREWARD",
  "LOCDATA_TYPE_FIXLOCATION",
  "LOCDATA_TYPE_STARTER",
  "LOCDATA_TYPE_ANTIQUEMAP",
  "UNKNOWN",
] as const

type Row = readonly [number, LocationEntry]

type Named = readonly (readonly [string, string])[]

interface Written {
  at: string
  body: string
}

interface LeadList {
  rows: Record<number, LocationEntry>
  named: Named
}

async function readLeadList(addons: string): Promise<LeadList> {
  const source = await readFile(join(addons, LEAD_LIST_SOURCE), "utf-8")
  const vm = await makeLuaVm()
  try {
    const carried = await vm.run(
      `ILeadList = {}\nassert(loadstring(${JSON.stringify(source)}))()\nreturn ILeadList`
    )
    const whole = WHOLE.parse(carried)
    const rows: Record<number, LocationEntry> = {}
    for (const [key, row] of Object.entries(TABLE.parse(whole["Locations"]))) {
      const [description, type, short, complete, id] = row
      if (String(id) !== key) throw new Error(`Lead List's row ${key} names itself ${String(id)}`)
      rows[id] = { description, type, short, complete: complete === "TRUE" }
    }
    if (Object.keys(rows).length === 0) throw new Error("Lead List carries no location rows")
    const named = NAMED.map((name): readonly [string, string] => {
      const value = whole[name]
      if (typeof value !== "string") throw new Error(`Lead List carries no string ${name}`)
      return [name, value]
    })
    return { rows, named }
  } finally {
    await vm.close()
  }
}

export async function leadListRows(addons: string): Promise<Record<number, LocationEntry>> {
  return (await readLeadList(addons)).rows
}

function partSlug(at: number): string {
  return `leads-locations-${String(at)}`
}

function codeAt(slug: string): string {
  return join(PACKAGE_OF["lead-list"], slug, `${slug}.module.code.ts`)
}

function entryLine([id, entry]: Row): string {
  const said = [
    `description: ${JSON.stringify(entry.description)}`,
    `type: ${JSON.stringify(entry.type)}`,
    `short: ${JSON.stringify(entry.short)}`,
    `complete: ${String(entry.complete)}`,
  ]
  return `  ${String(id)}: { ${said.join(", ")} },`
}

function partText(at: number, rows: readonly Row[]): string {
  return (
    `import type { LocationEntry } from "${TYPES_FROM}"\n\n` +
    `export const LOCATIONS_${String(at)}: Record<number, LocationEntry> = {\n` +
    `${rows.map(entryLine).join("\n")}\n}\n`
  )
}

function wholeText(parts: number): string {
  const numbers = Array.from({ length: parts }, (_, at) => at + 1)
  const imports = numbers.map(
    (at) => `import { LOCATIONS_${String(at)} } from "akasha/${codeAt(partSlug(at))}"\n`
  )
  const spread = numbers.map((at) => `  ...LOCATIONS_${String(at)},\n`)
  return (
    `import type { LocationEntry } from "${TYPES_FROM}"\n` +
    imports.join("") +
    `\nexport const LOCATIONS: Record<number, LocationEntry> = {\n${spread.join("")}}\n`
  )
}

function typesText(named: Named): string {
  const constants = named.map(
    ([name, value]) => `export const ${name} = ${JSON.stringify(value)}\n`
  )
  return (
    "export interface LocationEntry {\n" +
    "  description: string\n" +
    "  type: string\n" +
    "  short: string\n" +
    "  complete: boolean\n" +
    `}\n\n${constants.join("")}`
  )
}

function partsOf(rows: readonly Row[]): Row[][] {
  const parts: Row[][] = []
  for (let at = 0; at < rows.length; at += ROWS_PER_PART) {
    parts.push(rows.slice(at, at + ROWS_PER_PART))
  }
  return parts
}

export async function port(root: string, done: string[] = []): Promise<void> {
  const { rows: carried, named } = await readLeadList(addonsDir())
  const rows: Row[] = Object.entries(carried)
    .map(([key, entry]): Row => [Number(key), entry])
    .sort((one, other) => one[0] - other[0])
  const parts = partsOf(rows)
  const written: Written[] = parts.map((part, at) => {
    const code = codeAt(partSlug(at + 1))
    if (!existsSync(join(root, code))) {
      throw new Error(
        `the lead table needs ${String(parts.length)} parts and no module holds part ${String(at + 1)}`
      )
    }
    return { at: code, body: partText(at + 1, part) }
  })
  written.push({ at: codeAt("leads-locations"), body: wholeText(parts.length) })
  written.push({ at: codeAt("leads-location-types"), body: typesText(named) })
  const asked = written
    .filter(
      ({ at, body }) =>
        !existsSync(join(root, at)) || readFileSync(join(root, at), "utf-8") !== body
    )
    .map((given): Asking => ({ at: PUT, given }))
  if (asked.length === 0) {
    done.push(`the lead table already holds what ${LEAD_LIST_SOURCE} carries`)
    return
  }
  const landed = await runMechanicalChange(root, asked, MESSAGE)
  if ("refusals" in landed) throw new Error(landed.refusals.join("; "))
  done.push(
    `${String(rows.length)} lead row(s) over ${String(parts.length)} part(s) read from ${LEAD_LIST_SOURCE}`,
    ...landed.said
  )
}
