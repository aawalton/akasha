export const summary = "Which secrets a page holds, none of them decrypted"

import { keysHeld, targetOf } from "../../../lib/page-secret-command.ts"
import { parseArgs } from "../../../lib/parse-args.ts"
import type { CommandHelp } from "../../../ops/surface.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--file-path",
      argLabel: "<path>",
      valueShape: "token",
      path: true,
      required: true,
      description: "The page, not its sops file.",
    },
  ],
  exits: [
    { code: 0, meaning: "the two lines are on stdout" },
    {
      code: 1,
      meaning:
        "input error, the path is no `.md` page, no page stands there, or no page type claims it",
    },
  ],
  examples: ["ops page secret show --file-path ~/repos/akasha/pages/telnyx-account/outbound.telnyx-account.md"],
}

export default async function pageSecretShow(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const target = targetOf(parsed.requireString("--file-path"))
  const keys = keysHeld(target)
  const holding = keys.length === 0 ? "nothing" : keys.join(", ")
  const secret = target.declared.length === 0 ? "no key" : target.declared.join(", ")
  process.stdout.write(`held:   ${target.sidecar} holds ${holding}\nsecret: the page type declares ${secret}\n`)
}
