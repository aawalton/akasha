import { mkdir } from "node:fs/promises"
import { join } from "node:path"
import { PORCELAIN_STATUS_ARGS, parsePorcelainStatusZ } from "@akasha/git/porcelain-status"
import { addonUpstreamDir } from "@akasha/temper-eso-paths/eso-paths"
import { ran } from "@akasha/utils-run/running"
import {
  LIBSETS_UPSTREAM,
  type UpstreamPin,
} from "../libsets-upstream-pin/libsets-upstream-pin.module.code.ts"
import {
  countBundleMarkers,
  type UpstreamProbe,
  verifyUpstream,
} from "../libsets-upstream-verify/libsets-upstream-verify.module.code.ts"

export interface UpstreamPaths {
  readonly checkoutRoot: string
  readonly addonDir: string
}

export function upstreamPaths(pin: UpstreamPin): UpstreamPaths {
  const checkoutRoot = join(addonUpstreamDir(), pin.checkoutDirName)
  return { checkoutRoot, addonDir: join(checkoutRoot, pin.addonSubdir) }
}

function git(dir: string, argv: readonly string[]): { code: number; out: string; err: string } {
  return ran(["git", "-C", dir, ...argv])
}

function headCommit(dir: string): string | undefined {
  const done = git(dir, ["rev-parse", "HEAD"])
  return done.code === 0 ? done.out.trim() : undefined
}

export async function materializeUpstream(
  pin: UpstreamPin,
  paths: UpstreamPaths
): Promise<undefined> {
  if (headCommit(paths.checkoutRoot) === pin.commit) return

  await mkdir(paths.checkoutRoot, { recursive: true })
  git(paths.checkoutRoot, ["init", "-q"])
  git(paths.checkoutRoot, ["remote", "remove", "origin"])
  git(paths.checkoutRoot, ["remote", "add", "origin", pin.repo])

  const fetched = git(paths.checkoutRoot, ["fetch", "--depth", "1", "-q", "origin", pin.commit])
  if (fetched.code !== 0) {
    throw new Error(`could not fetch ${pin.commit} from ${pin.repo}: ${fetched.err.trim()}`)
  }
  git(paths.checkoutRoot, [
    "-c",
    "advice.detachedHead=false",
    "checkout",
    "-q",
    "--force",
    pin.commit,
  ])
}

export async function probeUpstream(
  pin: UpstreamPin,
  paths: UpstreamPaths
): Promise<UpstreamProbe> {
  const missingFiles: string[] = []
  let bundleMarkerHits = 0

  for (const rel of [...pin.requiredFiles, "LibSets.lua"]) {
    const file = Bun.file(join(paths.addonDir, rel))
    if (!(await file.exists())) {
      if (rel !== "LibSets.lua") missingFiles.push(rel)
      continue
    }
    bundleMarkerHits += countBundleMarkers(await file.text())
  }

  const manifest = Bun.file(join(paths.addonDir, pin.manifestFile))
  const status = git(paths.checkoutRoot, [...PORCELAIN_STATUS_ARGS])
  const parsed = parsePorcelainStatusZ(status.out)
  const dirty = status.code !== 0 || !parsed.ok || parsed.entries.length > 0

  return {
    checkedOutCommit: headCommit(paths.checkoutRoot),
    manifestText: (await manifest.exists()) ? await manifest.text() : undefined,
    missingFiles,
    bundleMarkerHits,
    workingTreeDirty: dirty,
  }
}

export async function resolveVerifiedUpstream(
  pin: UpstreamPin = LIBSETS_UPSTREAM
): Promise<string> {
  const paths = upstreamPaths(pin)
  await materializeUpstream(pin, paths)

  const verdict = verifyUpstream(await probeUpstream(pin, paths), pin)
  if (!verdict.ok) {
    throw new Error(
      `refusing to read ${paths.addonDir} as upstream ${pin.version}: ${verdict.reason}`
    )
  }
  return paths.addonDir
}

if (import.meta.main) {
  const dir = await resolveVerifiedUpstream()
  console.error(
    `verified upstream LibSets ${LIBSETS_UPSTREAM.version} (AddOnVersion ${LIBSETS_UPSTREAM.addOnVersion}) at ${LIBSETS_UPSTREAM.commit}`
  )
  console.log(dir)
}
