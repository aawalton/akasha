import { z } from "zod"
import { readRepoFile } from "../../repos.ts"
import type { BuildContext } from "../../types.ts"
import { INSTRUCTIONS_REPO } from "./constants.ts"

export const CURATION_DIR = "tools/lib/code-audit-ast-unused"

export const CURATION_FILE = `${CURATION_DIR}/ast-unused.config.json`

const CURATION_SCHEMA = z
  .object({
    workspaces: z.record(z.string(), z.unknown()).optional(),
    parts: z.array(z.string()).optional(),
  })
  .loose()

const readCurationFile = (relPath: string, raw: string): z.infer<typeof CURATION_SCHEMA> => {
  let parsed: unknown
  try {
    parsed = JSON.parse(raw)
  } catch {
    throw new Error(`graph: ${INSTRUCTIONS_REPO}:${relPath} is not the JSON it has to be`)
  }
  const read = CURATION_SCHEMA.safeParse(parsed)
  if (!read.success) {
    throw new Error(
      `graph: ${INSTRUCTIONS_REPO}:${relPath} does not say which workspaces it curates`
    )
  }
  return read.data
}

export const curatedWorkspaces = (ctx: BuildContext): Readonly<Record<string, unknown>> | null => {
  const raw = readRepoFile(ctx, INSTRUCTIONS_REPO, CURATION_FILE)
  if (raw === null) return null
  const root = readCurationFile(CURATION_FILE, raw)
  const out: Record<string, unknown> = { ...(root.workspaces ?? {}) }
  for (const part of root.parts ?? []) {
    const relPath = `${CURATION_DIR}/${part}`
    const partRaw = readRepoFile(ctx, INSTRUCTIONS_REPO, relPath)
    if (partRaw === null) {
      throw new Error(
        `graph: ${INSTRUCTIONS_REPO}:${CURATION_FILE} names the curation part ${part}, and the ` +
          "tree holds no such file — reading past it would drop every workspace that part curates " +
          "and report what is left as the whole"
      )
    }
    Object.assign(out, readCurationFile(relPath, partRaw).workspaces ?? {})
  }
  return out
}
