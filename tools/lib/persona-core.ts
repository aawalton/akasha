import { codeModule } from "./code-import.ts"

const CORE = "packages/alanwalton/personas/core/src/index.ts"

export interface RenderTarget {
  readonly aspect: string
  readonly width: number
  readonly height: number
}

export interface ImageName {
  readonly slug: string
  readonly level: number
  readonly timestamp: string
}

export interface LadderLevel {
  readonly stage: string
  readonly closeness: string
  readonly wardrobe: string
  readonly pose: string
}

export interface WallpaperCandidate {
  readonly slug: string
  readonly level: number
  readonly path: string
}

export interface Ledger {
  readonly netBytes: number
  readonly greenDayTotal: number
  readonly wallpaperCount: number
  readonly spent: number
  readonly balance: number
  readonly level: number
  readonly stage: string
  readonly percentProgress: number
  readonly nextWallpaperDeficit: number
}

export interface WallpaperInstallPlan {
  readonly writePath: string
  readonly deletePaths: readonly string[]
}

export interface WallpaperImageRecord {
  readonly where: readonly Readonly<Record<string, unknown>>[]
  readonly set: Readonly<Record<string, unknown>>
}

export interface CanonicalImageClass {
  readonly bucket: "personas" | "explore" | "generated"
  readonly category: string
  readonly persona?: string
  readonly grade?: string
  readonly tags: readonly string[]
  readonly title: string
  readonly imageRoot: string
  readonly relative: string
}

export interface NamedRoot {
  readonly tag: string
  readonly root: string
}

export interface PersonaCore {
  readonly LEVELS: readonly LadderLevel[]
  readonly WALLPAPER_RENDER_TARGET: RenderTarget

  readonly toPersonaSlug: (title: string) => string
  readonly buildImageName: (input: {
    readonly slug: string
    readonly level: number
    readonly date: Date
    readonly ext?: string
  }) => string
  readonly parseImageName: (filename: string) => ImageName | null
  readonly parseImageTimestamp: (timestamp: string) => Date | null

  readonly buildSceneScaffold: (input: {
    readonly closeness: string
    readonly wardrobe: string
    readonly pose: string
  }) => string
  readonly assembleTransformationPrompt: (input: {
    readonly keepContract: string
    readonly scene: string
    readonly renderTarget: RenderTarget
  }) => string
  readonly clampLevel: (level: number) => number

  readonly classifyCanonicalImage: (
    absolutePath: string,
    roots: readonly NamedRoot[]
  ) => CanonicalImageClass | null

  readonly selectWallpaper: (
    candidates: readonly WallpaperCandidate[],
    filter: { readonly agent?: string; readonly level?: number },
    pickIndex: (n: number) => number
  ) => WallpaperCandidate | null
  readonly selectFollowWallpaper: (
    candidates: readonly WallpaperCandidate[],
    currentLevel: number
  ) => WallpaperCandidate | null
  readonly computeLedger: (input: {
    readonly netBytes: number
    readonly wallpaperCount: number
    readonly greenDayPoints?: number
  }) => Ledger
  readonly planWallpaperInstall: (input: {
    readonly dirEntries: readonly string[]
    readonly wallpaperDir: string
    readonly slug: string
    readonly level: number
    readonly newName: string
  }) => WallpaperInstallPlan
  readonly buildWallpaperImageRecord: (input: {
    readonly personaSlug: string
    readonly personaTitle: string
    readonly level: number
    readonly stage: string
    readonly esoDay: string
    readonly imagePath: string
    readonly imageRoot?: string
  }) => WallpaperImageRecord

  readonly greenDayUnits: (points: number, greenDayPoints?: number) => number
}

export async function personaCore(): Promise<PersonaCore> {
  return await codeModule<PersonaCore>(CORE)
}
