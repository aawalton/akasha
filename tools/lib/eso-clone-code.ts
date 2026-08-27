
import { readdirSync, statSync } from "node:fs"
import { join } from "node:path"
import { esoDocPathForLuaRoot } from "@temper/shared-build-deploy-checks/eso-doc-api-version"
import {
  esoCloneHeaderLines,
  esouiDir,
  esouiDocPath,
  esouiSourceDir,
  parseEsoDocApiVersion,
} from "@temper/shared-foundation-misc-eso-paths"

interface EsoPaths {
  readonly esoCloneHeaderLines: typeof esoCloneHeaderLines
  readonly esouiDir: typeof esouiDir
  readonly esouiDocPath: typeof esouiDocPath
  readonly esouiSourceDir: typeof esouiSourceDir
  readonly parseEsoDocApiVersion: typeof parseEsoDocApiVersion
}

interface EsoDocApiVersion {
  readonly esoDocPathForLuaRoot: typeof esoDocPathForLuaRoot
}

export function esoPaths(): Promise<EsoPaths> {
  return Promise.resolve({
    esoCloneHeaderLines,
    esouiDir,
    esouiDocPath,
    esouiSourceDir,
    parseEsoDocApiVersion,
  })
}

export function esoDocApiVersion(): Promise<EsoDocApiVersion> {
  return Promise.resolve({ esoDocPathForLuaRoot })
}

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
