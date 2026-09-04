import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { ADDONS_BUNDLE_DIR } from "../.server/addons-bundle-dir/addons-bundle-dir.module.code.ts"
import type { Route } from "./+types/api.addons.version"

const VERSION_FILE = join(ADDONS_BUNDLE_DIR, "version.txt")

export function loader(_: Route.LoaderArgs): Response {
  if (!existsSync(VERSION_FILE)) {
    return Response.json({ error: "Addon bundle version not available" }, { status: 404 })
  }

  const version = readFileSync(VERSION_FILE, "utf-8").trim()

  return Response.json({
    version,
    downloadUrl: "/api/addons/download",
  })
}
