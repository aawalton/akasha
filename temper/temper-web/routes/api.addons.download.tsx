import { existsSync, statSync } from "node:fs"
import { join } from "node:path"
import { ADDONS_BUNDLE_DIR } from "../.server/addons-bundle-dir/addons-bundle-dir.module.code.ts"
import type { Route } from "./+types/api.addons.download"

const BUNDLE_FILE = join(ADDONS_BUNDLE_DIR, "temper-addons.zip")

export function loader(_: Route.LoaderArgs): Response {
  if (!existsSync(BUNDLE_FILE)) {
    return Response.json({ error: "Addon bundle not available" }, { status: 404 })
  }

  const stat = statSync(BUNDLE_FILE)
  const file = Bun.file(BUNDLE_FILE)

  return new Response(file, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": 'attachment; filename="temper-addons.zip"',
      "Content-Length": String(stat.size),
    },
  })
}
