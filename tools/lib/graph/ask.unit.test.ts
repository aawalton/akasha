import { describe, expect, test } from "bun:test"
import { ASK_ATTEMPTS, askGraph } from "./ask.ts"
import type { Fetcher } from "./origin.ts"

const COMMIT = "c".repeat(40)

const answered = (instructions: string, path: string): Response => {
  const identity = { commit: COMMIT, repos: { code: COMMIT, instructions } }
  const held = path === "/nodes" ? { nodes: [] } : { edges: [] }
  return new Response(JSON.stringify({ identity, n: 0, ...held }), {
    status: 200,
    headers: { "content-type": "application/json" },
  })
}

const askedOver = (
  perAsk: readonly string[]
): { readonly fetcher: Fetcher; readonly count: () => number } => {
  let at = 0
  const fetcher: Fetcher = (url) => {
    const standing = perAsk[at] ?? "unset"
    at += 1
    return Promise.resolve(answered(standing, new URL(url).pathname))
  }
  return { fetcher, count: () => at }
}

const tornForever = (): readonly string[] =>
  Array.from({ length: ASK_ATTEMPTS * 2 }, (_, i) => `sha${String(i)}`)

describe("askGraph refuses a graph whose nodes and edges never stood together", () => {
  test("a pair standing at one identity is the graph, asked once", () => {
    const { fetcher, count } = askedOver(["same", "same"])
    return askGraph(COMMIT, fetcher).then((asked) => {
      expect(asked.ok).toBe(true)
      expect(count()).toBe(2)
    })
  })

  test("a tear is asked again rather than refused, and the pair that agrees stands", () => {
    const { fetcher, count } = askedOver(["before", "after", "agreed", "agreed"])
    return askGraph(COMMIT, fetcher).then((asked) => {
      expect(asked.ok).toBe(true)
      expect(count()).toBe(4)
    })
  })

  test("a tree rebuilding under every ask is refused rather than answered torn", () => {
    const { fetcher, count } = askedOver(tornForever())
    return askGraph(COMMIT, fetcher).then((asked) => {
      expect(asked.ok).toBe(false)
      expect(count()).toBe(ASK_ATTEMPTS * 2)
      if (!asked.ok) expect(asked.why).toContain("never stood together")
    })
  })
})
