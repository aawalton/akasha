import type { z } from "zod"
import { codeModule } from "../code-import.ts"

const TRAFFIC_COP_CONFIG = "packages/infra/inference/src/services/traffic-cop/config.ts"

export interface PoolService {
  readonly name: string
  readonly publicPort: number
  readonly publicHost: "0.0.0.0" | "127.0.0.1"
  readonly internalPort: number
  readonly launchdLabel: string
}

export interface PoolConfig {
  readonly adminPort: number
  readonly warmSet: readonly string[]
  readonly services: readonly PoolService[]
}

interface TrafficCopConfig {
  readonly PoolConfigSchema: z.ZodType<PoolConfig>
}

export async function trafficCopPoolConfigSchema(): Promise<z.ZodType<PoolConfig>> {
  return (await codeModule<TrafficCopConfig>(TRAFFIC_COP_CONFIG)).PoolConfigSchema
}
