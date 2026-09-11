export function alterPointsDisplay(
  this: void,
  countFirst: (this: void) => undefined,
  drawn: (this: void, ...args: never[]) => void
): undefined {
  countFirst()
  ZO_PostHook(GAMEPAD_SKILLS, "RefreshPointsDisplay", drawn)
}
