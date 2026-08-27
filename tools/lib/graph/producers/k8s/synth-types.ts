import { z } from "zod"

export type SynthEmitsEdgeType = "synth-emits"
export type RbacAppliesEdgeType = "rbac-applies"
export type SopsSecretEdgeType = "sops-secret"
export type ApplyRbacUsesEdgeType = "applyrbac-uses"
export type SynthGeneratedByEdgeType = "synth-generated-by"
export type SynthRecipeInputEdgeType = "synth-recipe-input"
export type SynthRunsEntryEdgeType = "synth-runs-entry"
export type SynthNamesFileEdgeType = "synth-names-file"

export const SYNTH_EMITS_EDGE_TYPE: SynthEmitsEdgeType = "synth-emits"
export const RBAC_APPLIES_EDGE_TYPE: RbacAppliesEdgeType = "rbac-applies"
export const SOPS_SECRET_EDGE_TYPE: SopsSecretEdgeType = "sops-secret"
export const APPLYRBAC_USES_EDGE_TYPE: ApplyRbacUsesEdgeType = "applyrbac-uses"
export const SYNTH_GENERATED_BY_EDGE_TYPE: SynthGeneratedByEdgeType = "synth-generated-by"
export const SYNTH_RECIPE_INPUT_EDGE_TYPE: SynthRecipeInputEdgeType = "synth-recipe-input"
export const SYNTH_RUNS_ENTRY_EDGE_TYPE: SynthRunsEntryEdgeType = "synth-runs-entry"
export const SYNTH_NAMES_FILE_EDGE_TYPE: SynthNamesFileEdgeType = "synth-names-file"

export type SynthEmitsAttrs = {
  readonly sourcePath: string
}

export type RbacAppliesAttrs = {
  readonly via: "serviceAccountName"
}

export type SopsSecretAttrs = {
  readonly sourcePath: string
}

export type ApplyRbacUsesAttrs = {
  readonly sourcePath: string
}

export type SynthGeneratedByAttrs = Record<string, never>

export type SynthRunsEntryAttrs = {
  readonly path: string
}

export type SynthNamesFileAttrs = {
  readonly path: string
}

export type SynthRecipeInputAttrs = {
  readonly path: string
}

export const SynthEmitsAttrsSchema: z.ZodType<SynthEmitsAttrs> = z
  .object({
    sourcePath: z.string(),
  })
  .passthrough()

export const RbacAppliesAttrsSchema: z.ZodType<RbacAppliesAttrs> = z
  .object({
    via: z.literal("serviceAccountName"),
  })
  .passthrough()

export const SopsSecretAttrsSchema: z.ZodType<SopsSecretAttrs> = z
  .object({
    sourcePath: z.string(),
  })
  .passthrough()

export const ApplyRbacUsesAttrsSchema: z.ZodType<ApplyRbacUsesAttrs> = z
  .object({
    sourcePath: z.string(),
  })
  .passthrough()

export type SynthDiscoveredManifest = {
  readonly sourcePath: string
  readonly apiVersion: string | null
  readonly kind: string
  readonly namespace: string | null
  readonly name: string
  readonly serviceAccountName: string | null
}
