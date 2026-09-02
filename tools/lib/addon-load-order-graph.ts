import { readFileSync } from "node:fs"
import { join } from "node:path"
import { z } from "zod"

const TsconfigSchema = z
  .object({ tstl: z.object({ luaBundle: z.string().optional() }).passthrough().optional() })
  .passthrough()

function luaBundleAt(tsconfigPath: string): string | null {
  try {
    const raw = readFileSync(tsconfigPath, "utf-8")
    const parsed = TsconfigSchema.parse(JSON.parse(raw))
    return parsed.tstl?.luaBundle ?? null
  } catch {
    return null
  }
}

export function readTstlLuaBundle(dir: string, ...alsoAt: readonly string[]): string | null {
  for (const path of [join(dir, "tsconfig.json"), ...alsoAt]) {
    const found = luaBundleAt(path)
    if (found !== null) return found
  }
  return null
}
