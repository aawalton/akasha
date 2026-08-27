export const rescanInventoryHolder: { fn: ((this: void) => void) | undefined } = { fn: undefined }

export function setRescanInventoryRef(fn: () => void): undefined {
  rescanInventoryHolder.fn = fn
}
