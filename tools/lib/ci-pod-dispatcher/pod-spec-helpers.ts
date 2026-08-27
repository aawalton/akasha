import { buildContainerName } from "../ci-container-dispatcher/container-name.ts"
import type { CommitSha40 } from "../workflow-dsl/ci-identifiers.ts"
import type { StepConfig } from "./pod-spec-step-config.ts"

export const UNIVERSAL_IMAGE = "debian:bookworm-slim"

export const DEFAULT_NAMESPACE = "ci"

export const CI_SECRET_NAME = "pipeline-engine-secrets"

const COMMIT_SHAPE = /^[0-9a-f]{40}$/

const TOOLCHAIN_ENV = [
  {
    name: "PATH",
    value: "/ci-storage/tools:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
  },
  { name: "LD_LIBRARY_PATH", value: "/ci-storage/tools/lib" },
  { name: "GIT_EXEC_PATH", value: "/ci-storage/tools/git-core" },
  { name: "SSL_CERT_FILE", value: "/ci-storage/tools/ssl/ca-certificates.crt" },
]

export const POD_SECURITY_CONTEXT = {
  runAsUser: 1000,
  runAsGroup: 1000,
  fsGroup: 1000,
}

export function asCommitSha40(sha: string): CommitSha40 | undefined {
  return COMMIT_SHAPE.test(sha) ? (sha as CommitSha40) : undefined
}

export function buildPodName(seq: number, stepName: string, sha: string): string {
  return buildContainerName(String(seq), stepName, sha)
}

export function toolchainEnv(image: string): readonly { name: string; value: string }[] {
  if (image !== UNIVERSAL_IMAGE) return []
  return TOOLCHAIN_ENV
}

export function buildOutputBlock(step: StepConfig): string {
  const depNames = step.dependsOn ?? []
  const outputNames = step.outputs ?? []
  if (depNames.length === 0 && outputNames.length === 0) return ""
  const lines: string[] = [`__out_dir="/ci-storage/outputs/$PIPELINE_SEQ/$WORKFLOW_NAME"`]
  for (const dep of depNames) {
    lines.push(`[ -f "$__out_dir/${dep}.env" ] && . "$__out_dir/${dep}.env"`)
  }
  if (outputNames.length > 0) {
    const printfArgs = outputNames.map((v) => `"${v}=$${v}"`).join(" ")
    lines.push(
      `__write_outputs() { __rc=$?; if [ $__rc -eq 0 ]; then mkdir -p "$__out_dir" && printf '%s\\n' ${printfArgs} > "$__out_dir/$STEP_NAME.env"; fi; return $__rc; }`,
      "trap __write_outputs EXIT"
    )
  }
  return `${lines.join("\n")}\n`
}
