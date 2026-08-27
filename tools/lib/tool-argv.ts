import { akashaRoot } from "../../repo/roots/roots.ts"
import { resolveRoots } from "../../repo/roots/roots.ts"

const CLI = "tools/ops/cli.ts"

const AS_OPS_COMMAND = new Map<string, readonly string[]>([["read.ts", ["read"]]])

const IN_AKASHA = new Map<string, string>([
  ["write.ts", "ops-cli/global/write/write.ts"],
  ["edit.ts", "ops-cli/global/edit/edit.ts"],
  ["rm.ts", "ops-cli/global/rm/rm.ts"],
  ["mv.ts", "ops-cli/global/mv/mv.ts"],
  ["replace.ts", "ops-cli/global/replace/replace.ts"],
  ["search.ts", "ops-cli/global/search/search.ts"],
])

export function toolArgv(tool: string, args: readonly string[], root?: string): readonly string[] {
  const there = IN_AKASHA.get(tool)
  if (there !== undefined) return [`${akashaRoot()}/${there}`, ...args]
  const at = root ?? akashaRoot()
  const named = AS_OPS_COMMAND.get(tool)
  if (named === undefined) return [`${at}/tools/${tool}`, ...args]
  return [`${at}/${CLI}`, ...named, ...args]
}
