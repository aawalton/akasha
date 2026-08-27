
export const summary = "Bring the sim-driving environment up: start on-demand Appium (only if down) + ensure a simulator is booted. Prints udid + Appium base"

import type { CommandHelp } from "../../../ops/surface.ts"
import { parseArgs } from "../../../lib/parse-args.ts"
import { simMacbook } from "../../../lib/sim-driving.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--udid",
      argLabel: "<udid>",
      valueShape: "token",
      description:
        "Target simulator udid (default: the first booted sim, else the first available iPhone).",
    },
  ],
  exits: [
    { code: 3, meaning: "operational error: ssh/Appium-start/sim-boot against the macbook failed" },
  ],
  examples: [
    "ops mobile sim boot",
    "ops mobile sim boot --udid 7E6CC581-6299-49D1-AFF5-C788ABF22F9F",
  ],
}

export default async function mobileSimBoot(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const udid = parsed.string("--udid")

  const macbook = await simMacbook()

  process.stdout.write("Ensuring Appium is up on the macbook…\n")
  const base = await macbook.ensureAppium()
  process.stdout.write("Resolving + booting the target simulator…\n")
  const resolved = await macbook.resolveAndBootSim(udid)

  process.stdout.write(`\n✓ SIM_BOOT_OK udid=${resolved} appium=${base}\n`)
}
