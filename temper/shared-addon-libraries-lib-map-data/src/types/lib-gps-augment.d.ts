interface LibGps3 {
  LocalToGlobal: (x: number, y: number) => LuaMultiReturn<[globalX: number, globalY: number]>
}
