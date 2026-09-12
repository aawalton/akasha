import { addonManifestOf } from "akasha/temper/commands/modules/addon-fixture-manifest/addon-fixture-manifest.module.code.ts"

export function manifestFor(name: string): string {
  return JSON.stringify(addonManifestOf(name))
}
