import { afterEach, expect, test } from "bun:test"
import {
  runStatusline,
  sandbox,
  SELF_AGENT_ID,
  teardown,
  writeSeatPage,
} from "./statusline-drive.ts"

afterEach(teardown, 10_000)

test("renders the task after the initiative", () => {
  const { home } = sandbox()
  writeSeatPage(home, SELF_AGENT_ID, [
    "persona-slug: amy",
    "domain-slug: alan",
    "role-slug: handler",
    "task-slug: handle-inbound",
    "initiative-slug: quiet-inbox",
  ])

  const out = runStatusline(home, "cccccccc-0000-1111-2222-333333333333", SELF_AGENT_ID)

  expect(out.trim()).toBe("[0] amy alan handler quiet-inbox handle-inbound")
})

test("omits the work token the seat page does not carry", () => {
  const { home } = sandbox()
  writeSeatPage(home, SELF_AGENT_ID, [
    "persona-slug: amy",
    "initiative-slug: quiet-inbox",
    "task-slug: handle-inbound",
  ])

  const out = runStatusline(home, "cccccccc-4444-5555-6666-777777777777", SELF_AGENT_ID)

  expect(out.trim()).toBe("[0] amy quiet-inbox handle-inbound")
})
