import { addonManifestOf } from "./addon-fixture-manifest.module.code.ts"

export function manifestFor(name: string): string {
  return JSON.stringify(addonManifestOf(name))
}
