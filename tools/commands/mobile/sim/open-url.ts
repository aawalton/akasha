
export const summary = "Open a route in the sim's WKWebView: create/reuse the session, inject a throwaway Supabase session, navigate, re-acquire the webview context. Entry to a driving loop"

import type { CommandHelp } from "../../../ops/surface.ts"
import { APP_FLAG } from "../../../lib/mobile-vocabulary.ts"
import { parseArgs } from "../../../lib/parse-args.ts"
import { apps } from "../../../lib/mobile-code.ts"
import { simDriver, simMacbook, simSession } from "../../../lib/sim-driving.ts"

export const help: CommandHelp = {
  flags: [
    APP_FLAG,
    {
      name: "--route",
      argLabel: "<path>",
      valueShape: "token",
      required: true,
      description: "App route to open, e.g. `/home`, or `/<page-type-slug>/<page-slug>` for a page.",
    },
    {
      name: "--kb-debug",
      description:
        "Append `?kbDebug=1` so the block editor mounts the keyboard-geometry debug overlay (#15536 readout).",
    },
    {
      name: "--as-real-user",
      description:
        "Inject Alan's LIVE read-only session (BROWSER_TEST_REAL_USER_*) instead of the throwaway, so owner-owned pages render in sim. READ-ONLY — verification/reads only, never mutate through it (mutations stay on the throwaway).",
    },
    {
      name: "--udid",
      argLabel: "<udid>",
      valueShape: "token",
      description:
        "Target simulator udid (default: the active session's, else the first booted sim).",
    },
  ],
  positionals: [
    { name: "route", required: false, description: "Alias for --route.", aliasOfFlag: "--route" },
  ],
  envVars: [
    { name: "SUPABASE_URL", required: true, description: "Supabase base URL (sign-in)." },
    { name: "SUPABASE_ANON_KEY", required: true, description: "Supabase anon key." },
    {
      name: "BROWSER_TEST_EMAIL",
      required: true,
      description: "Throwaway browser-test email (default identity).",
    },
    {
      name: "BROWSER_TEST_PASSWORD",
      required: true,
      description: "Throwaway browser-test password (default identity).",
    },
    {
      name: "BROWSER_TEST_REAL_USER_EMAIL",
      description: "Alan's live email — required only with --as-real-user (READ-ONLY).",
    },
    {
      name: "BROWSER_TEST_REAL_USER_PASSWORD",
      description: "Alan's live password — required only with --as-real-user (READ-ONLY).",
    },
  ],
  exits: [{ code: 3, meaning: "operational error: Appium/session/sign-in/navigation failed" }],
  examples: [
    "ops mobile sim open-url /home",
    "ops mobile sim open-url --route /some/route --kb-debug",
  ],
}

export default async function simOpenUrl(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const { resolveApp } = await apps()
  const app = resolveApp(parsed.requireString("--app"))
  const route = parsed.requireString("--route")
  const kbDebug = parsed.boolean("--kb-debug")
  const asRealUser = parsed.boolean("--as-real-user")
  const udidFlag = parsed.string("--udid")

  const { ensureAppium, resolveAndBootSim } = await simMacbook()
  const { loadSessionState } = await simSession()
  const { openSession } = await simDriver()

  const base = await ensureAppium()
  const udid = udidFlag ?? loadSessionState()?.udid ?? (await resolveAndBootSim())

  const identity = asRealUser ? "Alan LIVE (READ-ONLY)" : "throwaway"
  process.stdout.write(
    `Opening ${route}${kbDebug ? " (kbDebug)" : ""} on sim ${udid} as ${identity}…\n`
  )
  const state = await openSession({
    base,
    udid,
    bundleId: app.bundleId,
    route,
    kbDebug,
    asRealUser,
  })

  process.stdout.write(
    `\n✓ session=${state.sessionId} context=${state.webviewContext} url=${state.route}\n`
  )
}
