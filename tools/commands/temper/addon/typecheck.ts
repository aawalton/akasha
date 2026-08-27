
export const summary =
  "Typecheck every Temper addon against its own tsconfig with nothing emitted, stopping at the first that fails"

import { existsSync } from "node:fs"
import { join, resolve } from "node:path"
import { codeRoot } from "../../../lib/code-root.ts"
import { dataError, operationalError } from "../../../lib/exit.ts"
import { parseArgs } from "../../../lib/parse-args.ts"
import { addonsResolve } from "../../../lib/temper-addon-code.ts"
import type { CommandHelp } from "../../../ops/surface.ts"

const RUN_CEILING_MS = 60 * 60 * 1000

const ADDONS_REL = "packages/temper/addons"

const COMPILER = ["bunx", "@typescript/native-preview", "--noEmit", "-p"] as const

const DESCRIPTION =
  "Read the addon roster out of a checkout and run the TypeScript compiler over each addon's own `tsconfig.json` with nothing emitted, in canonical-name order, stopping at the first addon that does not typecheck.\n" +
  "\n" +
  "An addon's `tsconfig.json` is the only statement of what that addon compiles and which ESO globals it may name, so the compiler is run once per addon rather than once over the workspace. This is tooling the workstation runs, not anything a deploy carries.\n" +
  "\n" +
  "The checkout is taken as an argument rather than derived from this file's own location, so the roster read and the compiler run are both in the tree named. The addon resolver itself is loaded from the main checkout either way.\n" +
  "\n" +
  "The whole run is bounded rather than each addon, so a compiler that stops making progress fails with the addon it was on rather than hanging."

export const help: CommandHelp = {
  description: DESCRIPTION,
  flags: [
    {
      name: "--code-root",
      argLabel: "<path>",
      valueShape: "token",
      path: true,
      description:
        "The checkout whose addons are typechecked. Defaults to $CODE_ROOT, else this repository.",
    },
  ],
  envVars: [{ name: "CODE_ROOT", description: "The checkout to work in, when --code-root is absent." }],
  exits: [
    { code: 0, meaning: "every addon on the roster typechecked clean" },
    {
      code: 2,
      meaning:
        "data error: the path named is not a checkout, it holds no addons, or an addon carries no tsconfig.json",
    },
    {
      code: 3,
      meaning: "operational error: an addon failed to typecheck, or the run passed its ceiling",
    },
  ],
  examples: ["ops temper addon typecheck", "ops temper addon typecheck --code-root ~/repos/akasha"],
}

export default async function temperAddonTypecheck(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const codeCheckout = resolve(parsed.string("--code-root") ?? codeRoot())

  if (!existsSync(join(codeCheckout, ADDONS_REL))) {
    throw dataError(
      `${codeCheckout} holds no ${ADDONS_REL}, so nothing there is a checkout to read a roster out of`
    )
  }

  const { listAllAddons } = await addonsResolve()
  const addons = [...listAllAddons({ repoRoot: codeCheckout })].sort((a, b) =>
    a.canonicalName.localeCompare(b.canonicalName)
  )
  if (addons.length === 0) {
    throw dataError(
      `${codeCheckout} holds no addons, so a clean run here would report nothing typechecked`
    )
  }

  const deadline = Date.now() + RUN_CEILING_MS

  for (const addon of addons) {
    const tsconfigPath = join(addon.dir, "tsconfig.json")
    if (!existsSync(tsconfigPath)) {
      throw dataError(
        `${addon.canonicalName} carries no ${tsconfigPath}, so there is nothing to typecheck it against`
      )
    }

    const left = deadline - Date.now()
    if (left <= 0) {
      throw operationalError(
        `the run passed its ceiling of ${String(RUN_CEILING_MS / 60000)} minutes before ${addon.canonicalName} was typechecked, so what it would have found does not stand`
      )
    }

    const proc = Bun.spawnSync([...COMPILER, tsconfigPath], {
      stdio: ["inherit", "inherit", "inherit"],
      cwd: codeCheckout,
      timeout: left,
    })
    if ((proc.exitCode ?? 1) !== 0) {
      throw operationalError(
        `${addon.canonicalName} failed to typecheck (exit ${String(proc.exitCode ?? 1)}) against ${tsconfigPath}`
      )
    }
  }

  process.stdout.write(
    `typechecked ${String(addons.length)} addon(s) from ${codeCheckout}\n`
  )
}
