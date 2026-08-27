interface LabelControl {
  SetText(text: string | undefined): void
}

interface Control {
  SetHandler(
    event: "OnMouseDown",
    handler: (
      self: Control,
      button: number,
      ctrl: boolean,
      alt: boolean,
      shift: boolean,
      command: boolean
    ) => void
  ): void
}
