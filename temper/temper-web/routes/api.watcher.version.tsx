import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { WATCHER_DIR } from "../.server/watcher-dir/watcher-dir.module.code.ts"
import type { Route } from "./+types/api.watcher.version"

const VERSION_FILE = join(WATCHER_DIR, "version.txt")

export function loader(_: Route.LoaderArgs): Response {
  if (!existsSync(VERSION_FILE)) {
    return Response.json({ error: "Version not available" }, { status: 404 })
  }

  const version = readFileSync(VERSION_FILE, "utf-8").trim()

  return Response.json({
    version,
    downloadUrl: "/api/watcher/download",
  })
}
