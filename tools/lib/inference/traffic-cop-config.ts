import { PoolConfigSchema } from "@infra/inference/src/services/traffic-cop/config"

export type { PoolConfig, PoolService } from "@infra/inference/src/services/traffic-cop/config"

export async function trafficCopPoolConfigSchema(): Promise<typeof PoolConfigSchema> {
  return PoolConfigSchema
}
