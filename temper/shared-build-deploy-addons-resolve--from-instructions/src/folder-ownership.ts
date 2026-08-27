import { assertNever } from "@shared/utils-narrow/assert-never"

export const OWNERSHIP_MARKER_FILE = "build-id.lua"

export interface FolderProbe {
  readonly dirExists: boolean
  readonly markerPresent: boolean | undefined
}

export type FolderOwnership = "absent" | "temper-owned" | "foreign" | "unknown"

export function decideFolderOwnership(probe: FolderProbe): FolderOwnership {
  if (!probe.dirExists) return "absent"
  if (probe.markerPresent === undefined) return "unknown"
  return probe.markerPresent ? "temper-owned" : "foreign"
}

export function parseFloorFor(providerName: string, dep: string): number | undefined {
  const idx = dep.search(/[<>=]/)
  if (idx === -1) return undefined
  if (dep.slice(0, idx).trim() !== providerName) return undefined
  const rest = dep.slice(idx)
  if (!rest.startsWith(">=")) return undefined
  const version = rest.slice(2).trim()
  if (!/^\d+$/.test(version)) return undefined
  return Number.parseInt(version, 10)
}

export function collectFloorsFor(
  providerName: string,
  fleetDeps: readonly (readonly string[])[]
): readonly number[] {
  const floors: number[] = []
  for (const deps of fleetDeps) {
    for (const dep of deps) {
      const floor = parseFloorFor(providerName, dep)
      if (floor !== undefined) floors.push(floor)
    }
  }
  return floors
}

export function foreignCopySatisfies(
  foreignAddonVersion: number | undefined,
  requiredFloors: readonly number[]
): boolean | undefined {
  if (foreignAddonVersion === undefined) return undefined
  return requiredFloors.every((floor) => floor <= foreignAddonVersion)
}

export type InstallAction = "install" | "skip" | "refuse"

export interface InstallDecision {
  readonly action: InstallAction
  readonly reason: string
}

export function decideInstallAction(
  ownership: FolderOwnership,
  addonName: string,
  foreignSatisfiesFloors: boolean | undefined,
  detail: string
): InstallDecision {
  switch (ownership) {
    case "absent":
      return { action: "install", reason: `no existing ${addonName}/ folder` }
    case "temper-owned":
      return { action: "install", reason: `${addonName}/ carries ${OWNERSHIP_MARKER_FILE}` }
    case "foreign":
      if (foreignSatisfiesFloors === true) {
        return {
          action: "skip",
          reason: `${addonName}/ has no ${OWNERSHIP_MARKER_FILE}, so it was installed by something other than Temper (${detail}). It satisfies every floor this fleet declares, so Temper's copy was NOT installed and the existing folder was left untouched.`,
        }
      }
      if (foreignSatisfiesFloors === false) {
        return {
          action: "refuse",
          reason: `${addonName}/ was installed by something other than Temper (${detail}) and does NOT satisfy every floor this fleet declares. ESO will refuse to load whichever side goes unsatisfied. Refusing to choose silently — resolve the version conflict, then re-run.`,
        }
      }
      return {
        action: "refuse",
        reason: `${addonName}/ was installed by something other than Temper (${detail}) and its '## AddOnVersion:' could not be read, so compatibility is unverifiable. Refusing to delete it or to declare it compatible on missing evidence.`,
      }
    case "unknown":
      return {
        action: "refuse",
        reason: `${addonName}/ could not be read, so its ownership is unknown. Refusing to delete a folder on missing evidence — resolve the read error and re-run.`,
      }
    default:
      return assertNever(ownership)
  }
}
