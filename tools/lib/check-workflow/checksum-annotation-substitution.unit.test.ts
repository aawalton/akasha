import { describe, expect, test } from "bun:test"
import {
  type ChecksumAnnotationScanFile,
  findChecksumAnnotationEmits,
  isChecksumScanPath,
  scanChecksumAnnotationSubstitution,
} from "./checksum-annotation-substitution.ts"

const PACKAGE_ROOTS = [
  "infra/example",
  "infra/elsewhere",
  "infra/lib",
  "infra/seaweedfs",
  "infra/k8s",
  "infra/cluster-checks",
] as const

function scan(files: readonly ChecksumAnnotationScanFile[]) {
  return scanChecksumAnnotationSubstitution(files, PACKAGE_ROOTS)
}

function synth(key: string, value = "placeholder"): ChecksumAnnotationScanFile {
  return {
    path: "infra/example/k8s/synth.ts",
    content: `export function deploymentYaml(): string {
  return toYaml({
    spec: { template: { metadata: { annotations: { "${key}": "${value}" } } } },
  })
}
`,
  }
}

function sedStep(key: string, path = "infra/example/src/foundation.workflow.ts") {
  return {
    path,
    content: `const applyDeployment = step({
  commands: () => [
    'sed "s|${key}:.*|${key}: \\\\"\${HASH}\\\\"|" gen/deployment.generated.yaml | kubectl apply -f -',
  ],
})
`,
  }
}

describe("scanChecksumAnnotationSubstitution — clean when the idiom is complete", () => {
  test("an emit with a matching sed is satisfied", () => {
    expect(scan([synth("checksum/config"), sedStep("checksum/config")])).toEqual([])
  })

  test("a sed in a .sh file counts as a substitution site", () => {
    const shell: ChecksumAnnotationScanFile = {
      path: "infra/example/lib/deploy-functions.sh",
      content: `apply_tunnel_config() {
  local config_hash
  config_hash=$(md5sum "$configmap" | cut -d' ' -f1)
  sed "s|checksum/config:.*|checksum/config: \\"\${config_hash}\\"|" "$deployment" | kubectl apply -f -
}
`,
    }
    expect(scan([synth("checksum/config"), shell])).toEqual([])
  })

  test("the sed may sit anywhere inside the emitter's package, not just beside it", () => {
    expect(
      scan([
        synth("checksum/s3-config"),
        sedStep("checksum/s3-config", "infra/example/deep/nested/foundation.workflow.ts"),
      ])
    ).toEqual([])
  })

  test("a non-literal value is not a constant, so it needs no substitution", () => {
    const computed: ChecksumAnnotationScanFile = {
      path: "infra/example/k8s/synth.ts",
      content:
        'const a = { annotations: { "checksum/config": configHash } }\n' +
        'const b = { annotations: { "checksum/other": `${configHash}` } }\n',
    }
    expect(findChecksumAnnotationEmits([computed])).toEqual([])
    expect(scan([computed])).toEqual([])
  })
})

describe("scanChecksumAnnotationSubstitution — pairing is scoped to the emitter's package", () => {
  test("a foreign package's sed for the same key satisfies nothing", () => {
    expect(
      scan([
        synth("checksum/config"),
        sedStep("checksum/config", "infra/elsewhere/src/foundation.workflow.ts"),
      ]).map((v) => v.key)
    ).toEqual(["checksum/config"])
  })

  test("the @infra/lib legacy shell seds cannot hold the gate green on their own", () => {
    const legacyShell: ChecksumAnnotationScanFile = {
      path: "infra/lib/deploy-functions.sh",
      content:
        '  sed "s|checksum/config:.*|checksum/config: \\"${config_hash}\\"|" "$deployment" | kubectl apply -n infra -f -\n',
    }
    expect(scan([synth("checksum/config"), legacyShell]).map((v) => v.key)).toEqual([
      "checksum/config",
    ])
  })

  test("the nearest package wins, so a nested package does not borrow its parent's sed", () => {
    const nestedEmit: ChecksumAnnotationScanFile = {
      path: "infra/example/vendor/inner/k8s/synth.ts",
      content: '{ annotations: { "checksum/config": "placeholder" } }\n',
    }
    const parentSed = sedStep(
      "checksum/config",
      "infra/example/src/grafana/foundation.workflow.ts"
    )
    expect(
      scanChecksumAnnotationSubstitution(
        [nestedEmit, parentSed],
        [...PACKAGE_ROOTS, "infra/example/vendor/inner"]
      ).map((v) => v.key)
    ).toEqual(["checksum/config"])
  })
})

