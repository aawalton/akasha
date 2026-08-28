import { Glob } from "bun"

const SOURCES = "**/*.ts"

const INSTALLED = "node_modules"

const BUILT = "dist"

export function ownTypeScript(root: string): readonly string[] {
  return [...new Glob(SOURCES).scanSync({ cwd: root })]
    .filter((relPath) => {
      const parts = relPath.split("/")
      return !parts.includes(INSTALLED) && !parts.includes(BUILT)
    })
    .sort()
}
