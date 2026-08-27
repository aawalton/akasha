import { readFileSync } from "node:fs"
import { join } from "node:path"
import { z } from "zod"

const TsconfigSchema = z
  .object({ tstl: z.object({ luaBundle: z.string().optional() }).passthrough().optional() })
  .passthrough()

export function readTstlLuaBundle(dir: string): string | null {
  const tsconfigPath = join(dir, "tsconfig.json")
  try {
    const raw = readFileSync(tsconfigPath, "utf-8")
    const parsed = TsconfigSchema.parse(JSON.parse(raw))
    return parsed.tstl?.luaBundle ?? null
  } catch {
    return null
  }
}
