import { readFileSync } from "node:fs"

export const CONDUCT_RELATIVE_PATH = "pages/domain/alan-harness-agents-annoyance.domain.md"

const FENCE = "---"

export function bodyBelowFrontmatter(text: string): string {
  const lines = text.replace(/\r\n/g, "\n").split("\n")
  if (lines[0] !== FENCE) return text.trim()
  const closes = lines.slice(1).findIndex((line) => line === FENCE)
  return closes === -1 ? text.trim() : lines.slice(closes + 2).join("\n").trim()
}

export function conductIn(root: string): string {
  const path = `${root}/${CONDUCT_RELATIVE_PATH}`
  let text: string
  try {
    text = readFileSync(path, "utf8")
  } catch (cause) {
    throw new Error(
      `turn-end-reading: the conduct at ${path} could not be read, so this turn end has nothing ` +
        `to be read against: ${cause instanceof Error ? cause.message : String(cause)}`
    )
  }
  const body = bodyBelowFrontmatter(text)
  if (body === "")
    throw new Error(
      `turn-end-reading: ${CONDUCT_RELATIVE_PATH} carries no body below its frontmatter, so it ` +
        "says nothing about what annoys its principal. It is the whole of what a reading is " +
        "taken against, so no turn end is read without it."
    )
  return body
}
