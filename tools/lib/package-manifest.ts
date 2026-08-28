import { readFileSync } from "node:fs"
import { onceInCall } from "../../during-call/during-call.ts"

export const MANIFEST_FILE = "package.json"

export function packageSlugOf(name: string): string {
  return (name.startsWith("@") ? name.slice(1) : name).replaceAll("/", "-")
}

export function directoryOf(relPath: string): string {
  return relPath.slice(0, Math.max(relPath.lastIndexOf("/"), 0))
}

export function declaredNameIn(body: string): string | null {
  let parsed: unknown
  try {
    parsed = JSON.parse(body)
  } catch {
    return null
  }
  if (typeof parsed !== "object" || parsed === null) return null
  const name = (parsed as Record<string, unknown>)["name"]
  return typeof name === "string" && name !== "" ? name : null
}

function manifestIn(root: string, dir: string): string | null {
  try {
    return readFileSync(dir === "" ? `${root}/${MANIFEST_FILE}` : `${root}/${dir}/${MANIFEST_FILE}`, "utf8")
  } catch {
    return null
  }
}

export interface Manifests {
  slugFor: (relPath: string) => string | null
}

export function manifestsUnder(root: string): Manifests {
  const answered = onceInCall(`package-manifest:${root}`, () => new Map<string, string | null>())
  const forDirectory = (dir: string): string | null => {
    const held = answered.get(dir)
    if (held !== undefined) return held
    const body = manifestIn(root, dir)
    if (body === null && dir !== "") {
      const above = forDirectory(directoryOf(dir))
      answered.set(dir, above)
      return above
    }
    const name = body === null ? null : declaredNameIn(body)
    const answer = name === null ? null : packageSlugOf(name)
    answered.set(dir, answer)
    return answer
  }
  return { slugFor: (relPath) => forDirectory(directoryOf(relPath)) }
}
