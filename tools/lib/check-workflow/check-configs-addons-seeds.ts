import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { listAllAddons } from "@akasha/temper-addons-resolve/addon-roster"
import { Glob } from "bun"
import { z } from "zod"
import type { ScopedPopulation } from "../graph/queries/membership.ts"

export const BUILD_TOOLING_SEEDS: readonly string[] = []

const packageNameSchema = z.object({ name: z.string() }).passthrough()

export const packageSeedForAddonDir = (addonDir: string): string => {
  const pkgJson: unknown = JSON.parse(readFileSync(join(addonDir, "package.json"), "utf-8"))
  return `package:code:${packageNameSchema.parse(pkgJson).name}`
}

export const addonPackageSeeds = (codeRoot: string): readonly string[] => {
  const seeds = new Set<string>(BUILD_TOOLING_SEEDS)
  for (const addon of listAllAddons({ repoRoot: codeRoot })) {
    seeds.add(packageSeedForAddonDir(addon.dir))
  }
  return [...seeds].sort()
}

const SOURCE_KINDS: readonly { readonly kind: string; readonly extension: string }[] = [
  { kind: "ts-file", extension: "ts" },
  { kind: "tsx-file", extension: "tsx" },
]

const holdsExtension = (dir: string, extension: string): boolean => {
  if (!existsSync(dir)) return false
  for (const _found of new Glob(`**/*.${extension}`).scanSync({ cwd: dir })) return true
  return false
}

export const addonSourcePopulation = (codeRoot: string): readonly ScopedPopulation[] => {
  const roots = listAllAddons({ repoRoot: codeRoot })
    .map((addon) => `${addon.repoRelDir}/src`)
    .sort()
  return roots.flatMap((under) =>
    SOURCE_KINDS.filter(({ extension }) => holdsExtension(join(codeRoot, under), extension)).map(
      ({ kind }) => ({ kind, under })
    )
  )
}
