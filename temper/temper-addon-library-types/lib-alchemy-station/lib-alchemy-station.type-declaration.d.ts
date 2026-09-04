interface LibAlchemyStationTabData {
  name: number | string
  descriptor: string
  normal: string
  pressed: string
  highlight: string
  disabled: string
  callback: (this: void) => undefined
}

interface LibAlchemyStationLib {
  Init: () => undefined
  AddTab: (tabData: LibAlchemyStationTabData) => Control
  GetSelectedTab: () => string
  SelectTab: (descriptor: string) => undefined
}
