import { join } from "node:path"
import { AKASHA, resolveRoots, rootFor } from "@akasha/pages-system/checkout-roots"

const COMPILER_PACKAGE = "language-design/lua-compiler"

const COMPILER_ENTRY = "tstl-cli/tstl-cli.module.code.ts"

const PLUGIN_FILES = [
  "tstl-plugin-tstl-no-truthy-numbers/tstl-plugin-tstl-no-truthy-numbers.module.code.ts",
  "tstl-plugin-tstl-no-multi-store/tstl-plugin-tstl-no-multi-store.module.code.ts",
] as const

export function tstlRoot(stated?: string): string {
  return stated ?? join(rootFor(resolveRoots(), AKASHA), COMPILER_PACKAGE)
}

export function luaPluginsArgument(root: string): string {
  return JSON.stringify(PLUGIN_FILES.map((one) => ({ name: join(root, one) })))
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
