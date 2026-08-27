import { operationalError } from "./exit.ts"
import { resolveRoots } from "../../repo/roots/roots"
import { clusterReachOf } from "./service-cluster-reach.ts"

const SLUG = "page-query-service"

const WRITE_ATTEMPTS = 4
const WAIT_CEILING_MS = 10_000
const FIRST_BACKOFF_MS = 100

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

let origin: string | null = null

export function pageQueryOrigin(): string {
  const stated = process.env.PAGE_QUERY_ORIGIN
  if (stated !== undefined && stated !== "") return stated
  if (origin === null) {
    origin = `http://127.0.0.1:${clusterReachOf(resolveRoots().instructions, SLUG).port}`
  }
  return origin
}

export function forgetPageQueryOrigin(): void {
  origin = null
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
  return `the page query service answered ${status}`
}

async function bodyOf(response: Response): Promise<unknown> {
  try {
    return await response.json()
  } catch {
    return null
  }
}

async function reached(path: string, init?: RequestInit): Promise<Response> {
  const began = Date.now()
  let attempt = 0
  let last = ""
  while (attempt < WRITE_ATTEMPTS) {
    const left = WAIT_CEILING_MS - (Date.now() - began)
    if (left <= 0) break
    try {
      return await fetch(`${pageQueryOrigin()}${path}`, {
        ...init,
        signal: AbortSignal.timeout(left),
      })
    } catch (thrown) {
      last = thrown instanceof Error ? thrown.message : String(thrown)
    }
    attempt += 1
    const backoff = FIRST_BACKOFF_MS * 2 ** (attempt - 1)
    const room = WAIT_CEILING_MS - (Date.now() - began)
    if (room <= 0) break
    await Bun.sleep(Math.min(backoff, room))
  }
  throw operationalError(
    `the page query service at ${pageQueryOrigin()} did not answer ${path} within ${WAIT_CEILING_MS}ms: ${last}`
  )
}

export async function askComposed(query: Readonly<Record<string, unknown>>): Promise<Answered> {
  const response = await reached("/q", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(query),
  })
  const body = await bodyOf(response)
  if (!response.ok) return { ok: false, why: whyIn(body, response.status) }
  const n = typeof (body as { n?: unknown }).n === "number" ? (body as { n: number }).n : 0
  return { ok: true, rows: rowsIn(body), n, unfound: unfoundIn(body) }
}

export async function askTaking(
  named: string,
  given: Readonly<Record<string, string>>
): Promise<Answered> {
  const params = new URLSearchParams(given).toString()
  const response = await reached(`/q/${named}${params === "" ? "" : `?${params}`}`)
  const body = await bodyOf(response)
  if (!response.ok) return { ok: false, why: whyIn(body, response.status) }
  const n = typeof (body as { n?: unknown }).n === "number" ? (body as { n: number }).n : 0
  return { ok: true, rows: rowsIn(body), n, unfound: unfoundIn(body) }
}

async function landed(path: string, sent: Readonly<Record<string, unknown>>): Promise<Landed> {
  const response = await reached(path, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(sent),
  })
  const body = await bodyOf(response)
  if (!response.ok) return { ok: false, why: whyIn(body, response.status) }
  const at = (body as { at?: unknown }).at
  return { ok: true, at: typeof at === "string" ? at : "" }
}

export function pageLanding(
  act: PageAct,
  pageType: string,
  name: string,
  values: Readonly<Record<string, unknown>>,
  writer: string
): Promise<Landed> {
  return landed(`/${act}/${pageType}/${name}`, { writer, values })
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
  return landed(`/${act}/${pageType}/${parentName}`, { writer, values })
}

export function removeRow(
  pageType: string,
  parentName: string,
  named: string,
  writer: string
): Promise<Landed> {
  return landed(`/remove-row/${pageType}/${parentName}`, { writer, named })
}

export function rowsLanding(
  act: RowAct,
  pageType: string,
  parentName: string,
  rows: readonly Readonly<Record<string, unknown>>[],
  writer: string
): Promise<Landed> {
  return landed(`/${act}/${pageType}/${parentName}`, { writer, rows })
}