describe("scanChecksumAnnotationSubstitution — one substitution site per emit", () => {
  function service(name: string, key = "checksum/config"): ChecksumAnnotationScanFile {
    return {
      path: `infra/k8s/src/${name}/synth.ts`,
      content: `const d = { annotations: { "${key}": "placeholder" } }\n`,
    }
  }

  function serviceSed(name: string, key = "checksum/config"): ChecksumAnnotationScanFile {
    return {
      path: `infra/k8s/src/${name}/foundation.workflow.ts`,
      content: `const s = step({
  commands: () => [
    'sed "s|${key}:.*|${key}: \\\\"\${HASH}\\\\"|" gen/d.yaml | kubectl apply -f -',
  ],
})
`,
    }
  }

  test("three services each carrying their own sed are clean", () => {
    expect(
      scan([
        service("buildkit"),
        service("cloudflared"),
        service("grafana"),
        serviceSed("buildkit"),
        serviceSed("cloudflared"),
        serviceSed("grafana"),
      ])
    ).toEqual([])
  })

  test("one service losing its sed reds, and it is the one named", () => {
    const v = scan([
      service("buildkit"),
      service("cloudflared"),
      service("grafana"),
      serviceSed("cloudflared"),
      serviceSed("grafana"),
    ])
    expect(v.map((x) => x.file)).toEqual(["infra/k8s/src/buildkit/synth.ts"])
  })

  test("two services losing their seds red together, both named", () => {
    const v = scan([
      service("buildkit"),
      service("cloudflared"),
      service("grafana"),
      serviceSed("cloudflared"),
    ])
    expect(v.map((x) => x.file)).toEqual([
      "infra/k8s/src/buildkit/synth.ts",
      "infra/k8s/src/grafana/grafana.cluster-service.code.attachment.ts",
    ])
  })

  test("a sed line spelling its key twice is one site, not two", () => {
    expect(
      scan([service("buildkit"), service("cloudflared"), serviceSed("cloudflared")])
    ).toHaveLength(1)
  })

  test("an under-covered group is not told that nothing substitutes its key", () => {
    const undercovered = scan([
      service("buildkit"),
      service("cloudflared"),
      serviceSed("cloudflared"),
    ])
    const unsubstituted = scan([service("buildkit")])
    expect(unsubstituted[0]?.message).toContain("substitutes that key at apply time")
    expect(undercovered[0]?.message).not.toContain("substitutes that key at apply time")
  })

  test("two workloads whose seds share one file each need their own line", () => {
    const emits: ChecksumAnnotationScanFile = {
      path: "infra/loki-service/k8s/synth.ts",
      content:
        '{ annotations: { "checksum/config": "placeholder" } }\n' +
        '{ annotations: { "checksum/config": "placeholder" } }\n',
    }
    const oneSed: ChecksumAnnotationScanFile = {
      path: "infra/loki-service/foundation.workflow.ts",
      content: '  sed "s|checksum/config:.*|checksum/config: x|" a.yaml\n',
    }
    const twoSeds: ChecksumAnnotationScanFile = {
      path: "infra/loki-service/foundation.workflow.ts",
      content:
        '  sed "s|checksum/config:.*|checksum/config: x|" a.yaml\n' +
        '  sed "s|checksum/config:.*|checksum/config: x|" b.yaml\n',
    }
    const roots = [...PACKAGE_ROOTS, "infra/loki-service"]
    expect(scanChecksumAnnotationSubstitution([emits, oneSed], roots)).toHaveLength(1)
    expect(scanChecksumAnnotationSubstitution([emits, twoSeds], roots)).toEqual([])
  })

  test("a spare sed for one key does not cover a shortfall on another", () => {
    const v = scan([
      service("buildkit", "checksum/config"),
      serviceSed("buildkit", "checksum/creds"),
      serviceSed("cloudflared", "checksum/creds"),
    ])
    expect(v.map((x) => x.key)).toEqual(["checksum/config"])
  })
})

