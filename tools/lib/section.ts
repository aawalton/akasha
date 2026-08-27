
import { type Section, sections } from "./markdown.ts"

export function sectionNamed(guideBody: string, title: string): Section | null {
  return sections(guideBody, 1).find((s) => s.title === title) ?? null
}

export function trimEdges(text: string): string {
  const lines = text.split("\n")
  let from = 0
  let to = lines.length
  while (from < to && (lines[from] ?? "").trim() === "") from += 1
  while (to > from && (lines[to - 1] ?? "").trim() === "") to -= 1
  return lines.slice(from, to).join("\n")
}
