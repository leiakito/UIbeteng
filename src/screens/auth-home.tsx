import React, { useState } from "react"
import { Device, Icons, Card, Entry, Field, Btn, Sample, useNav, IconKey, Tone } from "../components/kit"

/* -------------------- Login -------------------- */
export function Login() {
  const nav = useNav()
  return (
    <Device>
      <div className="flex min-h-full flex-col bg-gradient-to-b from-brand to-brand-deep px-6 pb-8 pt-14 text-white">
        <div className="mb-10">
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/15">
            <Icons.box size={30} />
          </div>
          <h1 className="mt-4 text-[26px] font-black">百腾供应链</h1>
          <p className="text-[13px] text-white/70">PDA 物流作业系统 · v3.2.1</p>
        </div>

        <div className="space-y-4 rounded-3xl bg-white p-5 text-ink">
          <div>
            <div className="mb-1 text-[13px] text-ink-2">服务选择</div>
            <div className="flex min-h-[46px] items-center justify-between rounded-xl border border-line px-3">
              <span className="text-[15px]">正式环境 · 华东节点</span>
              <Icons.chevronDown size={18} className="text-ink-3" />
            </div>
          </div>
          <Field label="用户名" value="zhang.wei" />
          <Field label="密码" value="••••••••" />
          <div className="flex items-center justify-between text-[13px]">
            <span className="flex items-center gap-2 text-ink-2">
              <span className="grid h-5 w-5 place-items-center rounded bg-brand text-white">
                <Icons.check size={13} strokeWidth={3} />
              </span>
              记住密码
            </span>
            <span className="flex items-center gap-1 text-ok">
              <Icons.check size={14} strokeWidth={2.5} /> 登录状态：保持
            </span>
          </div>
          <button
            onClick={() => nav.go("home")}
            className="flex min-h-[48px] w-full items-center justify-center rounded-xl bg-brand text-[16px] font-bold text-white active:opacity-90"
          >
            登 录
          </button>
        </div>
        <p className="mt-auto pt-8 text-center text-[12px] text-white/60">
          示例账号数据 <Sample />
        </p>
      </div>
    </Device>
  )
}

