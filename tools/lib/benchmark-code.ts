import {
  buildToolchainProvisionScript,
  buildToolchainVerifyScript,
} from "@akasha/ci-benchmark/benchmark-provision"

import * as reportTypesHere from "./benchmark/report-types.ts"
import * as runCoreHere from "./benchmark/run-core.ts"

export type BenchmarkPhase = "cold-stage" | "warm-prep" | "check"

export type StoreVariant = "disk" | "memory"

export interface StepTiming {
  readonly name: string
  readonly phase: BenchmarkPhase
  readonly durationMs: number
  readonly exitCode: number
  readonly image: string
  readonly skipped: boolean
}

export interface InnerReport {
  readonly node: string
  readonly store: StoreVariant
  readonly targetSha: string
  readonly wallClockMs: number
  readonly steps: readonly StepTiming[]
  readonly preludeExcludedFromColdStage: true
}

interface RunCoreModule {
  readonly BENCHMARK_STEP_CONCURRENCY: number
  readonly BENCHMARK_REPORT_SENTINEL: string
}

interface ReportTypesModule {
  readonly InnerReportSchema: { readonly parse: (value: unknown) => InnerReport }
  readonly StoreVariantSchema: { readonly parse: (value: unknown) => StoreVariant }
}

interface ProvisionModule {
  readonly buildToolchainProvisionScript: () => readonly string[]
  readonly buildToolchainVerifyScript: () => readonly string[]
}

export async function runCore(): Promise<RunCoreModule> {
  return runCoreHere
}

export async function reportTypes(): Promise<ReportTypesModule> {
  return reportTypesHere
}

export async function provision(): Promise<ProvisionModule> {
  return { buildToolchainProvisionScript, buildToolchainVerifyScript }
}
