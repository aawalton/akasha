import { AKASHA, rootFor } from "../../repo/roots/roots.ts"
import { readFileSync } from "node:fs"
import type { Check } from "../lib/check.ts"
import { agreement, refusalFor } from "../lib/hook-merge.ts"
import { judge, over, skip } from "../../outcome/outcome"
import { refusalText } from "../../refusal/refusal.ts"
import { byScript, SETTINGS_PATH } from "../lib/hook-settings.ts"

const NAME = "hooks-agree"

export function userSettingsPath(): string {
  const dir = process.env.CLAUDE_CONFIG_DIR ?? `${process.env.HOME ?? "/nonexistent"}/.claude`
  return `${dir}/settings.json`
}

function readOutside(path: string): string | null {
  try {
    return readFileSync(path, "utf8")
  } catch {
    return null
  }
}

function parsed(text: string): { document: unknown } | { error: string } {
  try {
    return { document: JSON.parse(text) as unknown }
  } catch (error) {
    return { error: error instanceof Error ? error.message : String(error) }
  }
}

export const hooksAgree: Check = (repo) => {
  const root = rootFor(repo.roots, AKASHA)
  if (!repo.exists(`${rootFor(repo.roots, AKASHA)}/${SETTINGS_PATH}`)) {
    return {
      ...skip(NAME, `${SETTINGS_PATH} is not there, so this repository registers no hook to check`),
      population: over(0, "registered hook(s)"),
    }
  }
  const ours = parsed(repo.read(SETTINGS_PATH))
  if ("error" in ours) {
    return {
      ...skip(
        NAME,
        `${SETTINGS_PATH} is not readable JSON, so which hooks it registers cannot be known`
      ),
      population: over(0, "registered hook(s)"),
    }
  }
  const userPath = userSettingsPath()
  const text = readOutside(userPath)
  if (text === null) {
    return {
      ...skip(NAME, `${userPath} is not there, so no session loads a second copy of the set`),
      population: over(0, "registered hook(s)"),
    }
  }
  const theirs = parsed(text)
  if ("error" in theirs) {
    return {
      ...judge(NAME, `${userPath} could not be parsed`, [
        refusalText("user-settings-unreadable", { path: userPath, error: theirs.error }, root),
      ]),
      population: over(0, "registered hook(s)"),
    }
  }
  const dead = [...byScript(theirs.document, repo.roots)]
    .filter(([relPath]) => !repo.exists(`${rootFor(repo.roots, AKASHA)}/${relPath}`))
    .map(([relPath, command]) =>
      refusalText(
        "user-settings-dead-registration",
        { path: userPath, command, script: relPath },
        root
      )
    )

  const { divergences, shared, unshared } = agreement(ours.document, theirs.document)
  return {
    ...judge(
      NAME,
      `${shared} hooks registered by both files under one key, ${unshared} by one of them only and ` +
        `firing once, against ${userPath}`,
      [...divergences.map((one) => refusalFor(one, SETTINGS_PATH, userPath, root)), ...dead]
    ),
    population: over(shared + unshared, "registered hook(s)"),
  }
}
