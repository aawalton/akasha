import { realpathSync } from "node:fs"
import { mkdir, readFile, writeFile } from "node:fs/promises"
import { join, resolve } from "node:path"
import type { Answer } from "@akasha/command-system/calling"
import { answering, refused } from "@akasha/command-system/calling"
import { saidBy } from "@akasha/command-system/fault-saying"
import { codeRoot } from "@akasha/pages-system/code-root"
import {
  esoCloneHeaderLines,
  parseEsoDocApiVersion,
} from "@akasha/temper-eso-paths/eso-clone-stamp"
import { esouiDocPath } from "@akasha/temper-eso-paths/eso-paths"
import {
  generateEnumsFile,
  generateEventsFile,
  generateFunctionsFile,
  generateObjectsFile,
} from "@akasha/temper-eso-typings/eso-declaration-text"
import {
  parseEnums,
  parseEvents,
  parseFunctions,
  parseObjects,
} from "@akasha/temper-eso-typings/eso-doc-tokens"
import { ESO_OPT_IN } from "@akasha/temper-eso-typings/eso-opt-in"
import { selectOptIn } from "@akasha/temper-eso-typings/eso-token-scope"

const DATA = 2

const FAILED = 3

const SELF = "akasha temper-eso-generate-typings"

const CODE_ROOT_FLAG = "--code-root"

const OUT_REL = "temper/addons/types/eso/generated"

const INDEX_BODY = `/// <reference path="./enums.d.ts" />
/// <reference path="./functions.d.ts" />
/// <reference path="./events.d.ts" />
/// <reference path="./objects.d.ts" />
`

function saidFor(argv: readonly string[], flag: string): string | undefined {
  for (let at = 0; at < argv.length; at += 1) {
    if (argv[at] === flag) return argv[at + 1]
  }
  return undefined
}

function saidShort(thrown: unknown): string {
  return saidBy(thrown).replace(/\s+/g, " ").trim()
}

export async function temperEsoGenerateTypings(argv: readonly string[] = []): Promise<Answer> {
  const named = saidFor(argv, CODE_ROOT_FLAG)

  let root: string
  try {
    root = realpathSync(named ?? codeRoot())
  } catch (thrown) {
    return refused(
      `${named ?? codeRoot()} is no checkout on this disk, so nothing was read or written — ${saidShort(thrown)}`,
      DATA
    )
  }

  const docPath = esouiDocPath()
  let doc: string
  try {
    doc = await readFile(docPath, "utf8")
  } catch (thrown) {
    return refused(
      `${docPath} is the game's own API documentation and is vendored in no repository here, so there was nothing to read the declarations out of. ` +
        "Restore the peer clone with `git clone https://github.com/esoui/esoui.git ~/esoui`, or name another copy with ESOUI_SRC_DIR — " +
        `${saidShort(thrown)}`,
      DATA
    )
  }

  let apiVersion: number
  try {
    apiVersion = parseEsoDocApiVersion(doc)
  } catch (thrown) {
    return refused(
      `${docPath} states no API version, so a written declaration would carry no stamp for the freshness audit to weigh — ${saidShort(thrown)}`,
      DATA
    )
  }

  const selected = selectOptIn(
    {
      enums: parseEnums(doc),
      functions: parseFunctions(doc),
      events: parseEvents(doc),
      objects: parseObjects(doc),
    },
    ESO_OPT_IN
  )

  const stamp = esoCloneHeaderLines(SELF, apiVersion)
    .map((line) => `// ${line}`)
    .join("\n")
  const stamped = (body: string): string => `${stamp}\n${body}`

  const outDir = resolve(root, OUT_REL)
  try {
    await mkdir(outDir, { recursive: true })
    await writeFile(join(outDir, "enums.d.ts"), stamped(generateEnumsFile(selected.enums)))
    await writeFile(
      join(outDir, "functions.d.ts"),
      stamped(generateFunctionsFile(selected.functions))
    )
    await writeFile(join(outDir, "events.d.ts"), stamped(generateEventsFile(selected.events)))
    await writeFile(join(outDir, "objects.d.ts"), stamped(generateObjectsFile(selected.objects)))
    await writeFile(join(outDir, "index.d.ts"), stamped(INDEX_BODY))
  } catch (thrown) {
    return refused(
      `the declarations were not written whole into ${outDir} — ${saidShort(thrown)}`,
      FAILED
    )
  }

  const biome = Bun.spawn(["bunx", "biome", "format", "--write", outDir], {
    cwd: root,
    stdout: "ignore",
    stderr: "ignore",
  })
  const formatted = await biome.exited
  if (formatted !== 0) {
    return refused(
      `Biome left ${outDir} unformatted (exit ${String(formatted)}), so the declarations differ from what a run inside that checkout would leave`,
      FAILED
    )
  }

  return answering(
    [
      `wrote ${String(selected.functions.length)} function(s), ${String(selected.objects.length)} object(s), ` +
        `${String(selected.events.length)} event(s) and ${String(selected.enums.length)} enum(s) ` +
        `into ${outDir}`,
      `read from ${docPath} at API version ${String(apiVersion)}`,
    ],
    [],
    0
  )
}
