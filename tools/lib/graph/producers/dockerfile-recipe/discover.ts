import type { Repo } from "../../../../../page/document/types.ts"
import type { BuildContext } from "../../types.ts"
import { repoFiles } from "../lib/repo-files.ts"

export const DOCKERFILE_RECIPE_EXTENSIONS_DIR = "packages/infra/lib/deploy"

export const DOCKERFILE_GENERATOR_SCRIPT_PATH = "packages/infra/scripts/src/generate-dockerfiles.ts"

const EXTENSIONS_SUFFIX = ".dockerfile-extensions.json"

export interface DiscoveredDockerfileRecipe {
  readonly name: string
  readonly extensionsPath: string
}

const isInRecipeDir = (relPath: string): boolean =>
  relPath.startsWith(`${DOCKERFILE_RECIPE_EXTENSIONS_DIR}/`) && relPath.endsWith(EXTENSIONS_SUFFIX)

const extractStem = (relPath: string): string => {
  const base = relPath.slice(DOCKERFILE_RECIPE_EXTENSIONS_DIR.length + 1)
  return base.slice(0, base.length - EXTENSIONS_SUFFIX.length)
}

export const discoverDockerfileRecipes = (
  ctx: BuildContext,
  repo: Repo
): readonly DiscoveredDockerfileRecipe[] => {
  const recipes: DiscoveredDockerfileRecipe[] = []
  for (const relPath of repoFiles(ctx, repo)) {
    if (!isInRecipeDir(relPath)) continue
    recipes.push({ name: extractStem(relPath), extensionsPath: relPath })
  }
  recipes.sort((a, b) => a.name.localeCompare(b.name))
  return recipes
}
