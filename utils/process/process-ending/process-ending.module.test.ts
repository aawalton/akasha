import { expect, test } from "bun:test"
import { type Ending, ending, type Sign } from "./process-ending.module.code.ts"

type Bench = {
  readonly how: Ending
  readonly sent: string[]
}

function bench(live: readonly number[], endsOn: Sign | null): Bench {
  const alive = new Set(live)
  const sent: string[] = []
  return {
    sent,
    how: {
      alive: (pid) => alive.has(pid),
      signal: (pid, sign) => {
        sent.push(`${String(pid)} ${sign}`)
        if (sign === endsOn) alive.delete(pid)
        return undefined
      },
      waited: (pid) => Promise.resolve(!alive.has(pid)),
    },
  }
}

test("a process that ends on the ask is never forced", async () => {
  const { how, sent } = bench([11], "SIGTERM")
  expect(await ending([11], how)).toEqual({ asked: true, forced: false, allGone: true })
  expect(sent).toEqual(["11 SIGTERM"])
})

test("a process that outlives the ask is made to end", async () => {
  const { how, sent } = bench([11], "SIGKILL")
  expect(await ending([11], how)).toEqual({ asked: true, forced: true, allGone: true })
  expect(sent).toEqual(["11 SIGTERM", "11 SIGKILL"])
})

test("a process that outlives the force leaves the whole not all gone", async () => {
  const { how, sent } = bench([11], null)
  expect(await ending([11], how)).toEqual({ asked: true, forced: true, allGone: false })
  expect(sent).toEqual(["11 SIGTERM", "11 SIGKILL"])
})

test("a pid already gone is neither asked nor waited on", async () => {
  const { how, sent } = bench([], "SIGTERM")
  expect(await ending([404], how)).toEqual({ asked: false, forced: false, allGone: true })
  expect(sent).toEqual([])
})

test("every process is asked before any is forced", async () => {
  const { how, sent } = bench([11, 12], "SIGKILL")
  expect(await ending([11, 12], how)).toEqual({ asked: true, forced: true, allGone: true })
  expect(sent).toEqual(["11 SIGTERM", "12 SIGTERM", "11 SIGKILL", "12 SIGKILL"])
})

test("one process outliving the force does not hide another that ended", async () => {
  const alive = new Set([11, 12])
  const how: Ending = {
    alive: (pid) => alive.has(pid),
    signal: (pid, sign) => {
      if (sign === "SIGKILL" && pid === 11) alive.delete(pid)
      return undefined
    },
    waited: (pid) => Promise.resolve(!alive.has(pid)),
  }
  expect(await ending([11, 12], how)).toEqual({ asked: true, forced: true, allGone: false })
})
