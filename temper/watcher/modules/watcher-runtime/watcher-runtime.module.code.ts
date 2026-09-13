import { z } from "zod"

type Env = Readonly<Record<string, string | undefined>>

export function isSourceRuntime(env: Env = process.env): boolean {
  return z.string().optional().parse(env.WATCHER_RUNTIME) === "source"
}
