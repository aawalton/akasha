import { listDeployables } from "@temper/shared-build-deploy-addons-resolve/deployables"
import { addonsDir } from "@temper/shared-foundation-misc-eso-paths-resolve"

interface Deployables {
  readonly listDeployables: typeof listDeployables
}

interface EsoPaths {
  readonly addonsDir: typeof addonsDir
}

export function deployables(): Promise<Deployables> {
  return Promise.resolve({ listDeployables })
}

export function esoPaths(): Promise<EsoPaths> {
  return Promise.resolve({ addonsDir })
}

