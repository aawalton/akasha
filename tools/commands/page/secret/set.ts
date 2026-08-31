export const summary = "Encipher a value into the sops file beside a page"

import { inputError } from "../../../lib/exit.ts"
import {
  heldIn,
  landing,
  refuseUndeclared,
  targetOf,
  valueGiven,
  valuesGiven,
} from "../../../lib/page-secret-command.ts"
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
      description: "Which secret. Required, except with --json, which names its keys in its payload.",
    },
    {
      name: "--json",
      description:
        "What arrives is a JSON object of key to value rather than one value, and every key in it " +
        "lands in one commit.",
    },
    {
      name: "--value-file",
      argLabel: "<path|->",
      valueShape: "token",
      path: true,
      acceptsStdin: true,
      description: "Read the value from this file instead of stdin.",
    },
    {
      name: "--message",
      argLabel: "<msg>",
      valueShape: "prose",
      description: "Commit message. Defaults to one naming the sops file.",
    },
    { name: "--dry-run", description: "Gate and report; write and commit nothing." },
  ],
  mutuallyExclusive: [["--key", "--json"]],
  exits: [
    { code: 0, meaning: "gated, written, committed and pushed (or dry-run)" },
    {
      code: 1,
      meaning:
        "input error, a key the page type does not declare secret, a gate refused, or `sops` failed — nothing was written",
    },
    { code: 3, meaning: "operational: the write or the commit failed" },
  ],
  examples: [
    "printf %s $TOKEN | ops page secret set --file-path ~/repos/akasha/pages/telnyx-account/outbound.telnyx-account.md --key api-key",
    "ops page secret set --file-path ~/repos/akasha/pages/telnyx-account/outbound.telnyx-account.md --json --value-file /var/tmp/pair.json",
  ],
}

export default async function pageSecretSet(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const target = targetOf(parsed.requireString("--file-path"))
  const valueFile = parsed.string("--value-file")
  const landed = { verb: "page secret set", message: parsed.string("--message"), dryRun: parsed.boolean("--dry-run") }
  const next = new Map(heldIn(target))
  if (parsed.boolean("--json")) {
    for (const [key, value] of await valuesGiven(valueFile, target)) next.set(key, value)
    landing(target, next, landed)
    return
  }
  const key = parsed.string("--key")
  if (key === undefined) {
    throw inputError("--key names the one secret this sets, and none was given — or pass --json for several")
  }
  refuseUndeclared(key, target)
  next.set(key, await valueGiven(valueFile))
  landing(target, next, landed)
}
