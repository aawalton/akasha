
export const summary = "End the sim session: delete the WebDriver session + remove local state; --stop-appium also stops the on-demand server"

import type { CommandHelp } from "../../../ops/surface.ts"
import { parseArgs } from "../../../lib/parse-args.ts"
import { appiumClient, simMacbook, simSession } from "../../../lib/sim-driving.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--stop-appium",
      description:
        "Also stop the macbook Appium server (leave it running by default in case a raw-runbook session is using it).",
    },
  ],
  exits: [{ code: 3, meaning: "operational error: ssh to stop Appium failed" }],
  examples: ["ops mobile sim teardown", "ops mobile sim teardown --stop-appium"],
}

export default async function mobileSimTeardown(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const alsoStopAppium = parsed.boolean("--stop-appium")

  const session = await simSession()
  const appium = await appiumClient()

  const state = session.loadSessionState()
  if (state !== null) {
    try {
      await appium.deleteSession(state.appiumBase, state.sessionId)
    } catch {
    }
  }
  session.clearSessionState()

  if (alsoStopAppium) {
    process.stdout.write("Stopping the macbook Appium server…\n")
    const macbook = await simMacbook()
    await macbook.stopAppium()
  }

  process.stdout.write("✓ sim session torn down\n")
}
