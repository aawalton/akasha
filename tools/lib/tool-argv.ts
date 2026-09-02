import { akashaRoot } from "@akasha/pages-system/checkout-roots"
import { resolveRoots } from "@akasha/pages-system/checkout-roots"

const IN_AKASHA = new Map<string, string>([
  ["write.ts", "ops-cli/global/write/write.command.code.attachment.ts"],
  ["edit.ts", "ops-cli/global/edit/edit.command.code.attachment.ts"],
  ["rm.ts", "ops-cli/global/rm/rm.command.code.attachment.ts"],
  ["mv.ts", "ops-cli/global/mv/mv.command.code.attachment.ts"],
  ["replace.ts", "ops-cli/global/replace/replace.command.code.attachment.ts"],
  ["search.ts", "ops-cli/global/search/search.command.code.attachment.ts"],
])

export function toolArgv(tool: string, args: readonly string[], root?: string): readonly string[] {
  const there = IN_AKASHA.get(tool)
  if (there !== undefined) return [`${akashaRoot()}/${there}`, ...args]
  const at = root ?? akashaRoot()
  return [`${at}/tools/${tool}`, ...args]
}
