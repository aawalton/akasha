
export const summary =
  "Rebuild the chatter and interaction constant-name registry the quests addon carries"

import { realpathSync } from "node:fs"
import { readFile, writeFile } from "node:fs/promises"
import { resolve } from "node:path"
import { codeRoot } from "../../lib/code-root.ts"
import { chatterNamesModule } from "../../lib/eso-chatter-names.ts"
import { dataError, inputError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import type { CommandHelp } from "../../ops/surface.ts"

const SELF = "ops eso generate-chatter-names"

const SOURCE_REL = "packages/temper/addons/types/eso/generated/enums.d.ts"

const OUT_REL = "packages/temper/player/quests/addon/src/generated/chatter-names.generated.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--code-root",
      argLabel: "<path>",
      valueShape: "token",
      path: true,
      description:
        "The code checkout the enum declarations are read from and the registry written into. Defaults to CODE_ROOT, or the sibling `code`.",
    },
  ],
  envVars: [{ name: "CODE_ROOT", description: "The code checkout, when --code-root is absent." }],
  exits: [{ code: 2, meaning: "the enum declarations name no chatter or interaction constant" }],
  examples: ["ops eso generate-chatter-names --code-root ~/repos/code"],
}

export default async function esoGenerateChatterNames(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const root = realpathSync(parsed.string("--code-root") ?? codeRoot())


  const sourcePath = resolve(root, SOURCE_REL)
  let source: string
  try {
    source = await readFile(sourcePath, "utf-8")
  } catch (cause) {
    throw inputError(
      `Cannot read the ESO enum declarations at ${sourcePath}. They are what this registry is drawn from; \`ops eso generate-typings\` is what writes them. ${String(cause)}`
    )
  }

  const registry = chatterNamesModule(source, SELF)
  if (registry.chatter.length === 0 || registry.interaction.length === 0) {
    throw dataError(
      `${sourcePath} declares ${registry.chatter.length} CHATTER_ and ${registry.interaction.length} INTERACTION_ constant(s) — an empty registry reads to the trace as a clean answer, so nothing was written`
    )
  }

  const outPath = resolve(root, OUT_REL)
  await writeFile(outPath, registry.text)
  process.stdout.write(
    `wrote ${registry.chatter.length} CHATTER_ and ${registry.interaction.length} INTERACTION_ name(s) from ${sourcePath} → ${outPath}\n`
  )
}
