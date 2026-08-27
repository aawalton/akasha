
import { readdirSync, statSync } from "node:fs"
import { join } from "node:path"
import { codeModule } from "./code-import.ts"

const ESO_PATHS = "temper/shared-foundation-misc-eso-paths--from-instructions/src/index.ts"

const ESO_DOC_API_VERSION =
  "packages/temper/shared/build-deploy/checks/src/eso-doc-api-version.ts"

interface EsoPaths {
  readonly esoCloneHeaderLines: (
    generatorRef: string,
    apiVersion: number
  ) => readonly [string, string]
  readonly esouiDir: () => string
  readonly esouiDocPath: () => string
  readonly esouiSourceDir: () => string
  readonly parseEsoDocApiVersion: (docText: string) => number
}

interface EsoDocApiVersion {
  readonly esoDocPathForLuaRoot: (esoLuaRoot: string) => string
}

export function esoPaths(root?: string): Promise<EsoPaths> {
  return codeModule<EsoPaths>(ESO_PATHS, root)
}

export function esoDocApiVersion(root?: string): Promise<EsoDocApiVersion> {
  return codeModule<EsoDocApiVersion>(ESO_DOC_API_VERSION, root)
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
