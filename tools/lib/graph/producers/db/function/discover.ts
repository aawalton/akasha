import { z } from "zod"
import type { Repo } from "../../../../../../page/document/types.ts"
import { readRepoFile } from "../../../repos.ts"
import type { BuildContext } from "../../../types.ts"
import { repoFiles } from "../../lib/repo-files.ts"

export type ParsedFunction = {
  readonly schema: string
  readonly name: string
  readonly language: string
  readonly sourcePath: string
  readonly line: number
}

export type DiscoveredFunctionFile = {
  readonly schema: string
  readonly name: string
  readonly relPath: string
  readonly content: string
}

const SCHEMA_DIR = "packages/shared/supabase/database/schema"
const FUNCTIONS_DIR = "functions"
const SQL_SUFFIX = ".sql"

const CREATE_FUNCTION_RE =
  /^CREATE OR REPLACE FUNCTION\s+([A-Za-z_][A-Za-z0-9_]*)\."?([A-Za-z_][A-Za-z0-9_]*)"?\s*\(/

const LANGUAGE_RE = /^\s*LANGUAGE\s+([A-Za-z_][A-Za-z0-9_]*)\s*$/

const CreateFunctionMatchSchema: z.ZodType<readonly [string, string] | null> = z
  .unknown()
  .transform((v) => {
    if (v === null) return null
    if (!Array.isArray(v)) return null
    const a = v[1]
    const b = v[2]
    if (typeof a !== "string" || typeof b !== "string") return null
    return [a, b] as const
  })

const LanguageMatchSchema: z.ZodType<readonly [string] | null> = z.unknown().transform((v) => {
  if (v === null) return null
  if (!Array.isArray(v)) return null
  const a = v[1]
  if (typeof a !== "string") return null
  return [a] as const
})

export const parseFunctionFile = (
  schema: string,
  expectedName: string,
  sourcePath: string,
  content: string
): ParsedFunction => {
  const lines = content.split(/\r?\n/)

  let parsedName: string | null = null
  for (const line of lines) {
    const m = CreateFunctionMatchSchema.parse(CREATE_FUNCTION_RE.exec(line))
    if (m === null) continue
    const [, fnName] = m
    parsedName = fnName
    break
  }
  if (parsedName === null) {
    throw new Error(`db-function producer: no CREATE OR REPLACE FUNCTION line in ${sourcePath}`)
  }
  if (parsedName !== expectedName) {
    throw new Error(
      `db-function producer: name mismatch in ${sourcePath} — file basename "${expectedName}" but body declares "${parsedName}"`
    )
  }

  let language: string | null = null
  let languageLine = 0
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i] ?? ""
    const m = LanguageMatchSchema.parse(LANGUAGE_RE.exec(line))
    if (m === null) continue
    const [token] = m
    language = token
    languageLine = i + 1
    break
  }
  if (language === null) {
    throw new Error(`db-function producer: no LANGUAGE line in ${sourcePath}`)
  }

  return {
    schema,
    name: parsedName,
    language,
    sourcePath,
    line: languageLine,
  }
}

export const discoverFunctionFiles = (
  ctx: BuildContext,
  repo: Repo
): readonly DiscoveredFunctionFile[] => {
  const out: DiscoveredFunctionFile[] = []
  for (const rel of repoFiles(ctx, repo)) {
    if (!rel.startsWith(`${SCHEMA_DIR}/`)) continue
    if (!rel.endsWith(SQL_SUFFIX)) continue
    const parts = rel.slice(SCHEMA_DIR.length + 1).split("/")
    if (parts.length !== 3) continue
    const [schema = "", dir = "", fileName = ""] = parts
    if (dir !== FUNCTIONS_DIR) continue
    if (schema === "") continue
    const name = fileName.slice(0, -SQL_SUFFIX.length)
    if (name === "") continue
    const content = readRepoFile(ctx, repo, rel)
    if (content === null) continue
    out.push({ schema, name, relPath: rel, content })
  }
  out.sort((a, b) => {
    if (a.schema < b.schema) return -1
    if (a.schema > b.schema) return 1
    if (a.name < b.name) return -1
    if (a.name > b.name) return 1
    return 0
  })
  return out
}

export const discoverAllFunctions = (
  ctx: BuildContext,
  repo: Repo
): readonly ParsedFunction[] => {
  const out: ParsedFunction[] = []
  for (const file of discoverFunctionFiles(ctx, repo)) {
    out.push(parseFunctionFile(file.schema, file.name, file.relPath, file.content))
  }
  return out
}
