import { z } from "zod"

export function isSourceRuntime(): boolean {
  return z.string().optional().parse(process.env.WATCHER_RUNTIME) === "source"
}
