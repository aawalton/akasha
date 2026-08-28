import { AKASHA, rootFor } from "../../repo/roots/roots.ts"
import type { Check } from "../lib/check.ts"
import { judge, over } from "../../outcome/outcome"
import { refusalText } from "../../refusal/refusal.ts"
import { repoRelative, SETTINGS_PATH } from "../lib/hook-settings.ts"

const NAME = "bash-env-inside"

export const DECLARATION = "BASH_ENV"

export function declaredIn(document: unknown): string | null {
  const env = (document as { env?: unknown } | null | undefined)?.env
  if (env === null || typeof env !== "object") return null
  const value = (env as Record<string, unknown>)[DECLARATION]
  return typeof value === "string" && value !== "" ? value : null
}

export const bashEnvInside: Check = (repo) => {
  const root = rootFor(repo.roots, AKASHA)
  const population = over(0, `${DECLARATION} declaration(s)`)
  if (!repo.exists(`${root}/${SETTINGS_PATH}`)) {
    return {
      ...judge(NAME, `${SETTINGS_PATH} names no file`, [
        refusalText("bash-env-settings-absent", {}, root),
      ]),
      population,
    }
  }
  let document: unknown
  try {
    document = JSON.parse(repo.read(SETTINGS_PATH))
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error)
    return {
      ...judge(NAME, `${SETTINGS_PATH} could not be parsed`, [
        refusalText("bash-env-settings-unreadable", { error: detail }, root),
      ]),
      population,
    }
  }

  const declared = declaredIn(document)
  if (declared === null) {
    return {
      ...judge(NAME, `${SETTINGS_PATH} declares no ${DECLARATION}`, [
        refusalText("bash-env-undeclared", {}, root),
      ]),
      population,
    }
  }

  const measured = over(1, `${DECLARATION} declaration(s)`)
  const relPath = repoRelative(declared, repo.roots)
  if (relPath === null) {
    return {
      ...judge(NAME, `${DECLARATION} is \`${declared}\``, [
        refusalText("bash-env-outside-repo", { declared }, root),
      ]),
      population: measured,
    }
  }
  if (!repo.exists(`${root}/${relPath}`)) {
    return {
      ...judge(NAME, `${DECLARATION} is \`${declared}\``, [
        refusalText("bash-env-unresolved", { declared, path: relPath }, root),
      ]),
      population: measured,
    }
  }
  return {
    ...judge(NAME, `${DECLARATION} is \`${relPath}\`, which is in this repository`, []),
    population: measured,
  }
}
