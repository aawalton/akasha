import type { Module } from "@akasha/code-system/module"

export const supabaseServiceClient = {
  id: "01a0640f-8510-7fb7-b3bd-04ccc6376a67",
  pageTypeSlug: "module",
  slug: "supabase-service-client",
  definition: "the Supabase client holding the service role, made once and held",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The address inside the cluster is taken over the one a browser reaches.",
    },
    {
      invariantKind: "departure",
      statement: "The address is read at the first call rather than at load.",
    },
  ],
} as const satisfies Module
