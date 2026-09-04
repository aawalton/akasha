interface VkBind {
  keyCode: number
  mod1: number
  mod2: number
  mod3: number
  mod4: number
}

interface VkScrollEntry {
  typeId: number
  data: KeybindRowData
}

type VkScrollData = VkScrollEntry[]
