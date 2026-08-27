import { codeModule } from "./code-import.ts"

const DEPLOYABLES = "@temper/shared-build-deploy-addons-resolve/deployables"
const ESO_PATHS = "@temper/shared-foundation-misc-eso-paths-resolve"

interface Deployables {
  readonly listDeployables: (opts?: {
    readonly repoRoot: string
  }) => readonly { readonly name: string }[]
}

interface EsoPaths {
  readonly addonsDir: () => string
}

export function deployables(): Promise<Deployables> {
  return codeModule<Deployables>(DEPLOYABLES)
}

export function esoPaths(): Promise<EsoPaths> {
  return codeModule<EsoPaths>(ESO_PATHS)
}

