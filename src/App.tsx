import React, { useState, useCallback } from "react"
import { NavCtx, ResultMeta } from "./components/kit"
import { Login, Home } from "./screens/auth-home"
import {
  DispatchList, DispatchAssigned, OrderDetail, PickupForm, PickedList, VoidOrder,
} from "./screens/dispatch-pickup"
import {
  LoadScanOk, LoadScanErrors, SealHandover, Port, DriverBoard, DriverTasks,
  Signing, Weigh, InventoryStates, PendingUpload, PrintTools, Profile,
} from "./screens/ops"
import {
  Unload, Billing, WaybillQuery, Expense, Fuel, Fault, Commission, Vehicle,
  Unsigned, StockCount, Payment, SlaAlerts, DocUpload, Exception, Repackage,
} from "./screens/more"
import {
  OpsDispatch, DriverOff, DeliveryLoad, CargoPhoto, Picking, Reconcile,
  GenerateBill, Settings, Contacts, SiteUpdate, LogUpload, PickupConfig,
} from "./screens/more2"
import {
  CounterShip, BillAndLoad, VehicleCargo, AssetCount, GateCheckin,
  VehicleInspect, Unseal,
} from "./screens/more3"
import { ResultOk, ResultOffline, ChannelHandover } from "./screens/more4"
import {
  PrintLabel, PrintSku, PrintTest, OutboundPrint, Departure,
} from "./screens/more5"

const routes: Record<string, React.ReactNode> = {
  login: <Login />,
  home: <Home />,
  dispatch: <DispatchList />,
  dispatchAssigned: <DispatchAssigned />,
  orderDetail: <OrderDetail />,
  pickup: <PickupForm />,
  pickedList: <PickedList />,
  voidOrder: <VoidOrder />,
  loadScan: <LoadScanOk />,
  loadScanErr: <LoadScanErrors />,
  seal: <SealHandover />,
  port: <Port />,
  driverBoard: <DriverBoard />,
  driverTasks: <DriverTasks />,
  signing: <Signing />,
  weigh: <Weigh />,
  inventory: <InventoryStates />,
  pending: <PendingUpload />,
  print: <PrintTools />,
  profile: <Profile />,
  unload: <Unload />,
  billing: <Billing />,
  query: <WaybillQuery />,
  expense: <Expense />,
  fuel: <Fuel />,
  fault: <Fault />,
  commission: <Commission />,
  vehicle: <Vehicle />,
  unsigned: <Unsigned />,
  stockCount: <StockCount />,
  payment: <Payment />,
  slaAlerts: <SlaAlerts />,
  docUpload: <DocUpload />,
  exception: <Exception />,
  repackage: <Repackage />,
  opsDispatch: <OpsDispatch />,
  driverOff: <DriverOff />,
  deliveryLoad: <DeliveryLoad />,
  cargoPhoto: <CargoPhoto />,
  picking: <Picking />,
  reconcile: <Reconcile />,
  genBill: <GenerateBill />,
  settings: <Settings />,
  contacts: <Contacts />,
  siteUpdate: <SiteUpdate />,
  logUpload: <LogUpload />,
  pickupConfig: <PickupConfig />,
  counterShip: <CounterShip />,
  billAndLoad: <BillAndLoad />,
  vehicleCargo: <VehicleCargo />,
  assetCount: <AssetCount />,
  gateCheckin: <GateCheckin />,
  vehicleInspect: <VehicleInspect />,
  unseal: <Unseal />,
  resultOk: <ResultOk />,
  resultOffline: <ResultOffline />,
  channelHandover: <ChannelHandover />,
  printLabel: <PrintLabel />,
  printSku: <PrintSku />,
  printTest: <PrintTest />,
  outboundPrint: <OutboundPrint />,
  departure: <Departure />,
}

export default function App() {
  const [stack, setStack] = useState<string[]>(["login"])
  const [meta, setMeta] = useState<ResultMeta | undefined>(undefined)
  const current = stack[stack.length - 1]

  const go = useCallback((r: string, m?: ResultMeta) => {
    if (!routes[r]) return
    setMeta(m)
    setStack((s) => (s[s.length - 1] === r ? s : [...s, r]))
    // scroll active screen to top on navigation
    requestAnimationFrame(() => {
      document.querySelector(".pda-scroll")?.scrollTo({ top: 0 })
    })
  }, [])

  const back = useCallback(() => {
    setStack((s) => (s.length > 1 ? s.slice(0, -1) : s))
  }, [])

  return (
    <NavCtx.Provider value={{ go, back, meta }}>
      <div className="flex h-[100dvh] items-center justify-center bg-[#2a2331]">
        {routes[current]}
      </div>
    </NavCtx.Provider>
  )
}
