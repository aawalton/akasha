import { z } from "zod"

export const InferenceHostSchema = z
  .object({
    name: z.string().min(1),
    address: z.string().min(1),
    user: z.string().min(1),
    keyPath: z.string().min(1),
    home: z.string().min(1),
    condaSh: z.string().min(1),
  })
  .strict()
export type InferenceHost = z.infer<typeof InferenceHostSchema>

export const InferenceServiceSchema = z
  .object({
    name: z.string().regex(/^[a-z0-9][a-z0-9-]*$/, "service name must be kebab-case"),
    host: z.string().min(1),
    pythonVersion: z.string().min(1),
    sourceDir: z.string().min(1),
    workdir: z.string().min(1),
    command: z.array(z.string().min(1)).min(1).readonly(),
    port: z.number().int().positive(),
    lifecycle: z.enum(["pool", "always-on"]).default("pool"),
    internalPort: z.number().int().positive().optional(),
    publicBind: z.enum(["tailnet", "loopback"]).default("tailnet"),
    warm: z.boolean().default(false),
  })
  .strict()
  .refine(
    (s) => (s.lifecycle === "pool" ? s.internalPort !== undefined : s.internalPort === undefined),
    {
      message: 'a "pool" service must declare internalPort; an "always-on" service must not',
      path: ["internalPort"],
    }
  )
  .refine((s) => (s.warm ? s.lifecycle === "pool" : true), {
    message: 'a "warm" service must be a "pool" service (only pool members are cop-managed)',
    path: ["warm"],
  })
export type InferenceService = z.infer<typeof InferenceServiceSchema>

export const ManagedEnvSchema = z
  .object({
    name: z.string().regex(/^[a-z0-9][a-z0-9-]*$/, "managed-env name must be kebab-case"),
    host: z.string().min(1),
    pythonVersion: z.string().min(1),
  })
  .strict()
export type ManagedEnv = z.infer<typeof ManagedEnvSchema>

export const ActualResourceSchema = z
  .object({
    name: z.string().min(1),
    dirPresent: z.boolean(),
    inputsHash: z.string().nullable(),
    launchdLoaded: z.boolean(),
    condaEnvPresent: z.boolean(),
    condaEnvHealthy: z.boolean(),
  })
  .strict()
export type ActualResource = z.infer<typeof ActualResourceSchema>

export type ApplyReason = "absent" | "stale-or-partial" | "corrupt"

export interface ApplyAction {
  readonly kind: "apply"
  readonly service: InferenceService
  readonly inputsHash: string
  readonly reason: ApplyReason
}

export interface SkipAction {
  readonly kind: "skip"
  readonly service: InferenceService
  readonly inputsHash: string
}

export interface PruneAction {
  readonly kind: "prune"
  readonly name: string
}

export interface ReconcilePlan {
  readonly apply: readonly ApplyAction[]
  readonly skip: readonly SkipAction[]
  readonly prune: readonly PruneAction[]
}
