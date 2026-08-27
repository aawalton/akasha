export const summary = "Extract the trusted write-as accountUserId from a delivered SMS surface (--surface-file -); fail-closed"

import type { CommandHelp } from "../../ops/surface.ts"
import { inputError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import { readStdinOrFile } from "../../lib/read-stdin-or-file.ts"
import { extractActingAccountUserId } from "@alanwalton/sms-core/acting-account"

export const help: CommandHelp = {
  flags: [
    {
      name: "--surface-file",
      argLabel: "<path|->",
      valueShape: "token",
      acceptsStdin: true,
      path: true,
      required: true,
      description: "Path to the delivered SMS surface; `-` reads the surface from stdin",
    },
  ],
  exits: [
    { code: 0, meaning: "a trusted acting-account uuid was extracted and printed to stdout" },
    {
      code: 1,
      meaning:
        "input error (missing flag / unreadable file), OR fail-closed: no trusted acting-account footer in the surface",
    },
  ],
  examples: [
    "ops sms acting-account --surface-file ./surface.txt",
    "ops sms acting-account --surface-file -   # read the surface from stdin",
  ],
}

export default async function smsActingAccount(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const surfacePath = parsed.requireString("--surface-file")

  const surface = await readStdinOrFile(surfacePath)

  const accountUserId = extractActingAccountUserId(surface)
  if (accountUserId === null) {
    throw inputError("no trusted acting-account in surface (fail-closed)")
  }

  process.stdout.write(`${accountUserId}\n`)
}
