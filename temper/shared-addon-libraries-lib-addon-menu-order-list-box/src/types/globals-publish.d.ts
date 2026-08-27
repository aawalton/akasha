declare let LAM2_orderlistbox_widget_OnDragStart:
  | ((this: void, draggedControl: import("../types").OrderRowControl, mouseButton: number) => void)
  | undefined
declare let LAM2_orderlistbox_widget_OnReceiveDrag:
  | ((
      this: void,
      draggedOnToControl: import("../types").OrderRowControl,
      mouseButton: number
    ) => void)
  | undefined
