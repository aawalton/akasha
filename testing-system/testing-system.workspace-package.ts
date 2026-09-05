import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const testingSystem = {
  id: "01a04ee7-be05-75c4-ba3c-3fd73f943961",
  pageTypeSlug: "workspace-package",
  slug: "testing-system",
  definition: "what a test sets up to try something, and what it takes away after",
  manifest: "json",
  partSlugs: [
    "domain/test",
    "domain/test-fixture",
    "module/declaring",
    "module/minting",
    "module/bodying",
    "module/waiting",
    "module/walking",
    "module/putting",
    "module/dom-guarding",
    "module/dom-guard-setting",
    "module/dom-registering",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Scaffolding a test sets up is not the thing under test.",
    },
    {
      invariantKind: "departure",
      statement: "What the tests of more than one system need is here.",
    },
    {
      invariantKind: "departure",
      statement: "What one module's tests need is in fixtures beside that module.",
    },
    {
      invariantKind: "departure",
      statement:
        "A fixture beside a module reaches for what is here rather than spelling it again.",
    },
    {
      invariantKind: "departure",
      statement: "What is here is reached by tests alone.",
    },
    {
      invariantKind: "departure",
      statement:
        "A module the running system reaches for belongs to the system that runs the module.",
    },
    {
      invariantKind: "absence",
      statement: "No test is written here.",
    },
    {
      invariantKind: "absence",
      statement: "What is here is set up by the tests that reach for what is here.",
    },
    {
      invariantKind: "absence",
      statement: "A fixture proving itself proves nothing about the system.",
    },
  ],
} as const satisfies WorkspacePackage
