export const summary = "Print one of a page's secrets, decrypted"

import { heldIn, refuseUndeclared, targetOf } from "../../../lib/page-secret-command.ts"
import { fail } from "../../../lib/command.ts"
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
    {
      name: "--key",
      argLabel: "<name>",
      valueShape: "token",
      required: true,
      description: "Which secret to decrypt and print.",
    },
  ],
  exits: [
    { code: 0, meaning: "the value is on stdout" },
    {
      code: 1,
      meaning:
        "input error, a key the page type does not declare secret, no such key in the sops file, or `sops` failed",
    },
  ],
  examples: [
    "ops page secret reveal --file-path ~/repos/akasha/pages/telnyx-account/outbound.telnyx-account.md --key api-key",
  ],
}

export default async function pageSecretReveal(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const target = targetOf(parsed.requireString("--file-path"))
  const key = parsed.requireString("--key")
  refuseUndeclared(key, target)
  const value = heldIn(target).get(key)
  if (value === undefined) fail(`${target.sidecar} holds no \`${key}\``)
  process.stdout.write(`${value}\n`)
}
