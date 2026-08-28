import { describe, expect, test } from "bun:test"
import { classifyLogSignature } from "./infra-signature.ts"

describe("classifyLogSignature", () => {
  test("a check whose body never ran is charged to check-tooling", () => {
    const log = [
      "error: Cannot find module '@shared/utils-narrow' from cli-args.ts",
      "[run-check] check-yaml-usage.ts never ran — it exited 1 without producing a verdict. " +
        "Reporting 2 (tool error), not a violation.",
    ].join("\n")
    expect(classifyLogSignature(log)).toBe("check-tooling")
  })

  test("a check the runner could not locate is charged to check-tooling", () => {
    const log =
      "[run-check] check-yaml-usage.ts stands in no tree this runner can reach — not under " +
      "/workspace. Reporting 2 (tool error), not a violation."
    expect(classifyLogSignature(log)).toBe("check-tooling")
  })

  test("a transport fault is still charged to transport", () => {
    const log = "dial tcp: lookup git-transport.git.svc.cluster.local: no such host"
    expect(classifyLogSignature(log)).toBe("transport")
  })

  test("a check that found real violations is charged to nothing", () => {
    const log = [
      "[yaml-usage] Orphan yaml files — no use site in either repository:",
      "  - infra/k8s/src/cloudflared/cloudflared.k8s-secret.sops.yaml",
      "[yaml-usage] 2 orphan(s) of 42 yaml files",
    ].join("\n")
    expect(classifyLogSignature(log)).toBeNull()
  })
})
