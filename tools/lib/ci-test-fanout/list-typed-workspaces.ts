#!/usr/bin/env bun

import { loadTestStepInputs } from "../../../akasha/checks/cluster-checks/modules/test-step-loading/test-step-loading.module.code.ts"
import {
  findTestBearingRoots,
  TEST_TYPES,
  type TestType,
} from "../../../akasha/checks/cluster-checks/modules/test-step-paths/test-step-paths.module.code.ts"

function isTestType(value: string): value is TestType {
  return TEST_TYPES.some((t) => t === value)
}

function main(argv: readonly string[]): undefined {
  const [repoRoot, testType] = argv
  if (repoRoot === undefined || testType === undefined) {
    console.error("[list-typed-workspaces] usage: <repo-root> <test-type>")
    process.exit(1)
  }
  if (!isTestType(testType)) {
    console.error(`[list-typed-workspaces] invalid test-type: ${testType}`)
    process.exit(1)
  }
  const { workspaces, testsByType } = loadTestStepInputs(repoRoot)
  const files = testsByType[testType]
  const roots = findTestBearingRoots(
    files,
    workspaces.map((w) => w.root)
  )
  for (const r of roots) process.stdout.write(`${r}\n`)
}

if (import.meta.main) {
  main(Bun.argv.slice(2))
}
