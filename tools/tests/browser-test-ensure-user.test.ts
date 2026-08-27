import { describe, expect, it } from "bun:test"
import { USER_ID } from "@shared/supabase-auth/user-id"
import {
  assertCanonicalRotationAllowed,
  assertSafeProvisionTarget,
  DEFAULT_THROWAWAY_EMAIL,
  IDLE_DEV_THROWAWAY_EMAIL,
} from "../lib/browser-test-ensure-user.ts"

const THROWAWAY_UID = "00000000-0000-4000-8000-000000000000"

describe("assertSafeProvisionTarget", () => {
  it("refuses the protected real user (fail-closed against provisioning Alan)", () => {
    expect(() => assertSafeProvisionTarget(USER_ID)).toThrow(/protected real user/)
  })

  it("permits a throwaway uid", () => {
    expect(assertSafeProvisionTarget(THROWAWAY_UID)).toBeUndefined()
  })

  it("permits an arbitrary non-protected uid", () => {
    expect(assertSafeProvisionTarget("11111111-2222-4333-8444-555555555555")).toBeUndefined()
  })
})

describe("DEFAULT_THROWAWAY_EMAIL", () => {
  it("is not a real mailbox domain and is distinct from the protected uid", () => {
    expect(DEFAULT_THROWAWAY_EMAIL).toContain("throwaway")
    expect(DEFAULT_THROWAWAY_EMAIL).not.toBe(USER_ID)
  })

  it("is the canonical browser-test address", () => {
    expect(DEFAULT_THROWAWAY_EMAIL).toBe("browser-test@throwaway.alanwalton.com")
  })
})

describe("assertCanonicalRotationAllowed", () => {
  it("refuses rotating a canonical seeded identity without acknowledgment", () => {
    for (const email of [DEFAULT_THROWAWAY_EMAIL, IDLE_DEV_THROWAWAY_EMAIL]) {
      expect(() =>
        assertCanonicalRotationAllowed({
          email,
          resetPassword: true,
          acknowledgeCanonicalRotation: false,
        })
      ).toThrow(/refusing to rotate the password of canonical seeded identity/)
    }
  })

  it("permits the rotation with a deliberate acknowledgment", () => {
    expect(
      assertCanonicalRotationAllowed({
        email: DEFAULT_THROWAWAY_EMAIL,
        resetPassword: true,
        acknowledgeCanonicalRotation: true,
      })
    ).toBeUndefined()
  })

  it("permits rotating a non-canonical per-run throwaway email", () => {
    expect(
      assertCanonicalRotationAllowed({
        email: "per-run-abc123@throwaway.alanwalton.com",
        resetPassword: true,
        acknowledgeCanonicalRotation: false,
      })
    ).toBeUndefined()
  })

  it("permits a non-rotating resolve of a canonical identity (no reset)", () => {
    expect(
      assertCanonicalRotationAllowed({
        email: DEFAULT_THROWAWAY_EMAIL,
        resetPassword: false,
        acknowledgeCanonicalRotation: false,
      })
    ).toBeUndefined()
  })
})
