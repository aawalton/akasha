export const summary =
  "Report the color every agent surface draws from — the turn states, the palette, and what each producer answers"

import { existsSync, readdirSync, readFileSync } from "node:fs"
import type { Dirent } from "node:fs"
import { homedir } from "node:os"
import { parseArgs } from "../../lib/parse-args.ts"
import { parseFrontmatter, textField } from "../../../page/frontmatter.ts"
import { placeDirOf } from "../../../page/page-types.ts"
import { pageFileIn } from "../../../page/page-file.ts"
import { fileStemOf } from "../../../page/name/name.ts"
import { akashaRoot, resolveRoots } from "../../../repo/roots/roots.ts"
import { colorStatedOn, stateStandsAs } from "../../lib/seat-turn-color.ts"
import { SEAT_TURN_STATES, type SeatTurnState } from "../../lib/seat-turn-state.ts"
import type { CommandHelp } from "../../ops/surface.ts"

const NOTHING = "—"

const SPELLINGS: readonly string[] = ["colors", "colours"]

const WITHDRAWN: readonly string[] = ["colours", "colour"]

const HOUSE = "color"

const CALLED: readonly string[] = ["agent-turn-colors", "agent-turn-colours"]

const ID_PREFIXES: readonly string[] = ["ops.color.", "ops.colour."]

function artefact(): string {
  return process.env.PROMOTE_ARTEFACT ?? `${homedir()}/.local/share/code-editor`
}

export const help: CommandHelp = {
  flags: [{ name: "--json", description: "Emit the whole reading as one JSON object instead of the printed report" }],
}

interface Shade {
  readonly slug: string
  readonly hex: string | null
}

interface StateDrawing {
  readonly state: SeatTurnState
  readonly rank: number
  readonly page: string
  readonly color: string | null
  readonly stands: boolean
  readonly hex: string | null
}

interface Answered {
  readonly surface: string
  readonly ran: string
  readonly wanted: readonly string[]
  readonly key: string | null
  readonly drawn: Record<string, string>
  readonly refused: string | null
}

interface Shipped {
  readonly at: string
  readonly running: string | null
  readonly subject: string | null
  readonly promotedAt: string | null
  readonly calls: readonly string[]
  readonly absent: readonly string[]
  readonly ids: readonly string[]
}

interface Reading {
  readonly states: readonly StateDrawing[]
  readonly palette: readonly Shade[]
  readonly surfaces: readonly Answered[]
  readonly shipped: Shipped
  readonly readings: readonly string[]
}

function shadeIn(root: string, dir: string, slug: string): Shade | null {
  const at = pageFileIn(root, dir, slug) ?? `${dir}/${slug}.md`
  let body: string
  try {
    body = readFileSync(`${root}/${at}`, "utf8")
  } catch {
    return null
  }
  return { slug, hex: textField(parseFrontmatter(body), "hex") }
}

function paletteIn(akasha: string): readonly Shade[] {
  const at = placeDirOf(HOUSE)
  let names: readonly string[]
  try {
    names = readdirSync(`${akasha}/${at}`)
  } catch {
    return []
  }
  const shades: Shade[] = []
  for (const name of [...names].sort()) {
    if (!name.endsWith(".md")) continue
    const found = shadeIn(akasha, at, fileStemOf(name))
    if (found !== null) shades.push(found)
  }
  return shades
}

function statesIn(akasha: string): readonly StateDrawing[] {
  const domains = placeDirOf("domain")
  const colors = placeDirOf(HOUSE)
  return SEAT_TURN_STATES.map((state, rank) => {
    const color = colorStatedOn(akasha, stateStandsAs(state))
    const shade = color === null ? null : shadeIn(akasha, colors, color)
    return {
      state,
      rank,
      page:
        pageFileIn(akasha, domains, stateStandsAs(state)) ??
        `${domains}/${stateStandsAs(state)}.md`,
      color,
      stands: shade !== null,
      hex: shade?.hex ?? null,
    }
  })
}

function answerOf(root: string, args: readonly string[]): unknown | string {
  const out = Bun.spawnSync(["bun", ...args], { cwd: root })
  if (out.exitCode !== 0) {
    const said = out.stderr.toString().trim()
    return said === "" ? `exited ${out.exitCode}` : said
  }
  try {
    return JSON.parse(out.stdout.toString()) as unknown
  } catch {
    return "its answer did not parse as JSON"
  }
}

function heldUnder(answer: unknown, wanted: readonly string[]): { key: string | null; drawn: Record<string, string> } {
  if (answer === null || typeof answer !== "object") return { key: null, drawn: {} }
  const held = answer as Record<string, unknown>
  for (const key of wanted) {
    const at = held[key]
    if (at !== null && typeof at === "object") return { key, drawn: at as Record<string, string> }
  }
  return { key: null, drawn: {} }
}

