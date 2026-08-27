
import { expect, test } from "bun:test"
import { recordedRows } from "./oauth-usage-recorded.ts"

test("the sweep reaches what the usage read refuses, not only what it answers", async () => {
  const recorded = (await recordedRows()) as { k: string; v: any }[]
  const family = (prefix: string) => recorded.filter((row) => row.k.startsWith(prefix))

  const parsed = family("parse|")
  expect(parsed.length).toBe(26)
  const refusedBodies = parsed.filter((row) => row.v.threw !== null)
  expect(refusedBodies.length).toBe(20)
  expect(refusedBodies.every((row) => row.v.threw.name === "Error")).toBe(true)
  expect(
    refusedBodies.every((row) => row.v.threw.message === "Usage response malformed: <validator text, non-empty>")
  ).toBe(true)
  expect(recorded.find((row) => row.k === "parse|valid|zero")?.v.threw).toBeNull()
  expect(recorded.find((row) => row.k === "parse|refused|five-hour-util-absent")?.v.threw).not.toBeNull()
  expect(recorded.find((row) => row.k === "parse|refused|seven-day-util-absent")?.v.threw).not.toBeNull()

  const status = (code: number) => recorded.find((row) => row.k === `fetch|status|${code}`)?.v.threw
  expect(status(200)).toBeNull()
  expect(status(201)).toBeNull()
  expect(status(299)).toBeNull()
  expect(status(300)).toMatchObject({ name: "UsageFetchError", status: 300 })
  expect(status(429)).toMatchObject({ name: "UsageFetchError", status: 429, message: "Usage fetch failed: 429" })
  expect(status(500)).toMatchObject({ name: "UsageFetchError", status: 500 })
  expect(recorded.find((row) => row.k === "fetch|nonjson|html")?.v.threw.name).toBe("SyntaxError")
  const requested = family("fetch|").flatMap((row) => row.v.requests)
  expect(requested.length).toBe(25)
  expect(requested.every((r: any) => r.url === "https://api.anthropic.com/api/oauth/usage")).toBe(true)
  expect(requested.every((r: any) => r.hasSignal)).toBe(true)
  expect(recorded.find((row) => row.k === "fetch|token|blank")?.v.requests[0].authorization).toBe("Bearer")

  const bestEffort = [...family("pacing|"), ...family("account|"), ...family("repoll|")]
  expect(bestEffort.length).toBe(123)
  expect(bestEffort.every((row) => row.v.threw === null)).toBe(true)
  expect(bestEffort.every((row) => row.v.resolvedUndefined)).toBe(true)

  const keySets = (prefix: string) =>
    [...new Set(family(prefix).flatMap((row) => row.v.writes.map((w: any) => w.keys.join(","))))]
  expect(keySets("account|")).toEqual(["retry-after"])
  expect(keySets("pacing|").map((set) => set.split(",")).every((keys: string[]) =>
    keys.every((key) => key === key.toLowerCase() && !key.includes(" "))
  )).toBe(true)
  expect(keySets("pacing|").some((set) => set.includes("five-hour-percent-used"))).toBe(true)

  for (const label of ["account|now|8640000000000000"]) {
    const row = recorded.find((r) => r.k === label)
    expect(row?.v.writes.length).toBe(0)
    expect(row?.v.logged.length).toBe(1)
    expect(row?.v.logged[0].err.name).toBe("RangeError")
  }

  const refusalLine = (label: string) => recorded.find((row) => row.k === label)?.v.logged[0]?.text
  expect(refusalLine("account|prefix|<undef>|throws")).toBe(
    "[oauth] acct kept its at-limit mark off its page:"
  )
  expect(refusalLine("account|prefix||throws")).toBe(
    " acct kept its at-limit mark off its page:"
  )
  expect(refusalLine("account|prefix|[proxy]|throws")).toBe(
    "[proxy] acct kept its at-limit mark off its page:"
  )

  const breaker = (step: string) => recorded.find((row) => row.k === `repoll|breaker|usage-429|${step}`)?.v
  expect(breaker("429")?.requests.length).toBe(1)
  expect(breaker("inside-breaker")?.requests.length).toBe(0)
  expect(breaker("inside-breaker")?.logged[0].text).toMatch(/breaker open for another 240s/)
  expect(breaker("one-ms-inside-expiry")?.requests.length).toBe(0)
  expect(breaker("at-expiry")?.requests.length).toBe(1)
  expect(breaker("at-expiry")?.writes.length).toBe(1)
  expect(breaker("past-expiry")?.logged[0].text).toMatch(/inside the minimum interval/)
  expect(recorded.find((row) => row.k === "repoll|breaker|not-500|after-interval")?.v.requests.length).toBe(1)
  expect(family("repoll|gate|burst|").filter((row) => row.v.requests.length > 0).length).toBe(1)
  expect(family("repoll|gate|per-account|").filter((row) => row.v.requests.length > 0).length).toBe(2)
  for (const label of ["repoll|guard|null-cred|null", "repoll|guard|throwing-getter|throws"]) {
    expect(recorded.find((row) => row.k === label)?.v.requests.length).toBe(0)
  }

  const readsIn = (prefix: string) => [...new Set(family(prefix).map((row) => row.v.clockReads))].sort()
  expect(readsIn("pacing|")).toEqual([1])
  expect(readsIn("account|")).toEqual([1])
  expect([...new Set(family("repoll|").map((row) => row.v.clockReads))].sort()).toEqual([1, 2])
  expect(recorded.find((row) => row.k === "repoll|breaker|usage-429|429")?.v.clockReads).toBe(2)
  expect(recorded.find((row) => row.k === "repoll|happy|fetch-then-push|ok")?.v.clockReads).toBe(2)
  expect(recorded.find((row) => row.k === "repoll|guard|failing-fetch|down")?.v.clockReads).toBe(1)
  expect(recorded.find((row) => row.k === "repoll|guard|null-cred|null")?.v.clockReads).toBe(1)
})
