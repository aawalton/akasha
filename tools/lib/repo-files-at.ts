import { execFileSync } from "node:child_process"
import { CHECK_EXEMPT_DIRS } from "../../akasha/checks/cluster-checks/modules/repo-scope/repo-scope.module.code.ts"

export type RepoFilesAtOptions = {
  readonly includeFixtures?: boolean
  readonly includeGenerated?: boolean
}

const stderrDetail = (err: unknown): string => {
  if (typeof err !== "object" || err === null || !("stderr" in err)) return ""
  const text = String(err.stderr ?? "").trim()
  return text === "" ? "" : `: ${text}`
}

export const repoFilesAt = (root: string, options?: RepoFilesAtOptions): readonly string[] => {
  let out: string
  try {
    out = execFileSync(
      "git",
      ["-C", root, "ls-files", "--cached", "--others", "--exclude-standard", "-z"],
      { encoding: "utf-8", maxBuffer: 256 * 1024 * 1024, stdio: ["ignore", "pipe", "pipe"] }
    )
  } catch (err) {
    throw new Error(`git ls-files failed in ${root}${stderrDetail(err)}`)
  }
  const raw = out.split("\0").filter((rel) => rel !== "")
  raw.sort()
  const includeFixtures = options?.includeFixtures ?? false
  const includeGenerated = options?.includeGenerated ?? false
  if (includeFixtures && includeGenerated) return raw
  const isExempt = (rel: string): boolean => {
    for (const segment of rel.split("/")) {
      if (!CHECK_EXEMPT_DIRS.has(segment)) continue
      if (segment === "__fixtures__" && !includeFixtures) return true
      if (segment === "generated" && !includeGenerated) return true
    }
    return false
  }
  return raw.filter((rel) => !isExempt(rel))
}
