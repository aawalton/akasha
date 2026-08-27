declare function ClearCustomScrollableMenu(this: void, owner?: unknown): void

declare function AddCustomScrollableMenuEntry(
  this: void,
  text: string,
  callbackOrEntries?: ((this: void, ...args: unknown[]) => void) | readonly unknown[],
  entryType?: number,
  entries?: readonly unknown[],
  additionalData?: Record<string, unknown>
): unknown

declare function AddCustomScrollableMenuHeader(
  this: void,
  text: string,
  callbackOrEntries?: ((this: void, ...args: unknown[]) => void) | readonly unknown[],
  entryType?: number,
  entries?: readonly unknown[],
  additionalData?: Record<string, unknown>
): unknown

declare function AddCustomScrollableSubMenuEntry(
  this: void,
  text: string,
  entries: readonly unknown[],
  callback?: (this: void, ...args: unknown[]) => void
): unknown

declare function AddCustomScrollableMenuDivider(this: void): void

declare function ShowCustomScrollableMenu(this: void, owner?: unknown, options?: unknown): unknown
