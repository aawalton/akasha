import {
  createServiceRoleClient,
  type SupabaseServiceRoleClient,
} from "akasha/alan/harness/supabase-server/service-role/service-role.module.code.ts"
import { z } from "zod"

const OPTIONAL_ENV_SCHEMA = z.string().optional()

let client: SupabaseServiceRoleClient | null = null

export function getSupabaseServiceClient(): SupabaseServiceRoleClient {
  if (!client) {
    const internalUrl = OPTIONAL_ENV_SCHEMA.parse(process.env.SUPABASE_INTERNAL_URL)
    const publicUrl = OPTIONAL_ENV_SCHEMA.parse(import.meta.env.VITE_SUPABASE_URL)
    const url = internalUrl ?? publicUrl
    client = createServiceRoleClient({ url })
  }
  return client
}
