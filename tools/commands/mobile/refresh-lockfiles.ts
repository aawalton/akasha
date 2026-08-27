
export const summary = "Resolve each iOS app's native-shell dependencies on the macbook and commit the package-lock.json beside it"

import type { CommandHelp } from "../../ops/surface.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import { refreshLockfilesModule } from "../../lib/mobile-lockfiles-code.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--no-commit",
      description:
        "Gate the resolved lockfiles and report what they would change, landing nothing. For seeing what a resolution would do before it does it.",
    },
  ],
  exits: [
    { code: 3, meaning: "operational error: ssh to the macbook, or npm resolving nothing, failed" },
  ],
  examples: ["ops mobile refresh-lockfiles", "ops mobile refresh-lockfiles --no-commit"],
}

export default async function refreshLockfilesCommand(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const { refreshLockfiles } = await refreshLockfilesModule()

  await refreshLockfiles({ commit: !parsed.boolean("--no-commit") })
}
