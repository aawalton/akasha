import { describe, expect, test } from "bun:test"
import { isManifestSopsFile, parseFlatRules } from "./discover.ts"

describe("parseFlatRules", () => {
  test("extracts rules with path_regex but no encrypted_regex", () => {
    const yaml = `creation_rules:
  - path_regex: packages/infra/ci/workflows/pipeline-secrets\\.sops\\.yaml$
    age: "age1abc"
  - encrypted_regex: "^(data|stringData)$"
    age: "age1abc"
`
    expect(parseFlatRules(yaml)).toEqual([
      { pathRegex: "packages/infra/ci/workflows/pipeline-secrets\\.sops\\.yaml$" },
    ])
  })

  test("returns empty when config has only manifest rules", () => {
    const yaml = `creation_rules:
  - encrypted_regex: "^(data|stringData)$"
    age: "age1abc"
`
    expect(parseFlatRules(yaml)).toEqual([])
  })

  test("returns empty for missing creation_rules", () => {
    expect(parseFlatRules("")).toEqual([])
    expect(parseFlatRules("foo: bar")).toEqual([])
  })

  test("rule with both path_regex and encrypted_regex is treated as manifest (not flat)", () => {
    const yaml = `creation_rules:
  - path_regex: foo
    encrypted_regex: "^(data)$"
    age: "age1abc"
`
    expect(parseFlatRules(yaml)).toEqual([])
  })

  test("an explicitly null encrypted_regex leaves the rule flat", () => {
    const yaml = `creation_rules:
  - path_regex: foo
    encrypted_regex: null
`
    expect(parseFlatRules(yaml)).toEqual([{ pathRegex: "foo" }])
  })

  test("a bare encrypted_regex key, which yaml reads as null, leaves the rule flat", () => {
    const yaml = `creation_rules:
  - path_regex: foo
    encrypted_regex:
`
    expect(parseFlatRules(yaml)).toEqual([{ pathRegex: "foo" }])
  })

  test("an empty-string encrypted_regex leaves the rule flat", () => {
    const yaml = `creation_rules:
  - path_regex: foo
    encrypted_regex: ""
`
    expect(parseFlatRules(yaml)).toEqual([{ pathRegex: "foo" }])
  })

  test("yaml this cannot parse reads as no flat rules rather than throwing", () => {
    expect(parseFlatRules("foo: [unclosed\n")).toEqual([])
    expect(parseFlatRules("a:\n\t- tabbed\n")).toEqual([])
  })
})

describe("isManifestSopsFile", () => {
  const flatRules = [{ pathRegex: "packages/infra/ci/workflows/pipeline-secrets\\.sops\\.yaml$" }]

  test("file matching a flat rule is NOT a manifest", () => {
    expect(
      isManifestSopsFile("infra/ci-workflows--from-instructions/pipeline-secrets.sops.yaml", flatRules)
    ).toBe(false)
  })

  test("file not matching any flat rule IS a manifest", () => {
    expect(
      isManifestSopsFile(
        "packages/infra/k8s/src/grafana/secrets/grafana-secrets.sops.yaml",
        flatRules
      )
    ).toBe(true)
    expect(isManifestSopsFile("packages/temper/next/deploy/secrets.sops.yaml", flatRules)).toBe(
      true
    )
  })

  test("with no flat rules, every file is a manifest", () => {
    expect(isManifestSopsFile("infra/ci-workflows--from-instructions/pipeline-secrets.sops.yaml", [])).toBe(
      true
    )
  })
})
