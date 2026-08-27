interface LamOrderListBoxUtil {
  GetStringFromValue(this: void, value: import("../types").StringValue): string | number
  GetDefaultValue<T>(this: void, value: import("../types").Valued<T>): T
  CreateLabelAndContainerControl(
    this: void,
    parent: import("../types").LamControl,
    controlData: import("../types").OrderListBoxData,
    controlName: string
  ): import("../types").LamControl
  GetTopPanel(this: void, panel: import("../types").LamControl): import("../types").LamControl
  UpdateWarning(this: void, control: import("../types").LamControl): void
  RequestRefreshIfNeeded(this: void, control: import("../types").LamControl): void
  RegisterForRefreshIfNeeded(this: void, control: import("../types").LamControl): void
  RegisterForReloadIfNeeded(this: void, control: import("../types").LamControl): void
  CreateFAQTexture(this: void, control: import("../types").LamControl): Control | undefined
}

interface LibAddonMenu2Lib {
  util: LamOrderListBoxUtil
  RegisterWidget(this: LibAddonMenu2Lib, widgetType: string, widgetVersion: number): boolean
}

declare const LibAddonMenu2: LibAddonMenu2Lib

interface LamCreateControlRegistry {
  orderlistbox?: (
    this: void,
    parent: import("../types").LamControl,
    orderListBoxData: import("../types").OrderListBoxData,
    controlName?: string
  ) => import("../types").LamControl
}

declare const LAMCreateControl: LamCreateControlRegistry
