import { PoolConfigSchema } from "@akasha/inference-pool/pool-config"

export type { PoolConfig, PoolService } from "@akasha/inference-pool/pool-config"

export async function trafficCopPoolConfigSchema(): Promise<typeof PoolConfigSchema> {
  return PoolConfigSchema
}
