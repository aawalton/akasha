import type { RefusedCode } from "./page-expression-value.ts"

export type { RefusedCode }

export type Held = string | readonly string[] | null

export type Json = null | boolean | number | string | readonly Json[] | { readonly [key: string]: Json }

export type Category = "agreed" | "refused" | "substrate"

export const CATEGORIES: readonly Category[] = ["agreed", "refused", "substrate"]

export type CodeErrorCode =
  | "comparison_type_mismatch"
  | "equality_non_scalar"
  | "arithmetic_nan"
  | "divide_by_zero"
  | "bracket_access_type_error"
  | "ref_lookup_type_error"
  | "unknown_function"
  | "function_argument_type_error"
  | "parse_error"

export type Input =
  | { readonly where: "both"; readonly json: Json; readonly held?: Held }
  | { readonly where: "database"; readonly json: Json }
  | { readonly where: "file"; readonly held: Held }

export type Given = Json | Input

const OURS_ALONE: ReadonlySet<RefusedCode> = new Set<RefusedCode>(["not_implemented", "substrate_parting"])

export type OursOutcome =
  | { readonly kind: "value"; readonly held: Held }
  | { readonly kind: "some"; readonly of: "number" | "string" }
  | { readonly kind: "refused"; readonly says: string }

export type CodeOutcome =
  | { readonly kind: "value"; readonly held: Held }
  | { readonly kind: "some"; readonly of: "number" | "string" }
  | { readonly kind: "error"; readonly code: CodeErrorCode; readonly says?: string }

export interface Case {
  readonly id: string
  readonly category: Category
  readonly covers: string
  readonly expression: string
  readonly values?: Readonly<Record<string, Given>>
  readonly ours: OursOutcome
  readonly code?: CodeOutcome
  readonly why?: string
}

export type RanOurs =
  | { readonly kind: "value"; readonly held: Held }
  | { readonly kind: "refused"; readonly code: RefusedCode; readonly says: string }
  | { readonly kind: "threw"; readonly says: string }

export type RanCode =
  | { readonly kind: "value"; readonly json: Json }
  | { readonly kind: "error"; readonly code: CodeErrorCode; readonly says: string }
  | { readonly kind: "threw"; readonly says: string }

export interface Posed {
  readonly reads: (key: string) => Held
  readonly values: Record<string, Json>
  readonly shown: string
}

export type FindingKind = "divergence" | "drift-ours" | "drift-code" | "defect"

export interface Finding {
  readonly kind: FindingKind
  readonly id: string
  readonly category: Category
  readonly covers: string
  readonly expression: string
  readonly inputs: string
  readonly said: string
  readonly ours: string
  readonly code: string
}

export interface Reading {
  readonly counted: Readonly<Record<Category, number>>
  readonly total: number
  readonly ranBoth: number
  readonly agreedOnValue: number
  readonly agreedOnRejection: number
  readonly refusedForWantOfIt: number
  readonly findings: readonly Finding[]
}

export interface Run {
  readonly ours: RanOurs
  readonly code: RanCode | null
}

export function isInput(given: Given): given is Input {
  if (given === null || typeof given !== "object" || Array.isArray(given)) return false
  const where = (given as { readonly where?: unknown }).where
  return where === "both" || where === "database" || where === "file"
}

export function inputOf(given: Given): Input {
  return isInput(given) ? given : { where: "both", json: given }
}

function heldScalar(json: Json): string {
  if (typeof json === "string") return json
  return JSON.stringify(json) ?? "null"
}

export function heldOf(json: Json): Held {
  if (json === null) return null
  if (typeof json === "string") return json
  if (typeof json === "number") return String(json)
  if (typeof json === "boolean") return json ? "true" : "false"
  if (Array.isArray(json)) return json.map(heldScalar)
  return JSON.stringify(json)
}

export function heldSame(left: Held, right: Held): boolean {
  if (left === null || right === null) return left === right
  const leftIsList = Array.isArray(left)
  const rightIsList = Array.isArray(right)
  if (leftIsList !== rightIsList) return false
  if (!leftIsList) return left === right
  const one = left as readonly string[]
  const two = right as readonly string[]
  if (one.length !== two.length) return false
  return one.every(function eachSame(item, at) {
    return item === two[at]
  })
}

export function showHeld(held: Held): string {
  if (held === null) return "null"
  if (Array.isArray(held)) return `[${(held as readonly string[]).map(showHeld).join(", ")}]`
  return JSON.stringify(held)
}

export function pose(one: Case): Posed {
  const values: Record<string, Json> = {}
  const files = new Map<string, Held>()
  const shown: string[] = []
  for (const [key, given] of Object.entries(one.values ?? {})) {
    const input = inputOf(given)
    if (input.where === "file") {
      files.set(key, input.held)
      shown.push(`${key}: file ${showHeld(input.held)}, absent from the database`)
      continue
    }
    values[key] = input.json
    if (input.where === "database") {
      shown.push(`${key}: database ${JSON.stringify(input.json)}, absent from the file`)
      continue
    }
    const held = input.held === undefined ? heldOf(input.json) : input.held
    files.set(key, held)
    shown.push(`${key}: ${JSON.stringify(input.json)} held as ${showHeld(held)}`)
  }
  return {
    values,
    reads: function readsFile(key: string): Held {
      return files.has(key) ? (files.get(key) as Held) : null
    },
    shown: shown.length === 0 ? "(no inputs)" : shown.join("; "),
  }
}

