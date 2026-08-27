interface CustomSubMenuEntry {
  label: string
  callback?: (this: void) => void
  disabled?: boolean
}

declare function AddCustomSubMenuItem(
  labelText: string,
  entries: readonly CustomSubMenuEntry[],
  myfont?: string,
  normalColor?: unknown,
  highlightColor?: unknown,
  itemYPad?: number
): number
