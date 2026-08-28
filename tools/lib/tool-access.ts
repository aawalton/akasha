import { readFileSync } from "node:fs"

import { ownRepoRoot } from "../../repo/roots/roots.ts"
import { shape } from "./shape.ts"

const DECLARED = "settings/tool-access.json"

const Declaration = shape.object({
  builtinTools: shape.array(shape.string()).nullable(),
  disallowedTools: shape.array(shape.string()),
  alwaysAllowed: shape.array(shape.string()),
})

function declaration(): ReturnType<typeof Declaration.parse> {
  return Declaration.parse(JSON.parse(readFileSync(`${ownRepoRoot()}/${DECLARED}`, "utf8")))
}

export interface ToolRestrictions {
  readonly tools: readonly string[] | null
  readonly disallowedTools: readonly string[]
}

export function toolRestrictions(): ToolRestrictions {
  const declared = declaration()
  return { tools: declared.builtinTools, disallowedTools: declared.disallowedTools }
}

export function alwaysAllowedTools(): readonly string[] {
  return declaration().alwaysAllowed
}
