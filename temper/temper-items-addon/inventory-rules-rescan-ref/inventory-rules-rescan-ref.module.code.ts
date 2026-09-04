export const RESCAN_INVENTORY_HOLDER: { fn: ((this: void) => void) | undefined } = { fn: undefined }

export function setRescanInventoryRef(fn: () => void): undefined {
  RESCAN_INVENTORY_HOLDER.fn = fn
}
