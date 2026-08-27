
export const summary = "Compile Temper addons to Lua with the standalone compiler, copy their metadata, and install them unless held back"

import { existsSync } from "node:fs"
import { join } from "node:path"
import {
  readSiblingAddonNames,
  siblingDistDir,
} from "@temper/shared-build-deploy-addons-resolve/sibling-addons"
import { codeRoot } from "../../../lib/code-root.ts"
import { dataError, inputError, operationalError } from "../../../lib/exit.ts"
import { ownRepoRoot } from "../../../../repo/roots/roots"
import { tstlCommand, tstlRoot } from "../../../lib/temper-addon-build.ts"
import { addonsResolve } from "../../../lib/temper-addon-code.ts"
import { parseArgs } from "../../../lib/parse-args.ts"
import type { CommandHelp } from "../../../ops/surface.ts"

const RUN_CEILING_MS = 60 * 60 * 1000

const ADDONS_REL = "packages/temper/addons"

const OPS_CLI_REL = "tools/ops/cli.ts"

const INSTALL_LOCK_WAIT_S = "600"

export const help: CommandHelp = {
  positionals: [
    {
      name: "<name>",
      required: false,
      description:
        "Canonical addon name, flat-layout dir leaf, or nested-addon parent domain. Leave it out and name --all instead.",
    },
  ],
  flags: [
    {
      name: "--all",
      description: "Build every addon on the roster instead of one named addon.",
    },
    {
      name: "--build-only",
      description: "Stop after `dist/` is written. Install nothing into the game folder.",
    },
    {
      name: "--watch",
      description:
        "Hand --watch to the compiler and stay in it. One addon only, and nothing is copied or installed.",
    },
    {
      name: "--code-root",
      argLabel: "<path>",
      valueShape: "token",
      path: true,
      description: "The checkout to build from. Defaults to $CODE_ROOT, else this repository.",
    },
    {
      name: "--tstl-root",
      argLabel: "<path>",
      valueShape: "token",
      path: true,
      description:
        "The compiler to build with. Defaults to `lua-compiler` in the akasha checkout.",
    },
  ],
  envVars: [
    { name: "CODE_ROOT", description: "The checkout to work in, when --code-root is absent." },
    { name: "AKASHA_ROOT", description: "The akasha checkout holding the compiler, when --tstl-root is absent." },
  ],
  mutuallyExclusive: [
    ["--all", "--watch"],
    ["--watch", "--build-only"],
  ],
  exits: [
    { code: 0, meaning: "every addon asked for was built" },
    { code: 1, meaning: "input error: no addon named and no --all, or both" },
    { code: 2, meaning: "data error: the name matched no addon, or the addon carries no tsconfig" },
    { code: 3, meaning: "operational error: a build step failed or the run passed its ceiling" },
  ],
  examples: [
    "ops temper addon build TemperSales",
    "ops temper addon build TemperSales --build-only",
    "ops temper addon build --all",
    "ops temper addon build companions --watch",
  ],
}

function ranWithin(cmd: readonly string[], deadline: number, cwd: string, what: string): void {
  const left = deadline - Date.now()
  if (left <= 0) {
    throw operationalError(
      `the run passed its ceiling of ${String(RUN_CEILING_MS / 60000)} minutes before ${what}, so what it would have produced does not stand`
    )
  }
  const proc = Bun.spawnSync([...cmd], {
    stdio: ["inherit", "inherit", "inherit"],
    cwd,
    timeout: left,
  })
  if ((proc.exitCode ?? 1) !== 0) {
    throw operationalError(
      `${what} failed (exit ${String(proc.exitCode ?? 1)}). It ran as \`${cmd.join(" ")}\` in ${cwd}.`
    )
  }
}

export default async function temperAddonBuild(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const named = parsed.positionals[0]
  const all = parsed.boolean("--all")
  const watch = parsed.boolean("--watch")
  const buildOnly = parsed.boolean("--build-only")

  if (all && named !== undefined) {
    throw inputError(`--all builds the whole roster, so it takes no addon name; got \`${named}\``)
  }
  if (!all && named === undefined) {
    throw inputError("name an addon to build, or name --all to build every one of them")
  }

  const root = parsed.string("--code-root") ?? codeRoot()
  const tstl = tstlRoot(parsed.string("--tstl-root"))
  if (!existsSync(join(tstl, "src/cli/tstl.ts"))) {
    throw dataError(
      `${tstl} holds no \`src/cli/tstl.ts\`, so nothing there is the compiler. Name --tstl-root, or set AKASHA_ROOT.`
    )
  }

  const addonsRoot = join(root, ADDONS_REL)
  const addons = await addonsResolve(root)
  const opts = { repoRoot: root }

  const targets = all
    ? addons.listAllAddons(opts).map((one) => ({ dir: one.dir, canonicalName: one.canonicalName }))
    : [addons.resolveAddon(named as string, opts)]

  const deadline = Date.now() + RUN_CEILING_MS

  for (const target of targets) {
    const tsconfigPath = join(target.dir, "tsconfig.json")
    if (!existsSync(tsconfigPath)) {
      throw dataError(`${target.canonicalName} carries no ${tsconfigPath}, so there is nothing to compile`)
    }

    if (watch) {
      const proc = Bun.spawnSync([...tstlCommand(tstl, tsconfigPath, ["--watch"])], {
        stdio: ["inherit", "inherit", "inherit"],
        cwd: root,
      })
      if ((proc.exitCode ?? 1) !== 0) {
        throw operationalError(`the compiler exited ${String(proc.exitCode ?? 1)} out of --watch`)
      }
      return
    }

    const stale = [
      join(addonsRoot, "dist", target.canonicalName),
      ...readSiblingAddonNames(target.dir).map((name) => siblingDistDir(addonsRoot, name)),
    ]
    ranWithin(["rm", "-rf", ...stale], deadline, root, `emptying dist for ${target.canonicalName}`)

    ranWithin(
      tstlCommand(tstl, tsconfigPath),
      deadline,
      root,
      `compiling ${target.canonicalName} to Lua`
    )

    ranWithin(
      [
        "bun",
        join(ownRepoRoot(), OPS_CLI_REL),
        "temper",
        "addon",
        "copy-metadata",
        "--addon",
        target.canonicalName,
        "--code-root",
        root,
      ],
      deadline,
      root,
      `copying the metadata for ${target.canonicalName}`
    )

    if (buildOnly) {
      process.stdout.write(`built ${target.canonicalName} to dist/${target.canonicalName}\n`)
      continue
    }

    ranWithin(
      [
        "flock",
        "-x",
        "-w",
        INSTALL_LOCK_WAIT_S,
        `/var/tmp/temper-addon-install-${target.canonicalName}.lock`,
        "bun",
        join(ownRepoRoot(), OPS_CLI_REL),
        "temper",
        "addon",
        "install",
        "--addon",
        target.canonicalName,
        "--code-root",
        root,
      ],
      deadline,
      root,
      `installing ${target.canonicalName}`
    )
  }

  process.stdout.write(`${String(targets.length)} addon(s) built from ${root} with ${tstl}\n`)
}
