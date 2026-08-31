export const summary = "Drop one secret from the sops file beside a page"

import { heldIn, landing, refuseUndeclared, removing, targetOf } from "../../../lib/page-secret-command.ts"
import { fail } from "../../../lib/command.ts"
import { parseArgs } from "../../../lib/parse-args.ts"
import type { CommandHelp } from "../../../ops/surface.ts"

export const help: CommandHelp = {
  irreversible: "irreversible",
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
      description: "Which secret to drop.",
    },
    {
      name: "--message",
      argLabel: "<msg>",
      valueShape: "prose",
      description: "Commit message. Defaults to one naming the sops file.",
    },
    { name: "--dry-run", description: "Gate and report; write and commit nothing." },
  ],
  exits: [
    { code: 0, meaning: "gated, written or removed, committed and pushed (or dry-run)" },
    {
      code: 1,
      meaning:
        "input error, a key the page type does not declare secret, no such key in the sops file, a gate refused, or `sops` failed — nothing was written",
    },
    { code: 3, meaning: "operational: the write or the commit failed" },
  ],
  examples: [
    "ops page secret clear --file-path ~/repos/akasha/pages/telnyx-account/outbound.telnyx-account.md --key api-key",
  ],
}

export default async function pageSecretClear(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const target = targetOf(parsed.requireString("--file-path"))
  const key = parsed.requireString("--key")
  refuseUndeclared(key, target)
  const held = heldIn(target)
  if (!held.has(key)) fail(`${target.sidecar} holds no \`${key}\`, so there is none to clear`)
  const landed = {
    verb: "page secret clear",
    message: parsed.string("--message"),
    dryRun: parsed.boolean("--dry-run"),
  }
  const next = new Map(held)
  next.delete(key)
  if (next.size === 0) removing(target, landed)
  else landing(target, next, landed)
}
