import { describe, expect, test } from "bun:test"
import {
  type ChecksumSubstitutionStep,
  findLiveObjectHashLine,
  findSkipGateLine,
  findStampedChecksumKeys,
  scanChecksumSubstitutionReachability,
} from "./checksum-substitution-reachability.ts"

const SKIP_CHECK = [
  'CONTENT_HASH="abc123456789"',
  "CURRENT_HASH=$(kubectl get configmap example-pipeline-state -n example -o jsonpath='{.metadata.annotations.pipeline\\.alanwalton\\.com/content-hash}' 2>/dev/null || echo \"\")",
  'if [ "$CURRENT_HASH" = "$CONTENT_HASH" ]; then echo "Content hash unchanged, skipping"; exit 0; fi',
]

const LIVE_SECRET_HASH =
  "S3_CREDS_HASH=$(kubectl get secret loki-s3-creds -n loki -o jsonpath='{.data.access_key}{.data.secret_key}' | md5sum | cut -d' ' -f1)"

const S3_CREDS_SED =
  'sed "s|checksum/s3-creds:.*|checksum/s3-creds: \\"${S3_CREDS_HASH}\\"|" gen/deployment.generated.yaml | kubectl apply -n loki -f -'

function step(name: string, commands: readonly string[]): ChecksumSubstitutionStep {
  return {
    workflow: "example",
    sourcePath: "packages/infra/example/foundation.workflow.ts",
    step: name,
    commands: ["set -e", ...commands],
  }
}

describe("scanChecksumSubstitutionReachability — fires on a stranded substitution", () => {
  test("flags the loki-shaped defect: live secret hash behind the skip gate", () => {
    const v = scanChecksumSubstitutionReachability([
      step("loki-apply-deployment", [...SKIP_CHECK, LIVE_SECRET_HASH, S3_CREDS_SED]),
    ])
    expect(v).toHaveLength(1)
    expect(v[0]?.kind).toBe("checksum-substitution-skip-gated")
    expect(v[0]?.step).toBe("loki-apply-deployment")
    expect(v[0]?.file).toBe("packages/infra/example/foundation.workflow.ts")
    expect(v[0]?.keys).toEqual(["checksum/s3-creds"])
    expect(v[0]?.liveRead).toBe(LIVE_SECRET_HASH)
  })

  test("a live CONFIGMAP read counts too, not only secrets", () => {
    const v = scanChecksumSubstitutionReachability([
      step("apply-deployment", [
        ...SKIP_CHECK,
        "CONFIG_HASH=$(kubectl get configmap cloudflared-config -n cloudflared -o jsonpath='{.data.config\\.yaml}' | md5sum | cut -d' ' -f1)",
        'sed "s|checksum/config:.*|checksum/config: \\"${CONFIG_HASH}\\"|" gen/d.yaml | kubectl apply -f -',
      ]),
    ])
    expect(v.map((x) => x.keys)).toEqual([["checksum/config"]])
  })

  test("cloudflared's gate spelling is recognized — no CONTENT_HASH assignment at all", () => {
    const v = scanChecksumSubstitutionReachability([
      step("apply-deployment", [
        "LIVE_HASH=$(kubectl get configmap cloudflared-config -n cloudflared -o jsonpath='{.metadata.annotations.pipeline\\.alanwalton\\.com/content-hash}' 2>/dev/null || true)",
        'if [ "$LIVE_HASH" = "abc123456789" ]; then echo "[skip] matches live configmap"; exit 0; fi',
        "CONFIG_HASH=$(kubectl get configmap cloudflared-config -n cloudflared -o jsonpath='{.data.config\\.yaml}' | md5sum | cut -d' ' -f1)",
        'sed "s|checksum/config:.*|checksum/config: \\"${CONFIG_HASH}\\"|" gen/d.yaml | kubectl apply -f -',
      ]),
    ])
    expect(v).toHaveLength(1)
  })

  test("every key the step stamps is named, so the fix has no second half to miss", () => {
    const v = scanChecksumSubstitutionReachability([
      step("loki-apply-deployment", [
        ...SKIP_CHECK,
        "LOKI_HASH=$(kubectl get configmap loki-config -n loki -o jsonpath='{.data.loki\\.yaml}' | md5sum | cut -d' ' -f1)",
        LIVE_SECRET_HASH,
        'sed -e "s|checksum/config:.*|checksum/config: \\"${LOKI_HASH}\\"|" -e "s|checksum/s3-creds:.*|checksum/s3-creds: \\"${S3_CREDS_HASH}\\"|" gen/d.yaml | kubectl apply -f -',
      ]),
    ])
    expect(v[0]?.keys).toEqual(["checksum/config", "checksum/s3-creds"])
  })

  test("each stranded step is reported separately", () => {
    const v = scanChecksumSubstitutionReachability([
      step("apply-a", [...SKIP_CHECK, LIVE_SECRET_HASH, S3_CREDS_SED]),
      step("apply-b", [...SKIP_CHECK, LIVE_SECRET_HASH, S3_CREDS_SED]),
    ])
    expect(v.map((x) => x.step)).toEqual(["apply-a", "apply-b"])
  })
})

