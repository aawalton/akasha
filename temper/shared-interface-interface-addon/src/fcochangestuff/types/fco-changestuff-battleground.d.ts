interface MovableControl extends Control {
  SetMovable(movable: boolean): void
}

declare const BATTLEGROUND_HUD_FRAGMENT: {
  readonly control: MovableControl | undefined
  RegisterCallback(
    event: string,
    callback: (this: void, oldState: number, newState: number) => void
  ): void
}

declare const SCENE_FRAGMENT_SHOWN: number
