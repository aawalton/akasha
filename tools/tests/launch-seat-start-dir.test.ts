import { expect, test } from "bun:test"
import { buildNewSessionArgs, seatStartDir, type LaunchSeatOpts } from "../lib/launch-seat-tmux.ts"
import { SEAT_MODE_INTERACTIVE } from "../lib/seat-modes.ts"

const opts: LaunchSeatOpts = {
  name: "aria",
  agentId: "aid-1",
  account: "aawalton",
  prompt: "",
  mode: SEAT_MODE_INTERACTIVE,
}

function underAkashaRoot<T>(root: string, run: () => T): T {
  const before = process.env.AKASHA_ROOT
  process.env.AKASHA_ROOT = root
  try {
    return run()
  } finally {
    if (before === undefined) delete process.env.AKASHA_ROOT
    else process.env.AKASHA_ROOT = before
  }
}

test("the seat start directory is the parent of the akasha repo", () => {
  expect(underAkashaRoot("/somewhere/repos/akasha", seatStartDir)).toBe("/somewhere/repos")
})

test("a session opens in the seat start directory rather than where the launcher stood", () => {
  const args = underAkashaRoot("/somewhere/repos/akasha", () =>
    buildNewSessionArgs(opts, ["supervisor"])
  )
  const at = args.indexOf("-c")
  expect(at).toBeGreaterThan(-1)
  expect(args[at + 1]).toBe("/somewhere/repos")
})

test("the start directory is stated before the command rather than after it", () => {
  const args = buildNewSessionArgs(opts, ["supervisor"])
  expect(args.indexOf("-c")).toBeLessThan(args.indexOf("--"))
})
