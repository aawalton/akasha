import { readdirSync, statSync } from "node:fs"
import { join } from "node:path"

export function collectLuaFiles(dir: string): readonly string[] {
  const out: string[] = []
  let entries: readonly string[]
  try {
    entries = readdirSync(dir)
  } catch {
    return out
  }
  for (const entry of entries) {
    const path = join(dir, entry)
    let stat: ReturnType<typeof statSync>
    try {
      stat = statSync(path)
    } catch {
      continue
    }
    if (stat.isDirectory()) out.push(...collectLuaFiles(path))
    else if (stat.isFile() && path.endsWith(".lua")) out.push(path)
  }
  return out
}
