interface WindowManager {
  CreateControlFromVirtual<T extends Control = Control>(
    name: string | undefined,
    parent: Control | undefined,
    virtualName: string
  ): T
}
