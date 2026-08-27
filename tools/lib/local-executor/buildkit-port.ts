import { z } from "zod"

export function buildkitPort(): number {
  const host = z.string().optional().parse(process.env.BUILDKIT_HOST)
  if (host === undefined) return 1234
  const match = z
    .tuple([z.string(), z.string()])
    .nullable()
    .parse(host.match(/:(\d+)$/))
  return Number.parseInt(match?.[1] ?? "1234", 10)
}
