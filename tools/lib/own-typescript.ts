import { Glob } from "bun"

const SOURCES = "**/*.ts"

const INSTALLED = "node_modules"

export function ownTypeScript(root: string): readonly string[] {
  return [...new Glob(SOURCES).scanSync({ cwd: root })]
    .filter((relPath) => !relPath.split("/").includes(INSTALLED))
    .sort()
}
