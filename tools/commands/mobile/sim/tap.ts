
export const summary = "Native-tap the sim webview by CSS selector (raises the keyboard) or by viewport coordinates. Reuses the active session"

import type { CommandHelp } from "../../../ops/surface.ts"
import { inputError } from "../../../lib/exit.ts"
import { parseArgs } from "../../../lib/parse-args.ts"
import { appiumClient, simDriver } from "../../../lib/sim-driving.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--selector",
      argLabel: "<css>",
      valueShape: "token",
      description: "CSS selector of the element to tap.",
    },
    {
      name: "--x",
      argLabel: "<px>",
      valueShape: "token",
      description: "Viewport x (with --y) for a coordinate tap.",
    },
    {
      name: "--y",
      argLabel: "<px>",
      valueShape: "token",
      description: "Viewport y (with --x) for a coordinate tap.",
    },
  ],
  mutuallyExclusive: [["--selector", "--x"]],
  exits: [
    { code: 1, meaning: "input error: neither a selector nor an x/y pair given" },
    { code: 3, meaning: "operational error: no live session, element not found, or tap failed" },
  ],
  examples: [
    "ops mobile sim tap --selector '[data-block-index=\"0\"] textarea'",
    "ops mobile sim tap --x 200 --y 620",
  ],
}

export default async function mobileSimTap(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const selector = parsed.string("--selector")
  const x = parsed.nonNegativeInt("--x")
  const y = parsed.nonNegativeInt("--y")

  if (selector === undefined && (x === undefined || y === undefined)) {
    throw inputError("tap needs either --selector <css> or both --x and --y")
  }

  const driver = await simDriver()
  const appium = await appiumClient()
  const state = await driver.attachWebview(driver.requireDrivingState())

  if (selector !== undefined) {
    const elementId = await appium.findElement(
      state.appiumBase,
      state.sessionId,
      "css selector",
      selector
    )
    await appium.clickElement(state.appiumBase, state.sessionId, elementId)
    process.stdout.write(`✓ tapped ${selector}\n`)
    return
  }
  if (x !== undefined && y !== undefined) {
    await appium.tapCoordinates(state.appiumBase, state.sessionId, x, y)
    process.stdout.write(`✓ tapped (${x}, ${y})\n`)
  }
}
