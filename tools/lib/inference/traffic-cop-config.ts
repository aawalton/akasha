import { PoolConfigSchema } from "../../../infra/inference/src/services/traffic-cop/config.ts"

export type {
  PoolConfig,
  PoolService,
} from "../../../infra/inference/src/services/traffic-cop/config.ts"

export async function trafficCopPoolConfigSchema(): Promise<typeof PoolConfigSchema> {
  return PoolConfigSchema
}
