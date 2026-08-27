
export const summary = "Evaluate JavaScript in the sim webview and print the JSON result (the script must `return`). The kbDebug-counter readout. Reuses the active session"

import type { CommandHelp } from "../../../ops/surface.ts"
import { parseArgs } from "../../../lib/parse-args.ts"
import { appiumClient, simDriver } from "../../../lib/sim-driving.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--script",
      argLabel: "<js>",
      valueShape: "token",
      required: true,
      acceptsStdin: true,
      description: "JavaScript to evaluate (must `return` a value). `-` reads from stdin.",
    },
  ],
  positionals: [
    {
      name: "script",
      required: false,
      description: "Alias for --script.",
      aliasOfFlag: "--script",
    },
  ],
  exits: [{ code: 3, meaning: "operational error: no live session or the script threw" }],
  examples: [
    "ops mobile sim eval 'return window.kbDebug'",
    `ops mobile sim eval 'return document.querySelector(\\'[role="status"][aria-label="Keyboard geometry debug"]\\').innerText'`,
  ],
}

async function readStdin(): Promise<string> {
  let data = ""
  for await (const chunk of process.stdin) data += chunk
  return data
}

export default async function mobileSimEval(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const scriptArg = parsed.requireString("--script")
  const script = scriptArg === "-" ? await readStdin() : scriptArg

  const driver = await simDriver()
  const appium = await appiumClient()
  const state = await driver.attachWebview(driver.requireDrivingState())
  const result = await appium.executeScript(state.appiumBase, state.sessionId, script)

  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`)
}
