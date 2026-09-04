import type { UpstreamPin } from "../libsets-upstream-pin/libsets-upstream-pin.module.code.ts"

export interface UpstreamProbe {
  readonly checkedOutCommit: string | undefined
  readonly manifestText: string | undefined
  readonly missingFiles: readonly string[]
  readonly bundleMarkerHits: number
  readonly workingTreeDirty: boolean
}

export type UpstreamVerdict =
  | { readonly ok: true }
  | { readonly ok: false; readonly reason: string }

const ADDON_VERSION_FIELD = "addonversion:"

export function parseAddOnVersion(manifestText: string): string | undefined {
  for (const line of manifestText.split(/\r?\n/)) {
    const directive = line.trim()
    if (!directive.startsWith("##")) continue
    const body = directive.slice(2).trim()
    if (!body.toLowerCase().startsWith(ADDON_VERSION_FIELD)) continue
    const value = body.slice(ADDON_VERSION_FIELD.length).trim()
    return value === "" ? undefined : value
  }
  return undefined
}

export function countBundleMarkers(luaText: string): number {
  return luaText.split(/____exports|____lualib/).length - 1
}

function reject(reason: string): UpstreamVerdict {
  return { ok: false, reason }
}

export function verifyUpstream(probe: UpstreamProbe, pin: UpstreamPin): UpstreamVerdict {
  if (probe.bundleMarkerHits > 0) {
    return reject(
      `this tree is our own compiled output, not upstream — found ${probe.bundleMarkerHits} TSTL bundle markers (____exports/____lualib). ` +
        `The live AddOns/${pin.addonSubdir} folder and addons/dist/${pin.addonSubdir} are both this port's build, which installs OVER upstream. Neither can witness what upstream does.`
    )
  }

  if (probe.manifestText === undefined) {
    return reject(`no ${pin.manifestFile} in the tree — cannot establish which version this is`)
  }

  if (probe.missingFiles.length > 0) {
    return reject(
      `tree is missing ${probe.missingFiles.length} required upstream file(s): ${probe.missingFiles.join(", ")}`
    )
  }

  const found = parseAddOnVersion(probe.manifestText)
  if (found === undefined) {
    return reject(`${pin.manifestFile} carries no '## AddOnVersion:' line`)
  }

  if (found !== pin.addOnVersion) {
    return reject(
      `wrong upstream version — tree is AddOnVersion ${found}, pin expects ${pin.addOnVersion} (${pin.version}). ` +
        `Line counts do NOT discriminate here: upstream's branches report identical counts across versions, so only this field does.`
    )
  }

  if (probe.checkedOutCommit === undefined) {
    return reject(
      `cannot prove which commit this tree is — no readable git checkout. Expected ${pin.commit}`
    )
  }

  if (probe.checkedOutCommit !== pin.commit) {
    return reject(
      `wrong upstream commit — tree is at ${probe.checkedOutCommit}, pin expects ${pin.commit}`
    )
  }

  if (probe.workingTreeDirty) {
    return reject(
      `checkout at ${pin.commit} has local modifications, so its bytes are no longer the pinned commit's — discard them and re-materialize`
    )
  }

  return { ok: true }
}