function asked(
  root: string,
  surface: string,
  args: readonly string[],
  wanted: readonly string[],
): Answered {
  const ran = `bun ${args.join(" ")}`
  const answer = answerOf(root, args)
  if (typeof answer === "string") return { surface, ran, wanted, key: null, drawn: {}, refused: answer }
  const { key, drawn } = heldUnder(answer, wanted)
  return { surface, ran, wanted, key, drawn, refused: null }
}

function surfacesIn(root: string): readonly Answered[] {
  const states = SEAT_TURN_STATES.flatMap((state) => ["--state", state])
  return [
    asked(root, "turn states", ["tools/agent-turn-colors.ts", ...states], SPELLINGS),
    asked(root, "work rows", ["tools/work-tree.ts", "--colours"], ["byInitiative"]),
  ]
}

function held(at: string): Record<string, unknown> {
  try {
    const parsed: unknown = JSON.parse(readFileSync(at, "utf8"))
    return parsed !== null && typeof parsed === "object" ? (parsed as Record<string, unknown>) : {}
  } catch {
    return {}
  }
}

function said(from: Record<string, unknown>, key: string): string | null {
  const at = from[key]
  return typeof at === "string" ? at : null
}

function idsIn(at: string): readonly string[] {
  const contributes = held(`${at}/extensions/ops/package.json`).contributes
  if (contributes === null || typeof contributes !== "object") return []
  const colors = (contributes as Record<string, unknown>).colors
  if (!Array.isArray(colors)) return []
  const ids: string[] = []
  for (const one of colors) {
    if (one === null || typeof one !== "object") continue
    const id = (one as Record<string, unknown>).id
    if (typeof id === "string" && ID_PREFIXES.some((prefix) => id.startsWith(prefix))) ids.push(id)
  }
  return ids.sort()
}

function asksFor(source: string, one: string): boolean {
  return [`"${one}"`, `'${one}'`, `\`${one}\``].some((quoted) => source.includes(quoted))
}

function sourceOf(at: string): string {
  const held: string[] = []
  const walk = (folder: string): void => {
    let entries: readonly Dirent[]
    try {
      entries = readdirSync(folder, { withFileTypes: true })
    } catch {
      return
    }
    for (const entry of entries) {
      const path = `${folder}/${entry.name}`
      if (entry.isDirectory()) walk(path)
      else if (entry.name.endsWith(".ts")) held.push(readFileSync(path, "utf8"))
    }
  }
  walk(`${at}/extensions/ops/src`)
  return held.join("\n")
}

function verbStands(one: string, roots: readonly string[]): boolean {
  return roots.some((root) => existsSync(`${root}/tools/${one}.ts`))
}

function shippedIn(roots: readonly string[]): Shipped {
  const at = artefact()
  const stamp = held(`${at}/.build/promoted.json`)
  const source = sourceOf(at)
  const calls = CALLED.filter((one) => asksFor(source, one))
  return {
    at,
    running: said(stamp, "sha"),
    subject: said(stamp, "subject"),
    promotedAt: said(stamp, "promotedAt"),
    calls,
    absent: calls.filter((one) => !verbStands(one, roots)),
    ids: idsIn(at),
  }
}

function sharedAmong(states: readonly StateDrawing[]): readonly string[] {
  const by = new Map<string, string[]>()
  for (const one of states) {
    if (one.color === null) continue
    const at = by.get(one.color)
    if (at === undefined) by.set(one.color, [one.state])
    else at.push(one.state)
  }
  const said: string[] = []
  for (const [color, sharing] of by) {
    if (sharing.length < 2) continue
    said.push(`${sharing.join(" and ")} both draw in ${color}, so no surface can rank by color alone`)
  }
  return said
}

function shippedReadings(shipped: Shipped, states: readonly StateDrawing[]): readonly string[] {
  const out: string[] = []
  if (shipped.running === null) {
    out.push(`nothing at ${shipped.at} says which commit the editor is running`)
    return out
  }
  if (shipped.calls.length === 0) {
    out.push("the running editor's source calls no turn-color tool at all, so no tab can take a color")
  }
  if (shipped.calls.length > 0 && shipped.absent.length === shipped.calls.length) {
    out.push(
      `the running editor calls ${shipped.calls.map((one) => `tools/${one}.ts`).join(" and ")}, and none of them is there — every tab keeps the color it has and nothing on screen says why`,
    )
  }
  if (shipped.ids.length === 0) {
    out.push("the running editor contributes no theme color id, so a panel row can resolve none")
  }
  for (const prefix of ID_PREFIXES) {
    if (prefix === `ops.${HOUSE}.`) continue
    if (shipped.ids.some((id) => id.startsWith(prefix)))
      out.push(`the running editor contributes its ids as \`${prefix}*\`, while the page type is spelled \`${HOUSE}\``)
  }
  for (const one of states) {
    if (one.color === null) continue
    if (shipped.ids.some((id) => id.endsWith(`.${one.color ?? ""}`))) continue
    if (one.hex === null) continue
    out.push(
      `${one.state} draws in ${one.color}, which names the shade ${one.hex}, and the running editor contributes no id ending \`.${one.color}\``,
    )
  }
  return out
}

