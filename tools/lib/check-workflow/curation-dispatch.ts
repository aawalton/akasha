import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import { z } from "zod"
import { ownRepoRoot } from "../../../repo/roots/roots"

export const CURATION_DIR = "tools/lib/code-audit-ast-unused"

export const CURATION_FILE = `${CURATION_DIR}/ast-unused.config.json`

const CURATION_SCHEMA = z
  .object({
    parts: z.array(z.string()).optional(),
  })
  .loose()

export const curationDispatchNodes = (root: string = ownRepoRoot()): readonly string[] => {
  const at = resolve(root, CURATION_FILE)
  let raw: string
  try {
    raw = readFileSync(at, "utf-8")
  } catch {
    throw new Error(
      `check-workflow: ${at} is the curation the ts-file producer reads to decide which files ` +
        "count as entry points, and it is not there — composing a watch without it would leave " +
        "every check that reads reachability dispatching on nothing when the curation changes"
    )
  }
  let held: unknown
  try {
    held = JSON.parse(raw)
  } catch {
    throw new Error(`check-workflow: ${at} is not the JSON it has to be`)
  }
  const read = CURATION_SCHEMA.safeParse(held)
  if (!read.success) {
    throw new Error(`check-workflow: ${at} does not say which curation parts it names`)
  }
  return [
    `json-file:instructions:${CURATION_FILE}`,
    ...(read.data.parts ?? []).map((part) => `json-file:instructions:${CURATION_DIR}/${part}`),
  ]
}
