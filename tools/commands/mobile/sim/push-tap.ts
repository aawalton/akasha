
export const summary = "Deliver a push to the sim and tap its notification banner (cold by default, --warm for a live app), then print the sealed tap-trace entries. Makes a tap→answerable reading takeable on demand"

import type { CommandHelp } from "../../../ops/surface.ts"
import { APP_FLAG } from "../../../lib/mobile-vocabulary.ts"
import { operationalError } from "../../../lib/exit.ts"
import { parseArgs } from "../../../lib/parse-args.ts"
import { apps, host, ssh } from "../../../lib/mobile-code.ts"
import { pushTapScript, validate, zod } from "../../../lib/mobile-sim-code.ts"
import type { AppiumClient } from "../../../lib/sim-driving.ts"
import { appiumClient, simMacbook, simSession } from "../../../lib/sim-driving.ts"

const BANNER_X = 201
const BANNER_Y = 90

const TRACE_POLL_ATTEMPTS = 20
const TRACE_POLL_DELAY_MS = 1_500

const READ_TRACE_SCRIPT =
  "return JSON.stringify(window.getTapTrace ? window.getTapTrace().entries : null)"

export const help: CommandHelp = {
  flags: [
    APP_FLAG,
    {
      name: "--route",
      argLabel: "<path>",
      valueShape: "token",
      required: true,
      description: "Deep-link route the push carries, e.g. `/question/q-abcd1234`.",
    },
    {
      name: "--warm",
      description:
        "Leave the app running, so the tap measures a warm open. Default is cold (terminate first).",
    },
    {
      name: "--udid",
      argLabel: "<udid>",
      valueShape: "token",
      description: "Target simulator udid (default: the active session's, else the first booted).",
    },
    {
      name: "--title",
      argLabel: "<text>",
      valueShape: "line",
      description: "Notification title (default: `Tap probe`).",
    },
  ],
  positionals: [
    { name: "route", required: false, description: "Alias for --route.", aliasOfFlag: "--route" },
  ],
  exits: [
    {
      code: 3,
      meaning:
        "operational error: ssh/push failed, the app was still running for a cold run, the banner tap did not launch the app, or the bundle carries no tap-trace instrument",
    },
  ],
  examples: [
    "ops mobile sim push-tap /question/q-abcd1234",
    "ops mobile sim push-tap --route /project/p-abcd1234 --warm",
  ],
}

export default async function simPushTap(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const { resolveApp } = await apps()
  const app = resolveApp(parsed.requireString("--app"))
  const route = parsed.requireString("--route")
  const cold = !parsed.boolean("--warm")
  const udidFlag = parsed.string("--udid")
  const title = parsed.string("--title")

  const appium = await appiumClient()
  const { ensureAppium, resolveAndBootSim } = await simMacbook()
  const { loadSessionState, buildBannerTapCapabilities, resolveWdaLocalPort, WDA_LOCAL_PORT_ENV } =
    await simSession()
  const { MACBOOK } = await host()
  const { runSshCapture } = await ssh()
  const { buildApnsPayload, buildPushTapScript } = await pushTapScript()
  const { optionalEnv } = await validate()

  const base = await ensureAppium()
  const udid = udidFlag ?? loadSessionState()?.udid ?? (await resolveAndBootSim())

  process.stdout.write(`${cold ? "COLD" : "WARM"} push-tap ${route} on sim ${udid}…\n`)

  const pushOut = await runSshCapture(
    MACBOOK,
    buildPushTapScript({
      udid,
      bundleId: app.bundleId,
      payload: buildApnsPayload({ bundleId: app.bundleId, route, title }),
      cold,
    })
  )
  process.stdout.write(`${pushOut.trim()}\n`)

  const sessionId = await appium.createSession(
    base,
    buildBannerTapCapabilities(
      udid,
      resolveWdaLocalPort(optionalEnv(WDA_LOCAL_PORT_ENV)),
      app.bundleId
    )
  )
  try {
    await appium.tapCoordinates(base, sessionId, BANNER_X, BANNER_Y)
    const entries = await pollForTrace(appium, base, sessionId)
    process.stdout.write(`${JSON.stringify(entries, null, 1)}\n`)
  } finally {
    await appium.deleteSession(base, sessionId).catch(() => undefined)
  }
}

async function pollForTrace(
  appium: AppiumClient,
  base: string,
  sessionId: string
): Promise<unknown> {
  const { z } = await zod()
  const traceEntriesSchema = z
    .array(
      z
        .object({
          traceId: z.string(),
          launch: z.string(),
          outcome: z.string(),
        })
        .passthrough()
    )
    .nullable()

  for (let attempt = 0; attempt < TRACE_POLL_ATTEMPTS; attempt++) {
    await new Promise((resolve) => setTimeout(resolve, TRACE_POLL_DELAY_MS))
    const webview = (await appium.getContexts(base, sessionId)).find((c) =>
      c.startsWith("WEBVIEW_")
    )
    if (webview === undefined) continue
    await appium.setContext(base, sessionId, webview)
    const raw = await appium.executeScript(base, sessionId, READ_TRACE_SCRIPT, [])
    if (typeof raw !== "string") continue
    const decoded = traceEntriesSchema.safeParse(JSON.parse(raw))
    if (!decoded.success) continue
    const parsed = decoded.data
    if (parsed === null) {
      throw operationalError(
        "the installed bundle exposes no window.getTapTrace — it was built without the tap-trace instrument; run `ops mobile sim install` from a tree that has it"
      )
    }
    if (parsed.length > 0) return parsed
  }
  throw operationalError(
    `no tap trace appeared within ${Math.round(
      (TRACE_POLL_ATTEMPTS * TRACE_POLL_DELAY_MS) / 1000
    )}s of the banner tap — the banner may not have been present to tap, or the tap did not reach the push handler`
  )
}
