import { expect, test } from "bun:test"
import { buildSupervisorCmd, type LaunchSeatOpts } from "../lib/launch-seat-tmux.ts"
import { SEAT_MODE_HEADLESS, SEAT_MODE_INTERACTIVE } from "../lib/seat-modes.ts"

const opts = (mode: string): LaunchSeatOpts => ({
  name: "aria",
  agentId: "aid-1",
  account: "aawalton",
  prompt: "",
  mode,
})

test("a headless launch carries --headless", () => {
  expect(buildSupervisorCmd("/root", opts(SEAT_MODE_HEADLESS))).toContain("--headless")
})

test("an interactive launch carries no --headless", () => {
  expect(buildSupervisorCmd("/root", opts(SEAT_MODE_INTERACTIVE))).not.toContain("--headless")
})
