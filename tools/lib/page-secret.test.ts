import { describe, expect, test } from "bun:test"
import { secretAt } from "@akasha/pages-system/page-file-name"
import { sidecarFor } from "./page-secret.ts"

const MARKDOWN_SECRET = "pages/secret/tailnet-egress-auth.secret.md"

const AKASHA_ACCOUNT =
  "akasha/agents-system/claude-accounts/pages/aawalton/aawalton.claude-account.ts"

describe("the sops file standing beside a page", () => {
  test("a markdown page's sops file is named as it always was", () => {
    expect(sidecarFor(MARKDOWN_SECRET)).toBe("pages/secret/tailnet-egress-auth.secret.sops.yaml")
  })

  /**
   * This is the repair. `sidecarFor` asked whether the name ended `.md` and answered `null` where it
   * did not, so every one of the 9 pages carrying a `.sops.yaml` beside a `.ts` file read as a page
   * with no secret — a failure that came back as a true empty. It is the second copy of the question
   * `sidecarsOf` was repaired of in `page/sidecar/sidecar.ts`.
   */
  test("an akasha page's sops file is named rather than answered as none", () => {
    expect(sidecarFor(AKASHA_ACCOUNT)).toBe(
      "akasha/agents-system/claude-accounts/pages/aawalton/aawalton.claude-account.sops.yaml"
    )
  })

  test("the akasha name is the one akasha itself states, not a second spelling of it", () => {
    expect(sidecarFor(AKASHA_ACCOUNT)).toBe(secretAt(AKASHA_ACCOUNT))
  })

  test("a whole name is carried across rather than three characters sliced off it", () => {
    expect(sidecarFor(AKASHA_ACCOUNT)).not.toContain(".ts.")
    expect(sidecarFor(AKASHA_ACCOUNT)).toContain("aawalton.claude-account.")
  })

  test("a path naming no page of either kind is refused rather than answered", () => {
    expect(sidecarFor("pages/secret/tailnet-egress-auth")).toBeNull()
    expect(sidecarFor("README")).toBeNull()
    expect(sidecarFor("infra/k8s/src/grafana/grafana.k8s-secret.sops.yaml")).toBeNull()
  })
})
