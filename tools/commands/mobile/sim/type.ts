
export const summary = "Type text into the sim webview (optionally focusing a selector first). Reuses the active session"

import type { CommandHelp } from "../../../ops/surface.ts"
import { parseArgs } from "../../../lib/parse-args.ts"
import { appiumClient, simDriver } from "../../../lib/sim-driving.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--text",
      argLabel: "<text>",
      valueShape: "prose",
      required: true,
      description: "Text to type.",
    },
    {
      name: "--selector",
      argLabel: "<css>",
      valueShape: "token",
      description: "CSS selector to focus first (default: the active/focused element).",
    },
  ],
  exits: [
    { code: 3, meaning: "operational error: no live session, element not found, or type failed" },
  ],
  examples: [
    "ops mobile sim type --selector '[data-block-index=\"0\"] textarea' --text-file ./draft.md",
    "ops mobile sim type --text-file -",
  ],
}

export default async function mobileSimType(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const text = parsed.requireString("--text")
  const selector = parsed.string("--selector")

  const driver = await simDriver()
  const appium = await appiumClient()
  const state = await driver.attachWebview(driver.requireDrivingState())

  const elementId =
    selector !== undefined
      ? await appium.findElement(state.appiumBase, state.sessionId, "css selector", selector)
      : await appium.activeElement(state.appiumBase, state.sessionId)
  if (selector !== undefined) {
    await appium.clickElement(state.appiumBase, state.sessionId, elementId)
  }
  await appium.elementSendKeys(state.appiumBase, state.sessionId, elementId, text)

  process.stdout.write(`✓ typed ${text.length} char(s)\n`)
}