describe("scanChecksumAnnotationSubstitution — fires on a constant annotation", () => {
  test("flags the seaweedfs defect: an emit with no sed anywhere", () => {
    const v = scan([
      {
        path: "infra/seaweedfs/synth-deployments.ts",
        content: `const d = {
  template: { metadata: { annotations: { "checksum/s3-config": "placeholder" } } },
}
`,
      },
      {
        path: "infra/seaweedfs/src/foundation.workflow.ts",
        content: `const s = step({
  commands: () => ["kubectl apply --server-side -n seaweedfs -f gen/s3-gateway.generated.yaml"],
})
`,
      },
    ])
    expect(v).toHaveLength(1)
    expect(v[0]?.kind).toBe("checksum-annotation-unsubstituted")
    expect(v[0]?.key).toBe("checksum/s3-config")
    expect(v[0]?.file).toBe("infra/seaweedfs/synth-deployments.ts")
    expect(v[0]?.line).toBe(2)
  })

  test("matching is per-key: a checksum/config sed does not satisfy checksum/s3-config", () => {
    const v = scan([synth("checksum/s3-config"), sedStep("checksum/config")])
    expect(v.map((x) => x.key)).toEqual(["checksum/s3-config"])
  })

  test("and not in the other direction either — no substring credit anywhere", () => {
    const v = scan([synth("checksum/config"), sedStep("checksum/s3-config")])
    expect(v.map((x) => x.key)).toEqual(["checksum/config"])
  })

  test("a differently-prefixed key does not satisfy the real one", () => {
    const v = scan([synth("checksum/config"), sedStep("my-checksum/config")])
    expect(v.map((x) => x.key)).toEqual(["checksum/config"])
  })

  test("each unsubstituted emit is reported separately", () => {
    const v = scan([
      {
        path: "infra/example/k8s/synth.ts",
        content:
          '{ annotations: { "checksum/config": "placeholder" } }\n' +
          '{ annotations: { "checksum/other": "placeholder" } }\n',
      },
    ])
    expect(v.map((x) => `${x.key}@${x.line}`)).toEqual(["checksum/config@1", "checksum/other@2"])
  })
})

describe("scanChecksumAnnotationSubstitution — prose never counts", () => {
  test("the real electric doc comment describing its sed does not satisfy the key", () => {
    const docComment: ChecksumAnnotationScanFile = {
      path: "infra/k8s/src/electric/synth.ts",
      content: `/**
 * Pod-template annotation \`checksum/electric-secrets: bootstrap\` is a
 * sentinel the foundation workflow rewrites at apply time
 * (\`sed s|checksum/electric-secrets:.*|...|\`) to roll the pod when the
 * secret changes.
 */
const d = { annotations: { "checksum/electric-secrets": "bootstrap" } }
`,
    }
    expect(scan([docComment]).map((v) => v.key)).toEqual(["checksum/electric-secrets"])
  })

  test("a commented-out sed line does not satisfy the key, in .ts or in .sh", () => {
    const tsComment: ChecksumAnnotationScanFile = {
      path: "infra/example/src/foundation.workflow.ts",
      content: '// sed "s|checksum/config:.*|checksum/config: \\"$HASH\\"|" deployment.yaml\n',
    }
    const shComment: ChecksumAnnotationScanFile = {
      path: "infra/example/lib/deploy-functions.sh",
      content: '  # sed "s|checksum/config:.*|checksum/config: \\"$hash\\"|" "$deployment"\n',
    }
    for (const commented of [tsComment, shComment]) {
      expect(scan([synth("checksum/config"), commented])).toHaveLength(1)
    }
  })

  test("markdown is never scanned — a doc describing the sed satisfies nothing", () => {
    const doc: ChecksumAnnotationScanFile = {
      path: "infra/example/docs/k8s-deployment-patterns.md",
      content: 'sed -i "s|checksum/config: .*|checksum/config: \\"$HASH\\"|" deployment.yaml\n',
    }
    expect(scan([synth("checksum/config"), doc])).toHaveLength(1)
  })

  test("a test file is neither an emit site nor a substitution site", () => {
    const testFile: ChecksumAnnotationScanFile = {
      path: "infra/example/k8s/synth-deployments.unit.test.ts",
      content: `test("stamps the sentinel", () => {
  expect(yaml()).toContain('"checksum/config": "placeholder"')
  expect(cmds()).toContain('sed "s|checksum/config:.*|checksum/config: x|"')
})
`,
    }
    expect(findChecksumAnnotationEmits([testFile])).toEqual([])
    expect(scan([synth("checksum/config"), testFile])).toHaveLength(1)
  })

  test("the gate's own package is ineligible, so its fixtures contribute nothing", () => {
    const ownFixture: ChecksumAnnotationScanFile = {
      path: "infra/cluster-checks/src/checks/check-checksum-annotation-substitution.ts",
      content: `const FIXTURE = '{ "checksum/config": "placeholder" }'
const SED = 'sed "s|checksum/config:.*|checksum/config: x|"'
`,
    }
    expect(isChecksumScanPath(ownFixture.path)).toBe(false)
    expect(findChecksumAnnotationEmits([ownFixture])).toEqual([])
    expect(scan([ownFixture])).toEqual([])
  })

  test("blanking comments preserves line numbers of later emits", () => {
    const withHeader: ChecksumAnnotationScanFile = {
      path: "infra/example/k8s/synth.ts",
      content: `/**
 * A block comment
 * spanning several lines.
 */
// and a line comment
const d = { annotations: { "checksum/config": "placeholder" } }
`,
    }
    expect(findChecksumAnnotationEmits([withHeader]).map((e) => e.line)).toEqual([6])
  })
})
