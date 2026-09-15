import { z } from "zod"

const COLON_DEF_RE = /function\s+[A-Za-z_][A-Za-z0-9_]*\s*:\s*([A-Za-z_][A-Za-z0-9_]*)\s*\(/g

const MATCH_SCHEMA = z
  .unknown()
  .nullable()
  .transform((raw): string | null => {
    if (raw === null) return null
    if (!Array.isArray(raw)) throw new Error("expected array from RegExp.exec")
    return z.string().parse(raw[1])
  })

export function extractColonMethodNames(luaSource: string): readonly string[] {
  const names: string[] = []
  COLON_DEF_RE.lastIndex = 0
  for (
    let name = MATCH_SCHEMA.parse(COLON_DEF_RE.exec(luaSource));
    name !== null;
    name = MATCH_SCHEMA.parse(COLON_DEF_RE.exec(luaSource))
  ) {
    names.push(name)
  }
  return names
}