export function showOurs(ran: RanOurs): string {
  if (ran.kind === "value") return `value ${showHeld(ran.held)}`
  if (ran.kind === "refused") return `refused (${ran.code}): ${ran.says}`
  return `threw (not a refusal): ${ran.says}`
}

export function showCode(ran: RanCode): string {
  if (ran.kind === "value") return `value ${JSON.stringify(ran.json)} held as ${showHeld(heldOf(ran.json))}`
  if (ran.kind === "error") return `${ran.code}: ${ran.says}`
  return `threw (unrecognised): ${ran.says}`
}

export function showOursWanted(want: OursOutcome): string {
  if (want.kind === "some") return `any ${want.of}`
  return want.kind === "value" ? `value ${showHeld(want.held)}` : `refused, saying ${JSON.stringify(want.says)}`
}

export function showCodeWanted(want: CodeOutcome): string {
  if (want.kind === "value") return `value held as ${showHeld(want.held)}`
  if (want.kind === "some") return `any ${want.of}`
  return want.says === undefined ? want.code : `${want.code}, saying ${JSON.stringify(want.says)}`
}

function defect(one: Case, said: string): Finding {
  return {
    kind: "defect",
    id: one.id,
    category: one.category,
    covers: one.covers,
    expression: one.expression,
    inputs: "(not posed)",
    said,
    ours: showOursWanted(one.ours),
    code: one.code === undefined ? "(none recorded)" : showCodeWanted(one.code),
  }
}

export function defectsIn(cases: readonly Case[]): readonly Finding[] {
  const found: Finding[] = []
  const seen = new Set<string>()
  for (const one of cases) {
    if (seen.has(one.id)) found.push(defect(one, `the id \`${one.id}\` is used by more than one case`))
    seen.add(one.id)
    if (one.covers.trim() === "") found.push(defect(one, "the case says nothing about what it covers"))
    if (one.category === "agreed") {
      if (one.code === undefined) {
        found.push(defect(one, "an agreed case must record what the reference does, and this one records nothing"))
      }
      for (const [key, given] of Object.entries(one.values ?? {})) {
        const input = inputOf(given)
        if (input.where !== "both") {
          found.push(
            defect(one, `an agreed case must be posable to both sides, and \`${key}\` stands on the ${input.where} side only`)
          )
        }
      }
      if (one.code !== undefined && one.code.kind === "some" && one.ours.kind !== "some") {
        found.push(defect(one, "an agreed case cannot rest on a reference answer that is only bounded by its type"))
      }
      if (one.ours.kind === "some" && one.code?.kind !== "some") {
        found.push(defect(one, "an agreed case bounding ours by its type must bound the reference the same way"))
      }
    }
    if (one.category === "refused") {
      if (one.ours.kind !== "refused") {
        found.push(defect(one, "a refused case must record our evaluator refusing, and this one records a value"))
      }
      if (one.code === undefined) {
        found.push(defect(one, "a refused case exists to record what the reference does, and this one records nothing"))
      }
      if (one.why === undefined) found.push(defect(one, "a refused case must say why the gap stands"))
    }
    if (one.category === "substrate" && one.why === undefined) {
      found.push(defect(one, "a substrate case must say why the two substrates make it differ"))
    }
  }
  return found
}

function oursMatches(want: OursOutcome, ran: RanOurs): boolean {
  if (want.kind === "value") return ran.kind === "value" && heldSame(want.held, ran.held)
  if (want.kind === "some") {
    if (ran.kind !== "value") return false
    const reads = typeof ran.held === "string" && ran.held !== "" && Number.isFinite(Number(ran.held))
    return reads === (want.of === "number")
  }
  return ran.kind === "refused" && ran.says.includes(want.says)
}

function codeMatches(want: CodeOutcome, ran: RanCode): boolean {
  if (want.kind === "value") return ran.kind === "value" && heldSame(want.held, heldOf(ran.json))
  if (want.kind === "some") {
    return ran.kind === "value" && typeof ran.json === want.of && (want.of !== "number" || Number.isFinite(ran.json))
  }
  if (ran.kind !== "error" || ran.code !== want.code) return false
  return want.says === undefined || ran.says.includes(want.says)
}

