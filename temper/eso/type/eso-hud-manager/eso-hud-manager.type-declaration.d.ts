interface HudManager {
  RegisterCallback: (this: HudManager, event: string, callback: (this: void) => void) => void
}

declare const HUD_MANAGER: HudManager | undefined
