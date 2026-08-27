
import { describe, expect, it } from "bun:test"
import { decideSkillTokenGuard, leadingSkillSlug } from "../lib/skill-token-guard.ts"

describe("leadingSkillSlug", () => {
  it("extracts the leading slash-token slug", () => {
    expect(leadingSkillSlug("/p #14425 do the thing")).toBe("p")
    expect(leadingSkillSlug("/videos")).toBe("videos")
    expect(leadingSkillSlug("/amy-calendar route this")).toBe("amy-calendar")
  })

  it("leading whitespace is tolerated before the slash", () => {
    expect(leadingSkillSlug("  /p #14425")).toBe("p")
  })

  it("no leading slash → null (prose prompt)", () => {
    expect(leadingSkillSlug("You are worker-14450, run ops helper load …")).toBeNull()
  })

  it("mid-text /p reference is NOT a leading token → null (aura/awen: did not husk)", () => {
    expect(leadingSkillSlug("Continue the work; the /p skill was retired")).toBeNull()
  })

  it("an absolute path leading token is not a skill slug → null", () => {
    expect(leadingSkillSlug("/tmp/brief-14450.txt has the details")).toBeNull()
    expect(leadingSkillSlug("/home/walton/code")).toBeNull()
  })

  it("empty / whitespace-only prompt → null", () => {
    expect(leadingSkillSlug("")).toBeNull()
    expect(leadingSkillSlug("   ")).toBeNull()
  })
})

describe("decideSkillTokenGuard", () => {
  it("every leading slash-token is rejected, because nothing loads a skill", () => {
    expect(decideSkillTokenGuard("/deliver #14425").kind).toBe("reject")
    expect(decideSkillTokenGuard("/anything").kind).toBe("reject")
    expect(decideSkillTokenGuard("/videos").kind).toBe("reject")
  })

  it("retired skill /p → reject naming the role-skill replacement", () => {
    const d = decideSkillTokenGuard("/p #14425 do the thing")
    expect(d.kind).toBe("reject")
    if (d.kind === "reject") {
      expect(d.reason).toContain("/manage (parent project) or /deliver (child project)")
      expect(d.reason).toContain("/p")
    }
  })

  it("retired skill /amy-calendar → reject naming the routed document", () => {
    const d = decideSkillTokenGuard("/amy-calendar what's on my calendar")
    expect(d.kind).toBe("reject")
    if (d.kind === "reject") {
      expect(d.reason).toContain("Calendar Management")
      expect(d.reason).toContain("/amy-calendar")
    }
  })

  it("retired skill /domain → reject naming the `lead` role", () => {
    const d = decideSkillTokenGuard("/domain own the persona points-source migration")
    expect(d.kind).toBe("reject")
    if (d.kind === "reject") {
      expect(d.reason).toContain("/lead")
      expect(d.reason).toContain("/domain")
    }
  })

  it("retired skill /images → reject naming the routed document", () => {
    const d = decideSkillTokenGuard("/images make a picture of a maple leaf")
    expect(d.kind).toBe("reject")
    if (d.kind === "reject") {
      expect(d.reason).toContain("ops inference generate --help")
      expect(d.reason).toContain("/images")
    }
  })

  it("a slug with no replacement entry → reject with generic guidance", () => {
    const d = decideSkillTokenGuard("/bogus-skill go")
    expect(d.kind).toBe("reject")
    if (d.kind === "reject") {
      expect(d.reason).toContain("/bogus-skill")
      expect(d.reason).not.toContain("/manage (parent project) or /deliver (child project)")
    }
  })

  it("mid-text /p reference → allow (leading token only)", () => {
    expect(decideSkillTokenGuard("Continue; the /p skill was retired")).toEqual({ kind: "allow" })
  })

  it("non-slash prose prompt → allow", () => {
    expect(decideSkillTokenGuard("You are worker-14450, run ops helper load …")).toEqual({
      kind: "allow",
    })
  })

  it("empty prompt (idle revive) → allow", () => {
    expect(decideSkillTokenGuard("")).toEqual({ kind: "allow" })
  })
})
