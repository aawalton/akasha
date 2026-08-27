import { mkdir } from "node:fs/promises"
import { join } from "node:path"
import { PORCELAIN_STATUS_ARGS, parsePorcelainStatusZ } from "@infra/git-porcelain/parse-status"
import { addonUpstreamDir } from "@temper/shared-foundation-misc-eso-paths/eso-paths"
import { $ } from "bun"
import { LIBSETS_UPSTREAM, type UpstreamPin } from "./upstream-pin"
import { countBundleMarkers, type UpstreamProbe, verifyUpstream } from "./verify-upstream"

export interface UpstreamPaths {
  readonly checkoutRoot: string
  readonly addonDir: string
}

export function upstreamPaths(pin: UpstreamPin): UpstreamPaths {
  const checkoutRoot = join(addonUpstreamDir(), pin.checkoutDirName)
  return { checkoutRoot, addonDir: join(checkoutRoot, pin.addonSubdir) }
}

async function headCommit(dir: string): Promise<string | undefined> {
  const result = await $`git -C ${dir} rev-parse HEAD`.quiet().nothrow()
  return result.exitCode === 0 ? result.stdout.toString().trim() : undefined
}

async function materialize(pin: UpstreamPin, paths: UpstreamPaths): Promise<undefined> {
  if ((await headCommit(paths.checkoutRoot)) === pin.commit) return

  await mkdir(paths.checkoutRoot, { recursive: true })
  await $`git -C ${paths.checkoutRoot} init -q`.quiet()
  await $`git -C ${paths.checkoutRoot} remote remove origin`.quiet().nothrow()
  await $`git -C ${paths.checkoutRoot} remote add origin ${pin.repo}`.quiet()

  const fetched = await $`git -C ${paths.checkoutRoot} fetch --depth 1 -q origin ${pin.commit}`
    .quiet()
    .nothrow()
  if (fetched.exitCode !== 0) {
    throw new Error(
      `could not fetch ${pin.commit} from ${pin.repo}: ${fetched.stderr.toString().trim()}`
    )
  }
  await $`git -C ${paths.checkoutRoot} -c advice.detachedHead=false checkout -q --force ${pin.commit}`.quiet()
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
  const status = await $`git -C ${paths.checkoutRoot} ${PORCELAIN_STATUS_ARGS}`.quiet().nothrow()
  const parsed = parsePorcelainStatusZ(status.stdout.toString())
  const dirty = status.exitCode !== 0 || !parsed.ok || parsed.entries.length > 0

  return {
    checkedOutCommit: await headCommit(paths.checkoutRoot),
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
  await materialize(pin, paths)

  const verdict = verifyUpstream(await probeUpstream(pin, paths), pin)
  if (!verdict.ok) {
    throw new Error(
      `refusing to read ${paths.addonDir} as upstream ${pin.version}: ${verdict.reason}\n` +
        `Re-materialize with: bun scripts/fetch-upstream.ts (from the lib-sets package dir)`
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
