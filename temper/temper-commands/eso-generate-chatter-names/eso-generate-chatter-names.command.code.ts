import { realpathSync } from "node:fs"
import { readFile, writeFile } from "node:fs/promises"
import { resolve } from "node:path"
import type { Answer } from "@akasha/command-system/calling"
import { answering, refused } from "@akasha/command-system/calling"
import { saidBy } from "@akasha/command-system/fault-saying"
import { codeRoot } from "@akasha/pages-system/code-root"
// The rendering of the registry still stands under `tools/lib`, so it is reached
// by the name that package's manifest gives it rather than by a path climbing
// out of akasha.
import { chatterNamesModule } from "../eso-chatter-names/eso-chatter-names.module.code.ts"

const DATA = 2

const FAILED = 3

const SELF = "akasha eso-generate-chatter-names"

const CODE_ROOT_FLAG = "--code-root"

const SOURCE_REL = "temper/addons/types/eso/generated/enums.d.ts"

const OUT_REL = "temper/player-quests-addon/src/generated/chatter-names.generated.ts"

function valueOf(argv: readonly string[], flag: string): string | undefined {
  for (let at = 0; at < argv.length; at += 1) {
    if (argv[at] === flag) return argv[at + 1]
  }
  return undefined
}

function saidShort(thrown: unknown): string {
  return saidBy(thrown).replace(/\s+/g, " ").trim()
}

export async function esoGenerateChatterNames(argv: readonly string[] = []): Promise<Answer> {
  const named = valueOf(argv, CODE_ROOT_FLAG)

  let root: string
  try {
    root = realpathSync(named ?? codeRoot())
  } catch (thrown) {
    return refused(
      `${named ?? codeRoot()} is no checkout on this disk, so nothing was read or written — ${saidShort(thrown)}`,
      DATA
    )
  }

  const sourcePath = resolve(root, SOURCE_REL)
  let source: string
  try {
    source = await readFile(sourcePath, "utf8")
  } catch (thrown) {
    return refused(
      `${sourcePath} is what this registry is drawn from and it is not there — ` +
        "`akasha eso-generate-typings` is what writes it — " +
        saidShort(thrown),
      DATA
    )
  }

  const registry = chatterNamesModule(source, SELF)
  if (registry.chatter.length === 0 || registry.interaction.length === 0) {
    return refused(
      `${sourcePath} declares ${String(registry.chatter.length)} CHATTER_ and ` +
        `${String(registry.interaction.length)} INTERACTION_ constant(s). An empty registry reads to ` +
        "the trace as a clean answer, so nothing was written.",
      DATA
    )
  }

  const outPath = resolve(root, OUT_REL)
  try {
    await writeFile(outPath, registry.text)
  } catch (thrown) {
    return refused(`the registry was not written into ${outPath} — ${saidShort(thrown)}`, FAILED)
  }

  return answering(
    [
      `wrote ${String(registry.chatter.length)} CHATTER_ and ${String(registry.interaction.length)} ` +
        `INTERACTION_ name(s) into ${outPath}`,
      `read from ${sourcePath}`,
    ],
    [],
    0
  )
}
