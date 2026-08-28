import { readFileSync } from "node:fs"

import { ownRepoRoot } from "../../repo/roots/roots.ts"
import { shape } from "./shape.ts"

const DECLARED = "settings/launch-flags.json"

const Declaration = shape.object({
  always: shape.array(shape.string()),
  withMcpConfig: shape.array(shape.string()),
})

function declaration(): ReturnType<typeof Declaration.parse> {
  return Declaration.parse(JSON.parse(readFileSync(`${ownRepoRoot()}/${DECLARED}`, "utf8")))
}

export function flagsAlwaysPassed(): readonly string[] {
  return declaration().always
}

export function flagsPassedWithMcpConfig(): readonly string[] {
  return declaration().withMcpConfig
}
