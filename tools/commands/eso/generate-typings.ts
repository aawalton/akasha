export const summary =
  "Rebuild the opt-in ESO API typings this repository carries from the ~/esoui clone"

import { realpathSync } from "node:fs"
import { mkdir, readFile, writeFile } from "node:fs/promises"
import { join, resolve } from "node:path"
import { codeRoot } from "@akasha/pages-system/code-root"
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
import { selectOptIn } from "@akasha/temper-eso-typings/eso-token-scope"
import { esoPaths } from "../../lib/eso-clone-code.ts"
import { ESO_OPT_IN } from "../../lib/eso-typings/opt-in.ts"
import { inputError, operationalError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import type { CommandHelp } from "../../ops/surface.ts"

const SELF = "ops eso generate-typings"

const OUT_REL = "temper/addons/types/eso/generated"

export const help: CommandHelp = {
  description:
    "Parse the ESO UI documentation dump for every function, object, event and enum it describes,\n" +
    "keep the ones the opt-in manifest names plus the enums and parent objects those reach, and\n" +
    "write the result into this repository as the declaration files its addons compile against.\n" +
    "\n" +
    "The manifest is the scope. The dump describes thousands of tokens and an addon needs a few\n" +
    "hundred, so the manifest stands here beside the generator and a token absent from it is absent\n" +
    "from the typings.\n" +
    "\n" +
    "The written files are tracked artefacts of this repository; this command is the rule they\n" +
    "are made by and stands here, where no deploy has to carry it. The output tree is taken from the\n" +
    "checkout named rather than from this file's own location.\n" +
    "\n" +
    "The emitted files are formatted with this repository's own Biome, so a run leaves the tree\n" +
    "as a run from inside it would have.",
  flags: [
    {
      name: "--code-root",
      argLabel: "<path>",
      valueShape: "token",
      path: true,
      description:
        "The checkout the typings are written into. Defaults to $CODE_ROOT, else this repository.",
    },
  ],
  envVars: [
    { name: "CODE_ROOT", description: "The checkout to work in, when --code-root is absent." },
  ],
  examples: ["ops eso generate-typings --code-root ~/repos/akasha"],
}

const INDEX_BODY = `// ESO API Types (Auto-generated — opt-in scoped)
// Generated from ESOUIDocumentation.txt by ops eso generate-typings.

/// <reference path="./enums.d.ts" />
/// <reference path="./functions.d.ts" />
/// <reference path="./events.d.ts" />
/// <reference path="./objects.d.ts" />
`

export default async function esoGenerateTypings(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const root = realpathSync(parsed.string("--code-root") ?? codeRoot())

  const paths = await esoPaths()
  const docPath = paths.esouiDocPath()

  let content: string
  try {
    content = await readFile(docPath, "utf-8")
  } catch (cause) {
    throw inputError(
      `Cannot read ESOUIDocumentation.txt at ${docPath}. It is the copyright-Zenimax ESO API dump and is vendored in no repository here. Restore the peer clone with \`git clone https://github.com/esoui/esoui.git ~/esoui\`, or point ESOUI_SRC_DIR at your checkout. ${String(cause)}`
    )
  }

  const apiVersion = paths.parseEsoDocApiVersion(content)

  const selected = selectOptIn(
    {
      enums: parseEnums(content),
      functions: parseFunctions(content),
      events: parseEvents(content),
      objects: parseObjects(content),
    },
    ESO_OPT_IN
  )

  const stamp = paths
    .esoCloneHeaderLines(SELF, apiVersion)
    .map((line) => `// ${line}`)
    .join("\n")
  const withStamp = (body: string): string => `${stamp}\n${body}`

  const outDir = resolve(root, OUT_REL)
  await mkdir(outDir, { recursive: true })

  await writeFile(join(outDir, "enums.d.ts"), withStamp(generateEnumsFile(selected.enums)))
  await writeFile(
    join(outDir, "functions.d.ts"),
    withStamp(generateFunctionsFile(selected.functions))
  )
  await writeFile(join(outDir, "events.d.ts"), withStamp(generateEventsFile(selected.events)))
  await writeFile(join(outDir, "objects.d.ts"), withStamp(generateObjectsFile(selected.objects)))
  await writeFile(join(outDir, "index.d.ts"), withStamp(INDEX_BODY))

  const biome = Bun.spawn(["bunx", "biome", "format", "--write", outDir], {
    cwd: root,
    stdout: "ignore",
    stderr: "inherit",
  })
  const exitCode = await biome.exited
  if (exitCode !== 0) {
    throw operationalError(
      `Biome formatting failed (exit ${exitCode}) for ${outDir}, so the emitted typings are unformatted and differ from what a clean run leaves`
    )
  }

  process.stdout.write(
    `wrote ${selected.functions.length} function(s), ${selected.objects.length} object(s), ` +
      `${selected.events.length} event(s) and ${selected.enums.length} enum(s) ` +
      `from ${docPath} (API ${apiVersion}) → ${outDir}\n`
  )
}
