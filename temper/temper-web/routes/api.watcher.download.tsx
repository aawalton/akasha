import { existsSync, statSync } from "node:fs"
import { join } from "node:path"
import { WATCHER_DIR } from "../.server/watcher-dir/watcher-dir.module.code.ts"
import type { Route } from "./+types/api.watcher.download"

const EXE_FILE = join(WATCHER_DIR, "temper-watcher.exe")

export function loader(_: Route.LoaderArgs): Response {
  if (!existsSync(EXE_FILE)) {
    return Response.json({ error: "Watcher exe not available" }, { status: 404 })
  }

  const stat = statSync(EXE_FILE)
  const file = Bun.file(EXE_FILE)

  return new Response(file, {
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": 'attachment; filename="temper-watcher.exe"',
      "Content-Length": String(stat.size),
    },
  })
}
