
import { ACCESS_KEY, digestOf, REFRESH_KEY } from "./oauth-page-push.ts"

export type PageVerdict = "current" | "behind" | "no-sops" | "unreadable" | "no-row"

export interface PageReading {
  readonly account: string
  readonly sidecarStands: boolean
  readonly held: ReadonlyMap<string, string> | null
  readonly why: string | null
}

export interface RowReading {
  readonly account: string
  readonly accessToken: string
  readonly refreshToken: string
}

export interface DriftEntry {
  readonly account: string
  readonly verdict: PageVerdict
  readonly detail: string
}

export interface PageDrift {
  readonly pages: number
  readonly rows: number
  readonly compared: number
  readonly current: number
  readonly behind: readonly string[]
  readonly unlooked: readonly string[]
  readonly rowsWithoutPage: readonly string[]
  readonly entries: readonly DriftEntry[]
}

function saidOf(key: string, page: string | undefined, row: string): string {
  return `${key} page ${page === undefined ? "absent" : digestOf(page)} row ${digestOf(row)}`
}

function judge(page: PageReading, row: RowReading | undefined): DriftEntry {
  const { account } = page
  if (row === undefined) {
    return {
      account,
      verdict: "no-row",
      detail: "a page stands but no credential row does, so nothing says what it should hold",
    }
  }
  if (!page.sidecarStands) {
    return { account, verdict: "no-sops", detail: "no sops file stands beside the page" }
  }
  if (page.held === null) {
    return { account, verdict: "unreadable", detail: page.why ?? "the sops file could not be read" }
  }
  const wants: readonly (readonly [string, string])[] = [
    [ACCESS_KEY, row.accessToken],
    [REFRESH_KEY, row.refreshToken],
  ]
  const apart = wants.filter(([key, held]) => page.held?.get(key) !== held)
  if (apart.length === 0) {
    return {
      account,
      verdict: "current",
      detail: wants.map(([key, held]) => `${key} ${digestOf(held)}`).join(", "),
    }
  }
  return {
    account,
    verdict: "behind",
    detail: apart.map(([key, held]) => saidOf(key, page.held?.get(key), held)).join(", "),
  }
}

export function driftBetween(
  pages: readonly PageReading[],
  rows: readonly RowReading[]
): PageDrift {
  const byAccount = new Map(rows.map((one) => [one.account, one]))
  const entries = pages.map((page) => judge(page, byAccount.get(page.account)))
  const named = new Set(pages.map((one) => one.account))
  const of = (verdict: PageVerdict): readonly string[] =>
    entries.filter((one) => one.verdict === verdict).map((one) => one.account)
  const unlooked = [...of("no-sops"), ...of("unreadable"), ...of("no-row")].sort()
  return {
    pages: pages.length,
    rows: rows.length,
    compared: entries.filter((one) => one.verdict === "current" || one.verdict === "behind").length,
    current: of("current").length,
    behind: of("behind"),
    unlooked,
    rowsWithoutPage: rows.map((one) => one.account).filter((one) => !named.has(one)).sort(),
    entries,
  }
}

export function driftLines(drift: PageDrift): readonly string[] {
  const said = [
    `population: ${drift.pages} page(s) against ${drift.rows} credential row(s); ${drift.compared} compared`,
    `verdict:    ${drift.current} current, ${drift.behind.length} behind, ${drift.unlooked.length} could not be looked at`,
  ]
  for (const entry of drift.entries) {
    said.push(`  ${entry.account.padEnd(12)} ${entry.verdict.padEnd(10)} ${entry.detail}`)
  }
  if (drift.rowsWithoutPage.length > 0) {
    said.push(`rows with no page: ${drift.rowsWithoutPage.join(", ")}`)
  }
  return said
}
