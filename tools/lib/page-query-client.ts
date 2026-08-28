import { operationalError } from "./exit.ts"
import type { WriteAct } from "./page-landing-judge.ts"
import { answered, askedFrom } from "./page-query-answer.ts"
import { written } from "./page-query-landing.ts"
import type { Said } from "./page-query-request.ts"
import type { Roots } from "../../page/page.ts"
import { resolveRoots } from "../../repo/roots/roots"

const SAYS = "[page-query]"

export interface AnsweredRow {
  readonly at: string
  readonly values: Readonly<Record<string, unknown>>
}

export type Answered =
  | {
      readonly ok: true
      readonly rows: readonly AnsweredRow[]
      readonly n: number
      readonly unfound: readonly string[]
    }
  | { readonly ok: false; readonly why: string }

export type Landed =
  | { readonly ok: true; readonly at: string }
  | { readonly ok: false; readonly why: string }

export type RowAct = "write-row" | "patch-row"

export type PageAct = "write" | "patch" | "patch-state" | "remove"

let held: Roots | null = null

function roots(): Roots {
  held ??= resolveRoots()
  return held
}

export function pageQueryOrigin(): string {
  const stated = process.env.PAGE_QUERY_ORIGIN
  if (stated !== undefined && stated !== "") return stated
  throw operationalError(
    "no page query service answers on this workstation: a command here reaches pages through this module in process, and only an off-workstation caller states PAGE_QUERY_ORIGIN"
  )
}

function rowsIn(body: unknown): readonly AnsweredRow[] {
  if (typeof body !== "object" || body === null) return []
  const held = (body as { rows?: unknown }).rows
  if (!Array.isArray(held)) return []
  const rows: AnsweredRow[] = []
  for (const one of held) {
    if (typeof one !== "object" || one === null) continue
    const at = (one as { at?: unknown }).at
    const values = (one as { values?: unknown }).values
    if (typeof values !== "object" || values === null) continue
    rows.push({
      at: typeof at === "string" ? at : "",
      values: values as Record<string, unknown>,
    })
  }
  return rows
}

function unfoundIn(body: unknown): readonly string[] {
  if (typeof body !== "object" || body === null) return []
  const held = (body as { unfound?: unknown }).unfound
  if (!Array.isArray(held)) return []
  return held.filter((one): one is string => typeof one === "string")
}

function whyIn(body: unknown, status: number): string {
  if (typeof body === "object" && body !== null) {
    const error = (body as { error?: unknown }).error
    if (typeof error === "string") return error
    const why = (body as { why?: unknown }).why
    if (typeof why === "string") return why
  }
  return `the page query answered ${status}`
}

function asked(said: Said): Answered {
  if (said.status !== 200) return { ok: false, why: whyIn(said.body, said.status) }
  const body = said.body
  const n = typeof (body as { n?: unknown }).n === "number" ? (body as { n: number }).n : 0
  return { ok: true, rows: rowsIn(body), n, unfound: unfoundIn(body) }
}

export async function askComposed(query: Readonly<Record<string, unknown>>): Promise<Answered> {
  return asked(askedFrom(roots(), JSON.stringify(query)))
}

export async function askTaking(
  named: string,
  given: Readonly<Record<string, string>>
): Promise<Answered> {
  return asked(answered(roots(), named, new URLSearchParams(given)))
}

async function landed(
  act: WriteAct,
  pageType: string,
  name: string,
  sent: Readonly<Record<string, unknown>>
): Promise<Landed> {
  const carried = new Request("http://pages.invalid/", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(sent),
  })
  const said = await written(roots(), act, pageType, name, carried, SAYS)
  if (said.status !== 200) return { ok: false, why: whyIn(said.body, said.status) }
  const at = (said.body as { at?: unknown }).at
  return { ok: true, at: typeof at === "string" ? at : "" }
}

export function pageLanding(
  act: PageAct,
  pageType: string,
  name: string,
  values: Readonly<Record<string, unknown>>,
  writer: string
): Promise<Landed> {
  return landed(act, pageType, name, { writer, values })
}

export function patchPage(
  pageType: string,
  name: string,
  values: Readonly<Record<string, unknown>>,
  writer: string
): Promise<Landed> {
  return pageLanding("patch", pageType, name, values, writer)
}

export function rowLanding(
  act: RowAct,
  pageType: string,
  parentName: string,
  values: Readonly<Record<string, unknown>>,
  writer: string
): Promise<Landed> {
  return landed(act, pageType, parentName, { writer, values })
}

export function removeRow(
  pageType: string,
  parentName: string,
  named: string,
  writer: string
): Promise<Landed> {
  return landed("remove-row", pageType, parentName, { writer, named })
}

export function rowsLanding(
  act: RowAct,
  pageType: string,
  parentName: string,
  rows: readonly Readonly<Record<string, unknown>>[],
  writer: string
): Promise<Landed> {
  return landed(act, pageType, parentName, { writer, rows })
}
