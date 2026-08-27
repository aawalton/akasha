
export const summary = "Report the current sim session state (session/udid/route/webview, Appium up?, session live?). Read-only, exit-0 always"

import type { CommandHelp } from "../../../ops/surface.ts"
import { parseArgs } from "../../../lib/parse-args.ts"
import { appiumClient, simMacbook, simSession } from "../../../lib/sim-driving.ts"

export const help: CommandHelp = {
  flags: [],
  examples: ["ops mobile sim status"],
}

export default async function mobileSimStatus(args: readonly string[]): Promise<void> {
  parseArgs(help, args)

  const session = await simSession()
  const state = session.loadSessionState()

  if (state === null) {
    process.stdout.write(
      `no active sim session (${session.SIM_SESSION_PATH} absent). Run \`ops mobile sim boot\` + \`open-url\`.\n`
    )
    return
  }

  const macbook = await simMacbook()
  const appium = await appiumClient()
  const appiumUp = await macbook.appiumIsUp()
  let sessionLive = false
  if (appiumUp) {
    try {
      await appium.getContexts(state.appiumBase, state.sessionId)
      sessionLive = true
    } catch {
      sessionLive = false
    }
  }
  const ageSeconds = Math.max(0, Math.round((Date.now() - state.startedAtMs) / 1000))

  process.stdout.write(
    [
      `session:   ${state.sessionId}`,
      `udid:      ${state.udid}`,
      `appium:    ${state.appiumBase} (${appiumUp ? "up" : "down"})`,
      `webview:   ${state.webviewContext ?? "(none)"}`,
      `route:     ${state.route ?? "(none)"}`,
      `age:       ${ageSeconds}s`,
      `live:      ${sessionLive ? "yes" : "no — run `ops mobile sim open-url` to restart"}`,
      "",
    ].join("\n")
  )
}
