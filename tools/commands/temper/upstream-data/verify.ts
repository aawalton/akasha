
export const summary = "Rule on whether a ported upstream ESO library's data still matches upstream, leaf for leaf"

import { realpathSync } from "node:fs"
import { codeRoot } from "../../../lib/code-root.ts"
import { dataError, inputError } from "../../../lib/exit.ts"
import { parseArgs } from "../../../lib/parse-args.ts"
import {
  PortMismatch,
  UPSTREAM_LIBRARIES,
  type UpstreamLibrary,
  verifierFor,
} from "../../../lib/temper-upstream-data/libraries.ts"
import type { CommandHelp } from "../../../ops/surface.ts"

export const help: CommandHelp = {
  positionals: [
    {
      name: "library",
      description: `Which upstream library's port to rule on: ${UPSTREAM_LIBRARIES.join(", ")}.`,
    },
  ],
  flags: [
    {
      name: "--code-root",
      argLabel: "<path>",
      valueShape: "token",
      path: true,
      description:
        "The code checkout holding the ported files. Defaults to CODE_ROOT, or the sibling `code`.",
    },
  ],
  envVars: [{ name: "CODE_ROOT", description: "The code checkout, when --code-root is absent." }],
  exits: [{ code: 2, meaning: "the ported data no longer matches upstream" }],
  examples: [
    "ops temper upstream-data verify lib-zone --code-root ~/repos/code",
    "CODE_ROOT=~/repos/code ops temper upstream-data verify lib-treasure",
  ],
}

function namedLibrary(given: string | undefined): UpstreamLibrary {
  const found = UPSTREAM_LIBRARIES.find((one) => one === given)
  if (found === undefined) {
    throw inputError(
      `${String(given)} is no upstream library this rules on — name one of: ${UPSTREAM_LIBRARIES.join(", ")}`
    )
  }
  return found
}

export default async function temperUpstreamDataVerify(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const library = namedLibrary(parsed.positionals[0])
  const named = parsed.string("--code-root")
  const root = realpathSync(named ?? codeRoot())

  const verifier = await verifierFor(library)
  try {
    await verifier.verify(root)
  } catch (error) {
    if (error instanceof PortMismatch) throw dataError(error.message)
    throw error
  }
}
