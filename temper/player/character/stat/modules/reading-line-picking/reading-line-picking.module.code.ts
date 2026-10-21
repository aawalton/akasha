import { z } from "zod"

const lineShape = z.object({
  id: z.string(),
  buildHash: z.string(),
  bar: z.enum(["frontBar", "backBar"]),
  reading: z.looseObject({ capturedAt: z.number() }),
})

export type Line = z.infer<typeof lineShape>

export function stampOf(capturedAt: number): string {
  const iso = new Date(capturedAt * 1000).toISOString()
  return `${iso.slice(0, 10)}-${iso.slice(11, 13)}${iso.slice(14, 16)}`
}

export function linesOf(text: string): readonly Line[] {
  const lines: Line[] = []
  for (const one of text.split("\n")) {
    if (one.trim() === "") continue
    const parsed = lineShape.safeParse(JSON.parse(one))
    if (parsed.success) lines.push(parsed.data)
  }
  return lines
}

export function isPicked(line: Line, pick: string): boolean {
  return String(line.reading.capturedAt) === pick || line.id.startsWith(pick)
}

export function newestOf(lines: readonly Line[]): Line | undefined {
  return lines.reduce<Line | undefined>(
    (newest, one) =>
      newest === undefined || one.reading.capturedAt > newest.reading.capturedAt ? one : newest,
    undefined
  )
}
