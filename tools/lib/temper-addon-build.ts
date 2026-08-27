
import { join } from "node:path"
import { codeModule } from "./code-import.ts"
import { AKASHA, resolveRoots, rootFor } from "../../repo/roots/roots"

const COMPILER_PACKAGE = "lua-compiler"

const COMPILER_ENTRY = "src/cli/tstl.ts"

const PLUGIN_DIR = "src/plugins"

const PLUGIN_FILES = ["tstl-no-truthy-numbers.js", "tstl-no-multi-store.js"] as const

export function tstlRoot(stated?: string): string {
  return stated ?? join(rootFor(resolveRoots(), AKASHA), COMPILER_PACKAGE)
}

export function luaPluginsArgument(root: string): string {
  return JSON.stringify(PLUGIN_FILES.map((one) => ({ name: join(root, PLUGIN_DIR, one) })))
}

export function tstlCommand(
  root: string,
  tsconfigPath: string,
  extra: readonly string[] = []
): readonly string[] {
  return [
    "bun",
    join(root, COMPILER_ENTRY),
    "--project",
    tsconfigPath,
    "--luaPlugins",
    luaPluginsArgument(root),
    ...extra,
  ]
}

export function tstlModule<T>(ref: string, root: string = tstlRoot()): Promise<T> {
  return codeModule<T>(ref, root)
}