describe("scanChecksumSubstitutionReachability — clean when the substitution can run", () => {
  test("the seaweedfs precedent: a live-object hash in an UNgated step", () => {
    expect(
      scanChecksumSubstitutionReachability([
        step("seaweedfs-apply-s3-gateway", [
          "S3_CONFIG_HASH=$(kubectl get secret seaweedfs-creds -n seaweedfs -o jsonpath='{.data.s3-config\\.json}' | md5sum | cut -d' ' -f1)",
          'sed "s|checksum/s3-config:.*|checksum/s3-config: \\"${S3_CONFIG_HASH}\\"|" gen/s3-gateway.generated.yaml | kubectl apply -n seaweedfs -f -',
        ]),
      ])
    ).toEqual([])
  })

  test("the grafana precedent: a gated step hashing repo-resident subjects", () => {
    expect(
      scanChecksumSubstitutionReachability([
        step("grafana-apply-manifests", [
          ...SKIP_CHECK,
          "GRAFANA_HASH=$(cat gen/datasources-configmap.generated.yaml /tmp/dash.yaml | md5sum | cut -d' ' -f1)",
          "SECRET_HASH=$(sops -d secrets/grafana-secrets.sops.yaml | md5sum | cut -d' ' -f1)",
          'sed "s|checksum/config:.*|checksum/config: \\"${GRAFANA_HASH}\\"|" gen/d.yaml \\',
          '  | sed "s|checksum/grafana-secrets:.*|checksum/grafana-secrets: \\"${SECRET_HASH}\\"|" \\',
          "  | kubectl apply -n grafana -f -",
        ]),
      ])
    ).toEqual([])
  })

  test("the promtail precedent: a gated step hashing a regenerated repo file", () => {
    expect(
      scanChecksumSubstitutionReachability([
        step("loki-apply-promtail", [
          ...SKIP_CHECK,
          "kubectl apply -n loki -f gen/promtail-configmap.generated.yaml",
          "PROMTAIL_HASH=$(md5sum gen/promtail-configmap.generated.yaml | cut -d' ' -f1)",
          'sed "s|checksum/config:.*|checksum/config: \\"${PROMTAIL_HASH}\\"|" gen/promtail-daemonset.generated.yaml | kubectl apply -f -',
        ]),
      ])
    ).toEqual([])
  })

  test("a gated step with no checksum sed at all is not this rule's business", () => {
    expect(
      scanChecksumSubstitutionReachability([
        step("apply-secrets", [
          ...SKIP_CHECK,
          "SECRET_HASH=$(kubectl get secret example -n example -o jsonpath='{.data.k}' | md5sum | cut -d' ' -f1)",
          "kubectl apply -n example -f gen/secret.generated.yaml",
        ]),
      ])
    ).toEqual([])
  })

  test("the gate's own live read is not a hash source — it digests nothing", () => {
    expect(findLiveObjectHashLine(SKIP_CHECK)).toBeNull()
  })
})

describe("reachability detector seams", () => {
  test("findSkipGateLine returns the gate line, or null when the step always runs", () => {
    expect(findSkipGateLine(SKIP_CHECK)).toBe('CONTENT_HASH="abc123456789"')
    expect(findSkipGateLine(["set -e", "kubectl apply -f gen/d.yaml"])).toBeNull()
  })

  test("findLiveObjectHashLine accepts the plural and `cm` spellings", () => {
    expect(
      findLiveObjectHashLine(["H=$(kubectl get secrets a -n b -o json | md5sum)"])
    ).not.toBeNull()
    expect(
      findLiveObjectHashLine(["H=$(kubectl get cm a -n b -o json | sha256sum)"])
    ).not.toBeNull()
  })

  test("findStampedChecksumKeys ignores a sed on an unrelated key", () => {
    expect(findStampedChecksumKeys(['sed "s|image:.*|image: x|" gen/d.yaml'])).toEqual([])
    expect(findStampedChecksumKeys([S3_CREDS_SED])).toEqual(["checksum/s3-creds"])
  })

  test("a multiline command is split, so a gate and a sed inside one entry both count", () => {
    const v = scanChecksumSubstitutionReachability([
      step("apply", [[...SKIP_CHECK, LIVE_SECRET_HASH, S3_CREDS_SED].join("\n")]),
    ])
    expect(v).toHaveLength(1)
  })
})
