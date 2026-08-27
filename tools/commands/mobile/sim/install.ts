
export const summary = "Build the Capacitor shell for the simulator and install it to a booted sim over ssh (wraps native-shell/scripts/build-sim.sh; foreground, streams)"

import type { CommandHelp } from "../../../ops/surface.ts"
import { APP_FLAG } from "../../../lib/mobile-vocabulary.ts"
import { parseArgs } from "../../../lib/parse-args.ts"
import { apps } from "../../../lib/mobile-code.ts"
import { installSimShellModule } from "../../../lib/mobile-sim-code.ts"

export const help: CommandHelp = {
  flags: [
    APP_FLAG,
    {
      name: "--udid",
      argLabel: "<udid>",
      valueShape: "token",
      description:
        "Target simulator udid (default: build-sim.sh resolves first booted, else first available iPhone).",
    },
    {
      name: "--configuration",
      argLabel: "<name>",
      valueShape: "token",
      default: "Debug",
      choices: ["Debug", "Release"],
      description: "Xcode build configuration (default: Debug).",
    },
    {
      name: "--skip-stage",
      description:
        "Deliberate fast path: skip the react-router SPA rebuild and reuse the already-built workstation www/. Still rsyncs that bundle to the mac, but only after a staleness guard that FAILS LOUD (naming both timestamps) when the built www/ is older than the newest source under alanwalton/web — never silently install stale code.",
    },
  ],
  exits: [{ code: 3, meaning: "operational error: ssh/build/install against the macbook failed" }],
  examples: [
    "ops mobile sim install",
    "ops mobile sim install --skip-stage",
    "ops mobile sim install --udid 7E6CC581-6299-49D1-AFF5-C788ABF22F9F",
  ],
}

export default async function simInstall(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const { resolveApp } = await apps()
  const { installSimShell } = await installSimShellModule()

  await installSimShell({
    app: resolveApp(parsed.requireString("--app")),
    udid: parsed.string("--udid"),
    configuration: parsed.requireString("--configuration"),
    skipStage: parsed.boolean("--skip-stage"),
  })
}