export function judge(one: Case, run: Run): readonly Finding[] {
  const posed = pose(one)
  const found: Finding[] = []
  const ours = showOurs(run.ours)
  const code = run.code === null ? "(not run)" : showCode(run.code)
  const row = {
    id: one.id,
    category: one.category,
    covers: one.covers,
    expression: one.expression,
    inputs: posed.shown,
    ours,
    code,
  }
  if (!oursMatches(one.ours, run.ours)) {
    found.push({ ...row, kind: "drift-ours", said: `the table records ours as ${showOursWanted(one.ours)}` })
  }
  if (one.code !== undefined && run.code !== null && !codeMatches(one.code, run.code)) {
    found.push({ ...row, kind: "drift-code", said: `the table records the reference as ${showCodeWanted(one.code)}` })
  }
  if (one.category !== "agreed" || run.code === null) return found
  if (one.ours.kind === "some") return found
  if (run.ours.kind === "value" && run.code.kind === "value") {
    if (!heldSame(run.ours.held, heldOf(run.code.json))) {
      found.push({ ...row, kind: "divergence", said: "both answered, and the answers are not the same" })
    }
    return found
  }
  if (run.ours.kind === "refused" && run.code.kind === "error") {
    if (run.ours.code === run.code.code) return found
    found.push({
      ...row,
      kind: "divergence",
      said: OURS_ALONE.has(run.ours.code)
        ? `both rejected, and ours refused for want of a construct it does not implement where the reference named \`${run.code.code}\``
        : `both rejected, and the reasons are not the same: ours named \`${run.ours.code}\` and the reference named \`${run.code.code}\``,
    })
    return found
  }
  found.push({
    ...row,
    kind: "divergence",
    said:
      run.ours.kind === "value"
        ? "ours answered where the reference rejected"
        : run.code.kind === "value"
          ? "ours rejected where the reference answered"
          : "one of the two failed in a way neither implementation defines",
  })
  return found
}

export function read(cases: readonly Case[], runner: (one: Case) => Run): Reading {
  const counted: Record<Category, number> = { agreed: 0, refused: 0, substrate: 0 }
  const findings: Finding[] = [...defectsIn(cases)]
  let ranBoth = 0
  let agreedOnValue = 0
  let agreedOnRejection = 0
  let refusedForWantOfIt = 0
  for (const one of cases) {
    counted[one.category] += 1
    const run = runner(one)
    if (run.code !== null) ranBoth += 1
    const found = judge(one, run)
    findings.push(...found)
    if (
      run.code !== null &&
      run.ours.kind === "refused" &&
      run.code.kind === "error" &&
      OURS_ALONE.has(run.ours.code)
    ) {
      refusedForWantOfIt += 1
    }
    if (one.category !== "agreed" || run.code === null) continue
    if (found.some(function isDivergence(item) { return item.kind === "divergence" })) continue
    if (run.ours.kind === "value") agreedOnValue += 1
    else if (run.ours.kind === "refused") agreedOnRejection += 1
  }
  return { counted, total: cases.length, ranBoth, agreedOnValue, agreedOnRejection, refusedForWantOfIt, findings }
}

function section(heading: string, lines: readonly string[], empty: string): string {
  return [heading, ...(lines.length === 0 ? [`  ${empty}`] : lines)].join("\n")
}

function finding(one: Finding): readonly string[] {
  return [
    `  ${one.id}  [${one.category}]  ${one.said}`,
    `    covers      ${one.covers}`,
    `    expression  ${JSON.stringify(one.expression)}`,
    `    inputs      ${one.inputs}`,
    `    ours        ${one.ours}`,
    `    reference   ${one.code}`,
  ]
}

function ofKind(findings: readonly Finding[], kind: FindingKind): readonly string[] {
  return findings.filter(function isKind(one) { return one.kind === kind }).flatMap(finding)
}

export function render(reading: Reading): string {
  const counts = CATEGORIES.map(function eachCount(category) {
    return `  ${category.padEnd(10)} ${String(reading.counted[category]).padStart(4)} case(s)`
  })
  return [
    "FORMULA CONFORMANCE",
    ...counts,
    `  ${"total".padEnd(10)} ${String(reading.total).padStart(4)} case(s), ${reading.ranBoth} of them posed to both implementations`,
    "",
    "AGREEMENT",
    `  ${String(reading.agreedOnValue).padStart(4)} agreed on a value`,
    `  ${String(reading.agreedOnRejection).padStart(4)} agreed on a rejection — both named the same fault`,
    `  ${String(reading.refusedForWantOfIt).padStart(4)} ours refused for want of a construct it does not implement, where the reference named a fault of its own`,
    `  ${String(reading.findings.filter(function isDivergence(one) { return one.kind === "divergence" }).length).padStart(4)} diverged`,
    "",
    section("DIVERGENCE", ofKind(reading.findings, "divergence"), "(no divergence)"),
    "",
    section("DRIFT — ours moved out from under the table", ofKind(reading.findings, "drift-ours"), "(none)"),
    "",
    section("DRIFT — the reference moved out from under the table", ofKind(reading.findings, "drift-code"), "(none)"),
    "",
    section("TABLE", ofKind(reading.findings, "defect"), "(no defect)"),
    "",
  ].join("\n")
}
