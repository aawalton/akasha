
export const summary = "Port an upstream ESO library's data into the files this repository's package carries"

import { realpathSync } from "node:fs"
import { codeRoot } from "../../../lib/code-root.ts"
import { inputError } from "../../../lib/exit.ts"
import { parseArgs } from "../../../lib/parse-args.ts"
import {
  porterFor,
  UPSTREAM_LIBRARIES,
  type UpstreamLibrary,
} from "../../../lib/temper-upstream-data/libraries.ts"
import type { CommandHelp } from "../../../ops/surface.ts"

export const help: CommandHelp = {
  positionals: [
    {
      name: "library",
      description: `Which upstream library to port: ${UPSTREAM_LIBRARIES.join(", ")}.`,
    },
  ],
  flags: [
    {
      name: "--code-root",
      argLabel: "<path>",
      valueShape: "token",
      path: true,
      description:
        "The checkout to write the ported files into. Defaults to $CODE_ROOT, else this repository.",
    },
  ],
  envVars: [{ name: "CODE_ROOT", description: "The checkout to work in, when --code-root is absent." }],
  examples: [
    "ops temper upstream-data port lib-zone --code-root ~/repos/akasha",
    "CODE_ROOT=~/repos/akasha ops temper upstream-data port housing",
  ],
}

function namedLibrary(given: string | undefined): UpstreamLibrary {
  const found = UPSTREAM_LIBRARIES.find((one) => one === given)
  if (found === undefined) {
    throw inputError(
      `${String(given)} is no upstream library this ports — name one of: ${UPSTREAM_LIBRARIES.join(", ")}`
    )
  }
  return found
}

export default async function temperUpstreamDataPort(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const library = namedLibrary(parsed.positionals[0])
  const named = parsed.string("--code-root")
  const root = realpathSync(named ?? codeRoot())


  const porter = await porterFor(library)
  await porter.port(root)
}