/* -------------------- Home shell -------------------- */
function DeviceStatus() {
  return (
    <div className="flex items-center gap-2 text-[12px]">
      <span className="flex items-center gap-1 rounded-md bg-white/15 px-1.5 py-0.5 text-white">
        <Icons.bluetooth size={13} /> 已连接
      </span>
      <span className="flex items-center gap-1 rounded-md bg-white/15 px-1.5 py-0.5 text-white">
        <Icons.wifi size={13} /> 在线
      </span>
    </div>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <div className="mb-1 mt-4 px-1 text-[13px] font-bold text-ink-2 first:mt-0">{children}</div>
}

type EntryDef = { icon: IconKey; label: string; badge?: number; tone?: Tone; to?: string }

function Grid({ items }: { items: EntryDef[] }) {
  return (
    <div className="grid grid-cols-3 gap-1">
      {items.map((it) => (
        <Entry key={it.label} {...it} />
      ))}
    </div>
  )
}

/* group -> sections of entries */
const groups: { name: string; sections: { name: string; items: EntryDef[] }[] }[] = [
  {
    name: "常用",
    sections: [
      {
        name: "我的常用（可编辑）",
        items: [
          { icon: "clipboard", label: "调度管理", badge: 6, tone: "info", to: "dispatch" },
          { icon: "box", label: "揽件", to: "pickup" },
          { icon: "truck", label: "装车", to: "loadScan" },
          { icon: "scan", label: "卸车", tone: "info", to: "unload" },
          { icon: "sign", label: "派送签收", tone: "ok", to: "signing" },
          { icon: "print", label: "打印标签", tone: "warn", to: "printLabel" },
          { icon: "scale", label: "称重/量体", tone: "ok", to: "weigh" },
          { icon: "upload", label: "待上传", badge: 3, tone: "warn", to: "pending" },
          { icon: "plus", label: "添加", tone: "muted" },
        ],
      },
    ],
  },
  {
    name: "营业部",
    sections: [
      {
        name: "揽收开单",
        items: [
          { icon: "clipboard", label: "调度管理", badge: 6, tone: "info", to: "dispatch" },
          { icon: "box", label: "揽件", to: "pickup" },
          { icon: "file", label: "开单", to: "billing" },
          { icon: "clipboard", label: "已揽件列表", to: "pickedList" },
          { icon: "box", label: "营业点寄件", to: "counterShip" },
          { icon: "x", label: "改单作废", tone: "danger", to: "voidOrder" },
        ],
      },
      {
        name: "装车发运",
        items: [
          { icon: "truck", label: "上车", to: "driverBoard" },
          { icon: "truck", label: "装车", to: "loadScan" },
          { icon: "truck", label: "开单装车", to: "billAndLoad" },
          { icon: "lock", label: "封车", to: "seal" },
          { icon: "lock", label: "解封", tone: "warn", to: "unseal" },
          { icon: "truck", label: "派送装车", to: "deliveryLoad" },
          { icon: "sign", label: "派送签收", tone: "ok", to: "signing" },
          { icon: "truck", label: "下车", to: "driverOff" },
        ],
      },
      {
        name: "调度与其他",
        items: [
          { icon: "chart", label: "运营调度", tone: "info", to: "opsDispatch" },
          { icon: "chart", label: "时效成本查询", tone: "info", to: "query" },
          { icon: "layers", label: "渠道交货", to: "channelHandover" },
          { icon: "camera", label: "货物拍照", to: "cargoPhoto" },
          { icon: "upload", label: "外发申请", tone: "warn", to: "docUpload" },
          { icon: "print", label: "外发补录打印", tone: "warn", to: "outboundPrint" },
        ],
      },
    ],
  },
  {
    name: "转运场",
    sections: [
      {
        name: "装卸作业",
        items: [
          { icon: "truck", label: "装车", to: "loadScan" },
          { icon: "scan", label: "卸车", tone: "info", to: "unload" },
          { icon: "lock", label: "封车", to: "seal" },
          { icon: "lock", label: "解封", tone: "warn", to: "unseal" },
          { icon: "box", label: "二次包装", to: "repackage" },
          { icon: "print", label: "打印交接单", tone: "warn", to: "seal" },
        ],
      },
      {
        name: "到离港",
        items: [
          { icon: "pin", label: "到港确认", tone: "ok", to: "port" },
          { icon: "pin", label: "离港确认", tone: "info", to: "departure" },
          { icon: "truck", label: "车辆与货物", to: "vehicleCargo" },
          { icon: "search", label: "单票查询", to: "query" },
          { icon: "clipboard", label: "车辆检查", to: "vehicleInspect" },
        ],
      },
      {
        name: "其他",
        items: [
          { icon: "layers", label: "渠道交货", to: "channelHandover" },
          { icon: "camera", label: "货物拍照", to: "cargoPhoto" },
          { icon: "print", label: "外发补录", tone: "warn", to: "outboundPrint" },
        ],
      },
    ],
  },
  {
    name: "司机",
    sections: [
      {
        name: "行车作业",
        items: [
          { icon: "truck", label: "上车", to: "driverBoard" },
          { icon: "truck", label: "下车", to: "driverOff" },
          { icon: "clipboard", label: "司机作业", badge: 2, tone: "info", to: "driverTasks" },
          { icon: "pin", label: "进港点到", tone: "ok", to: "gateCheckin" },
          { icon: "truck", label: "车辆信息", to: "vehicle" },
          { icon: "warn", label: "未签异常", badge: 1, tone: "danger", to: "unsigned" },
        ],
      },
      {
        name: "申报与收益",
        items: [
          { icon: "file", label: "费用申报", tone: "warn", to: "expense" },
          { icon: "fuel", label: "现金加油", tone: "warn", to: "fuel" },
          { icon: "warn", label: "故障申报", tone: "danger", to: "fault" },
          { icon: "chart", label: "我的提成", tone: "ok", to: "commission" },
        ],
      },
      {
        name: "交付",
        items: [
          { icon: "layers", label: "渠道交货", to: "channelHandover" },
          { icon: "camera", label: "货物拍照", to: "cargoPhoto" },
        ],
      },
    ],
  },
  {
    name: "综合",
    sections: [
      {
        name: "库存盘点",
        items: [
          { icon: "clipboard", label: "盘库", to: "stockCount" },
          { icon: "file", label: "盘亏补录", tone: "warn", to: "exception" },
          { icon: "box", label: "资产盘点", to: "assetCount" },
          { icon: "search", label: "查看库存", to: "inventory" },
          { icon: "box", label: "客户拣货", to: "picking" },
          { icon: "scale", label: "称重/量体", tone: "ok", to: "weigh" },
        ],
      },
      {
        name: "财务",
        items: [
          { icon: "file", label: "收款", tone: "ok", to: "payment" },
          { icon: "chart", label: "财务对账", tone: "info", to: "reconcile" },
          { icon: "file", label: "生成账单", to: "genBill" },
        ],
      },
      {
        name: "打印与预警",
        items: [
          { icon: "print", label: "贴标机打印", tone: "warn", to: "printLabel" },
          { icon: "print", label: "SKU 打印", tone: "warn", to: "printSku" },
          { icon: "print", label: "打印测试", tone: "warn", to: "printTest" },
          { icon: "bell", label: "时效监控预警", badge: 4, tone: "danger", to: "slaAlerts" },
          { icon: "search", label: "协作查询", to: "query" },
        ],
      },
      {
        name: "录入与上传",
        items: [
          { icon: "warn", label: "异常录入", tone: "danger", to: "exception" },
          { icon: "upload", label: "运单资料上传", tone: "info", to: "docUpload" },
          { icon: "upload", label: "待上传", badge: 3, tone: "warn", to: "pending" },
          { icon: "tools", label: "揽件配置", to: "pickupConfig" },
        ],
      },
    ],
  },
]

export function Home() {
  const nav = useNav()
  const [g, setG] = useState(0)
  const cur = groups[g]
  return (
    <Device>
      <div className="flex min-h-full flex-col">
        {/* header */}
        <div className="bg-brand px-4 pb-4 pt-3 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-full bg-white/20 text-[16px] font-bold">张</div>
              <div>
                <div className="text-[16px] font-bold">张伟 · 营业部主管</div>
                <div className="text-[12px] text-white/75">上海浦东营业部（SH-PD-07）</div>
              </div>
            </div>
            <button onClick={() => nav.go("pending")} className="relative p-1">
              <Icons.upload size={24} />
              <span className="absolute -right-0.5 -top-0.5 grid h-[17px] min-w-[17px] place-items-center rounded-full bg-warn px-1 text-[10px] font-bold tnum">3</span>
            </button>
          </div>
          <div className="mt-3">
            <DeviceStatus />
          </div>
        </div>

        {/* group tabs */}
        <div className="sticky top-0 z-10 flex gap-1 border-b border-line bg-white px-2">
          {groups.map((gr, i) => (
            <button
              key={gr.name}
              onClick={() => setG(i)}
              className={"relative px-3 py-3 text-[15px] " + (i === g ? "font-bold text-brand" : "text-ink-3")}
            >
              {gr.name}
              {i === g && <span className="absolute inset-x-3 bottom-0 h-[3px] rounded-full bg-brand" />}
            </button>
          ))}
        </div>

        <div className="flex-1 bg-page p-3">
          {/* vehicle-state guidance banner (常用) */}
          {g === 0 && (
            <Card className="mb-3 border-warn/30 bg-warn-tint" pad>
              <div className="flex items-start gap-3">
                <Icons.truck size={22} className="mt-0.5 text-warn" />
                <div className="flex-1">
                  <div className="text-[15px] font-bold text-ink">当前有未完成的上车任务</div>
                  <div className="mt-0.5 text-[12px] text-ink-2">车次 HZ2409-018 · 沪B·2F3K9 · 已装 42 件 <Sample /></div>
                  <div className="mt-2 flex gap-2">
                    <button onClick={() => nav.go("loadScan")} className="rounded-lg bg-warn px-3 py-1.5 text-[13px] font-bold text-white">继续上车</button>
                    <button onClick={() => nav.go("driverBoard")} className="rounded-lg border border-warn/40 bg-white px-3 py-1.5 text-[13px] font-medium text-warn">去下车</button>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {cur.sections.map((s) => (
            <div key={s.name}>
              <SectionTitle>{s.name}</SectionTitle>
              <Card pad={false} className="mb-3 p-2">
                <Grid items={s.items} />
              </Card>
            </div>
          ))}

          {g === 0 && (
            <Card pad={false} className="p-3">
              <SectionTitle>今日概览 <Sample /></SectionTitle>
              <div className="grid grid-cols-3 divide-x divide-line text-center">
                <div className="py-1"><div className="font-mono text-[22px] font-medium text-brand tnum">18</div><div className="text-[12px] text-ink-3">待派单</div></div>
                <div className="py-1"><div className="font-mono text-[22px] font-medium text-ink tnum">126</div><div className="text-[12px] text-ink-3">已揽件</div></div>
                <div className="py-1"><div className="font-mono text-[22px] font-medium text-warn tnum">3</div><div className="text-[12px] text-ink-3">待上传</div></div>
              </div>
            </Card>
          )}
        </div>

        <BottomNav active="home" />
      </div>
    </Device>
  )
}

/* Shared bottom navigation */
export function BottomNav({ active }: { active: "home" | "tools" | "orders" | "me" }) {
  const nav = useNav()
  const items: { key: typeof active; icon: IconKey; label: string; to: string }[] = [
    { key: "home", icon: "box", label: "首页", to: "home" },
    { key: "tools", icon: "tools", label: "工具", to: "print" },
    { key: "orders", icon: "clipboard", label: "接单", to: "pickedList" },
    { key: "me", icon: "user", label: "我的", to: "profile" },
  ]
  return (
    <div className="sticky bottom-0 flex border-t border-line bg-white">
      {items.map((it) => {
        const Ic = Icons[it.icon]
        const on = it.key === active
        return (
          <button key={it.label} onClick={() => nav.go(it.to)} className="flex flex-1 flex-col items-center gap-0.5 py-2 active:bg-brand-tint/40">
            <Ic size={22} className={on ? "text-brand" : "text-ink-3"} />
            <span className={"text-[11px] " + (on ? "font-medium text-brand" : "text-ink-3")}>{it.label}</span>
          </button>
        )
      })}
    </div>
  )
}
