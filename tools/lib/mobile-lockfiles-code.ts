import * as refreshLockfilesModuleSource from "../../alanwalton/mobile-cli/src/mobile/refresh-lockfiles.ts"


export type RefreshLockfiles = typeof refreshLockfilesModuleSource

export async function refreshLockfilesModule(): Promise<RefreshLockfiles> {
  return refreshLockfilesModuleSource
}