function readingsOn(states: readonly StateDrawing[], surfaces: readonly Answered[]): readonly string[] {
  const said: string[] = []
  for (const one of states) {
    if (one.color === null) {
      said.push(`${one.state} states no color on ${one.page}`)
      continue
    }
    if (!one.stands) {
      said.push(`${one.state} draws in ${one.color}, and no color page carries that name`)
      continue
    }
  }
  said.push(...sharedAmong(states))
  for (const one of surfaces) {
    if (one.refused !== null) {
      said.push(`the ${one.surface} producer did not answer: ${one.refused}`)
      continue
    }
    if (one.key === null) {
      said.push(`the ${one.surface} producer answered under none of ${one.wanted.join(" or ")}`)
      continue
    }
    if (WITHDRAWN.includes(one.key)) {
      said.push(`the ${one.surface} producer answers under \`${one.key}\`, while the page type is spelled \`${HOUSE}\``)
    }
  }
  const turns = surfaces.find((one) => one.surface === "turn states")
  if (turns !== undefined && turns.refused === null) {
    for (const one of states) {
      if (turns.drawn[one.state] === undefined) said.push(`the turn states producer named no color for ${one.state}`)
      else if (turns.drawn[one.state] !== one.color) {
        said.push(`${one.state} is stated as ${one.color} and answered as ${turns.drawn[one.state]}`)
      }
    }
  }
  return said
}

function pad(text: string, to: number): string {
  return text.padEnd(to)
}

function render(reading: Reading): readonly string[] {
  const lines: string[] = ["states"]
  for (const one of reading.states) {
    lines.push(
      `  ${one.rank}  ${pad(one.state, 14)} ${pad(one.color ?? NOTHING, 12)} ${pad(one.hex ?? NOTHING, 9)} ${one.page}`,
    )
  }
  lines.push("", "palette")
  for (const one of reading.palette) {
    lines.push(`  ${pad(one.slug, 14)} ${one.hex ?? `${NOTHING} unpainted, drawn in whatever text color the reader uses`}`)
  }
  lines.push("", "surfaces")
  for (const one of reading.surfaces) {
    const under = one.refused !== null ? one.refused : `key \`${one.key ?? NOTHING}\`, ${Object.keys(one.drawn).length} named`
    lines.push(`  ${pad(one.surface, 14)} ${pad(one.ran, 52)} ${under}`)
  }
  lines.push("", "running editor")
  const shipped = reading.shipped
  lines.push(`  ${pad("commit", 14)} ${shipped.running ?? NOTHING}${shipped.subject === null ? "" : `  ${shipped.subject}`}`)
  lines.push(`  ${pad("promoted", 14)} ${shipped.promotedAt ?? NOTHING}`)
  lines.push(`  ${pad("calls", 14)} ${shipped.calls.length === 0 ? NOTHING : shipped.calls.map((one) => `tools/${one}.ts`).join(", ")}`)
  const standing = shipped.calls.filter((one) => !shipped.absent.includes(one))
  lines.push(`  ${pad("of those, here", 14)} ${standing.length === 0 ? NOTHING : standing.map((one) => `tools/${one}.ts`).join(", ")}`)
  lines.push(`  ${pad("ids", 14)} ${shipped.ids.length === 0 ? NOTHING : shipped.ids.join(" ")}`)
  lines.push("", `readings — ${reading.readings.length}`)
  for (const one of reading.readings) lines.push(`  - ${one}`)
  return lines
}

export default async function codeEditorColor(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const akasha = akashaRoot()
  const states = statesIn(akasha)
  const surfaces = surfacesIn(akasha)
  const shipped = shippedIn([akasha])
  const reading: Reading = {
    states,
    palette: paletteIn(akasha),
    surfaces,
    shipped,
    readings: [...readingsOn(states, surfaces), ...shippedReadings(shipped, states)],
  }
  const out = parsed.boolean("--json") ? JSON.stringify(reading) : render(reading).join("\n")
  process.stdout.write(`${out}\n`)
}
