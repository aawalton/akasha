declare let LAM2_orderlistbox_widget_OnDragStart:
  | ((this: void, draggedControl: OrderRowControl, mouseButton: number) => undefined)
  | undefined

declare let LAM2_orderlistbox_widget_OnReceiveDrag:
  | ((this: void, draggedOnToControl: OrderRowControl, mouseButton: number) => undefined)
  | undefined
