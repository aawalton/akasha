interface Control {
  SetResizeToFitPadding(paddingX: number, paddingY: number): void
}

interface TextureControl {
  SetDesaturation(desaturation: number): void
}

interface BackdropControl {
  SetEdgeTexture(texture: string | undefined, width: number, height: number): void
}

interface TimelineAnimation {
  SetPlaybackType(this: TimelineAnimation, playbackType: number, maxLoopCount: number): void
  SetHandler(
    this: TimelineAnimation,
    event: string,
    handler: ((...args: unknown[]) => void) | undefined
  ): void
}
