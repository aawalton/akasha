import { Glob } from "bun"

const SOURCES = "**/*.ts"

const INSTALLED = "node_modules"

const BUILT = "dist"

/**
 * Every TypeScript file this repository holds, leaving out what a tool put there.
 *
 * BUILD OUTPUT IS NOT SOURCE, and a `dist` tree stands or does not depending on whether anyone
 * has run a build, so walking one makes what the caller measures a fact about this machine
 * rather than about the repository. Nothing tracked stands under a `dist` segment, so leaving
 * them out drops no authored file.
 */
export function ownTypeScript(root: string): readonly string[] {
  return [...new Glob(SOURCES).scanSync({ cwd: root })]
    .filter((relPath) => {
      const parts = relPath.split("/")
      return !parts.includes(INSTALLED) && !parts.includes(BUILT)
    })
    .sort()
}
