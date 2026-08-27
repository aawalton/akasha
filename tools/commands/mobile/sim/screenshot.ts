
export const summary = "Capture the sim screen as a PNG and print the local path (an agent can Read it). Reuses the active session"

import { writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import type { CommandHelp } from "../../../ops/surface.ts"
import { parseArgs } from "../../../lib/parse-args.ts"
import { appiumClient, simDriver } from "../../../lib/sim-driving.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--out",
      argLabel: "<path>",
      valueShape: "token",
      path: true,
      description: "Output PNG path (default: a timestamped file in the OS temp dir).",
    },
  ],
  exits: [{ code: 3, meaning: "operational error: no live session or screenshot failed" }],
  examples: ["ops mobile sim screenshot", "ops mobile sim screenshot --out ~/Pictures/sim.png"],
}

export default async function mobileSimScreenshot(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const out = parsed.string("--out") ?? join(tmpdir(), `mobile-sim-${Date.now()}.png`)

  const driver = await simDriver()
  const appium = await appiumClient()
  const state = await driver.attachWebview(driver.requireDrivingState())
  const png = await appium.screenshot(state.appiumBase, state.sessionId)
  writeFileSync(out, png)

  process.stdout.write(`${out}\n`)
}
