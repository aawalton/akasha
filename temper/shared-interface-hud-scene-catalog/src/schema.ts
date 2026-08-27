import { z } from "zod"

export const HUD_SCENES = ["hud", "hudui", "loot"] as const
export type HudScene = (typeof HUD_SCENES)[number]

export const HIDE_MECHANISMS = [
  "fragment-group",
  "scene-fragment",
  "SetHiddenForReason",
  "RequestHidden",
  "SetCompassHidden",
  "SetTopLevelHidden",
  "SetSupressed",
  "SuppressTutorialType",
  "RefreshVisibility",
  "SetFloatingMarkerGlobalAlpha",
] as const
export type HideMechanism = (typeof HIDE_MECHANISMS)[number]

export const COMPONENT_KINDS = ["fragment", "non-fragment-control"] as const
export type ComponentKind = (typeof COMPONENT_KINDS)[number]

export const SourceRefSchema = z
  .object({
    file: z.string().min(1),
    line: z.number().int().positive(),
  })
  .strict()
export type SourceRef = z.infer<typeof SourceRefSchema>

export const HudComponentRecordSchema = z
  .object({
    id: z.string().min(1),
    name: z.string().min(1),
    esoGlobal: z.string().min(1),
    kind: z.enum(COMPONENT_KINDS),
    hideMechanism: z.enum(HIDE_MECHANISMS),
    scenes: z.array(z.enum(HUD_SCENES)).readonly(),
    category: z.string().min(1),
    source: SourceRefSchema,
    conditional: z.boolean(),
    wrapsMultiple: z.boolean(),
    grainNotes: z.string().optional(),
  })
  .strict()
export type HudComponentRecord = z.infer<typeof HudComponentRecordSchema>

export const HudSceneCatalogSchema = z.array(HudComponentRecordSchema).readonly()
export type HudSceneCatalog = readonly HudComponentRecord[]
