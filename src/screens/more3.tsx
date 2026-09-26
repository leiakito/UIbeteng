import React from "react"
import {
  Device, AppBar, Icons, Tag, Card, KV, Field, Btn, BottomBar, Segments, Chips,
  ScanZone, CountBar, Row, Sample, Tone,
} from "../components/kit"

function TripSelect({ label = "当前车次", trip = "HZ2409-018", plate = "沪B·2F3K9" }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-brand-tint px-3 py-2.5">
      <Icons.truck size={22} className="text-brand" />
      <div className="flex-1">
        <div className="text-[12px] text-ink-3">{label}</div>
        <div className="font-mono text-[15px] font-medium text-ink">{trip} · {plate}</div>
      </div>
      <Icons.chevronDown size={18} className="text-brand" />
    </div>
  )
}

/* ============================ 营业点寄件 ============================ */
export function CounterShip() {
  return (
    <Device>
      <div className="flex min-h-full flex-col bg-page">
        <AppBar title="营业点寄件" sub="到店散客" />
        <div className="flex-1 space-y-3 p-3">
          <div className="flex items-center gap-2 rounded-xl bg-brand-tint px-3 py-2.5 text-[13px] text-brand">
            <Icons.user size={18} /> 散客到店寄件 · 无需预约单
          </div>
          <Card pad className="space-y-3">
            <div className="text-[13px] font-bold text-ink-2">寄件人（现场）</div>
            <Field label="姓名" value="王先生" required />
            <Field label="手机号" value="139 0000 0000" required keyboard="数字" />
            <div className="flex items-center gap-2 rounded-lg bg-info-tint px-3 py-2 text-[12px] text-info">
              <Icons.clipboard size={14} /> 可读取身份证/一证通，自动带出实名信息
            </div>
          </Card>
          <Card pad className="space-y-3">
            <div className="text-[13px] font-bold text-ink-2">收件与货物</div>
            <Field label="收件地址" value="广州市天河区体育西路 3 号" required />
            <div className="grid grid-cols-2 gap-2">
              <Field label="件数" value="1" suffix="件" keyboard="数字" required />
              <Field label="重量" value="3.5" suffix="kg" keyboard="数字" required />
            </div>
            <Field label="物品名称" value="文件资料" required />
          </Card>
          <div className="flex items-center justify-between rounded-xl bg-white px-3 py-3">
            <span className="text-[14px] font-bold">预估运费</span>
            <span className="font-mono text-[20px] font-bold text-brand">¥ 18.00</span>
          </div>
        </div>
        <BottomBar>
          <Btn variant="outline" icon="scale">称重</Btn>
          <Btn icon="print" to="payment">收款并打印</Btn>
        </BottomBar>
      </div>
    </Device>
  )
}

/* ============================ 开单装车 ============================ */
export function BillAndLoad() {
  return (
    <Device>
      <div className="flex min-h-full flex-col bg-page">
        <AppBar title="开单装车" sub="边开单边装车" />
        <div className="flex-1 space-y-3 p-3">
          <TripSelect label="装车车次" />
          <CountBar
            items={[
              { label: "本次开单", value: "1", tone: "ok" },
              { label: "累计装车", value: "9", tone: "ink" },
              { label: "金额合计", value: "¥1.1k", tone: "ink" },
            ]}
          />
          <Card pad className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-bold text-ink-2">快速开单</span>
              <Tag tone="ok">已生成 YD-...070</Tag>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <Field label="到达网点" value="杭州" required />
              <Field label="件数" value="3" suffix="件" keyboard="数字" required />
              <Field label="运费" value="¥120" keyboard="数字" />
            </div>
          </Card>
          <div className="rounded-xl bg-ok-tint px-3 py-2.5 text-[13px] text-ok">
            <Icons.check size={14} className="mr-1 inline" strokeWidth={2.4} /> 开单成功并自动装车,标签已发送打印机
          </div>
          <Card pad={false} className="p-3">
            <div className="mb-1 px-1 text-[13px] font-bold text-ink-2">本车已开单装车</div>
            <Row title="YD-778120070" sub="杭州 · 3 件 · ¥120" icon="check" tone="ok" right={<Tag tone="ok" icon={false}>已装</Tag>} />
            <Row title="YD-778120069" sub="南京 · 2 件 · ¥88" icon="check" tone="ok" right={<Tag tone="ok" icon={false}>已装</Tag>} />
          </Card>
        </div>
        <BottomBar>
          <Btn variant="outline" icon="lock">去封车</Btn>
          <Btn icon="plus">继续开单装车</Btn>
        </BottomBar>
      </div>
    </Device>
  )
}

/* ============================ 车辆与货物 ============================ */
export function VehicleCargo() {
  return (
    <Device>
      <div className="flex min-h-full flex-col bg-page">
        <AppBar title="车辆与货物" sub="载货清单" right={<Icons.search size={20} className="text-white/90" />} />
        <div className="flex-1 space-y-3 p-3">
          <TripSelect />
          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-xl bg-white p-3 text-center"><div className="font-mono text-[22px] font-bold text-brand tnum">56</div><div className="text-[12px] text-ink-3">总件数</div></div>
            <div className="rounded-xl bg-white p-3 text-center"><div className="font-mono text-[22px] font-bold text-ink tnum">3.2</div><div className="text-[12px] text-ink-3">体积 m³</div></div>
            <div className="rounded-xl bg-white p-3 text-center"><div className="font-mono text-[22px] font-bold text-ink tnum">1.1</div><div className="text-[12px] text-ink-3">重量 t</div></div>
          </div>
          <Segments items={["按目的地", "按运单"]} active={0} />
          <Card pad={false} className="p-3">
            <Row title="杭州转运中心" sub="18 单 · 24 件" icon="pin" tone="brand" right={<span className="font-mono text-[14px] text-ink-2">24</span>} />
            <Row title="南京营业部" sub="9 单 · 15 件" icon="pin" tone="brand" right={<span className="font-mono text-[14px] text-ink-2">15</span>} />
            <Row title="深圳南山" sub="11 单 · 17 件" icon="pin" tone="brand" right={<span className="font-mono text-[14px] text-ink-2">17</span>} />
          </Card>
          <div className="rounded-xl bg-warn-tint px-3 py-2.5 text-[13px] text-warn">
            <Icons.warn size={14} className="mr-1 inline" /> 装载率 86%,注意重心与超限
          </div>
        </div>
      </div>
    </Device>
  )
}

/* ============================ 资产盘点 ============================ */
export function AssetCount() {
  return (
    <Device>
      <div className="flex min-h-full flex-col bg-page">
        <AppBar title="资产盘点" sub="站内固定资产" right={<Segments items={["扫码", "手动"]} active={0} />} />
        <div className="flex-1 space-y-3 p-3">
          <CountBar
            items={[
              { label: "应盘", value: "42", tone: "ink" },
              { label: "已盘", value: "40", tone: "ok" },
              { label: "缺失", value: "2", tone: "danger" },
            ]}
          />
          <ScanZone placeholder="扫描资产标签 RFID/条码" state={{ tone: "ok", text: "已盘点 · 状态正常", code: "ZC-2024-0187" }} />
          <Card pad={false} className="p-3">
            <div className="mb-1 px-1 text-[13px] font-bold text-ink-2">资产明细</div>
            <Row title="液压托盘车 ×3" sub="ZC-2024-0187" icon="tools" tone="ok" right={<Tag tone="ok" icon={false}>在库</Tag>} />
            <Row title="手持 PDA ×12" sub="ZC-2024-0163" icon="scan" tone="ok" right={<Tag tone="ok" icon={false}>在库</Tag>} />
            <Row title="蓝牙打印机 ×5" sub="ZC-2024-0155" icon="print" tone="warn" right={<Tag tone="danger" icon={false}>缺 1</Tag>} />
            <Row title="电子地磅 ×1" sub="ZC-2024-0101" icon="scale" tone="warn" right={<Tag tone="danger" icon={false}>未找到</Tag>} />
          </Card>
        </div>
        <BottomBar>
          <Btn variant="outline">缺失上报</Btn>
          <Btn variant="ok" icon="check" to="resultOk" meta={{ title: "资产盘点已提交", sub: "盘点结果已记录", rows: [{ k: "应盘/已盘", v: "42 / 40" }, { k: "缺失", v: "2 件" }, { k: "盘点人", v: "张伟" }], note: "缺失资产已生成待核实工单" }}>提交盘点</Btn>
        </BottomBar>
      </div>
    </Device>
  )
}

/* ============================ 进港点到 ============================ */
export function GateCheckin() {
  return (
    <Device>
      <div className="flex min-h-full flex-col bg-page">
        <AppBar title="进港点到" sub="杭州转运中心 · 门岗" />
        <div className="flex-1 space-y-3 p-3">
          <div className="rounded-2xl bg-gradient-to-br from-brand to-brand-deep p-5 text-white">
            <div className="text-[13px] text-white/75">到场时间</div>
            <div className="font-mono text-[30px] font-bold tnum">11:38:22</div>
            <div className="mt-1 flex items-center gap-1 text-[12px] text-white/80"><Icons.pin size={13} /> 定位在场区内(±9m)</div>
          </div>
          <Card pad>
            <KV k="车牌" v="沪B·2F3K9" strong />
            <KV k="司机" v="王强" />
            <KV k="车次" v="HZ2409-018" />
            <KV k="停靠月台" v={<Tag tone="info">建议 6 号台</Tag>} />
          </Card>
          <div className="flex items-center gap-2 rounded-xl bg-ok-tint px-3 py-3">
            <Icons.check size={22} className="text-ok" strokeWidth={2.4} />
            <div><div className="text-[14px] font-medium text-ok">点到成功</div><div className="text-[12px] text-ink-2">已通知场内调度安排卸车</div></div>
          </div>
        </div>
        <BottomBar>
          <Btn variant="outline" icon="pin">导航月台</Btn>
          <Btn variant="ok" icon="check" to="resultOk" meta={{ title: "进港点到成功", sub: "已登记进港排队", rows: [{ k: "车牌", v: "沪B·2F3K9" }, { k: "进港网点", v: "杭州转运中心" }, { k: "排队号", v: "A-07" }], note: "请留意叫号进入卸货区" }}>确认进港</Btn>
        </BottomBar>
      </div>
    </Device>
  )
}

/* ============================ 车辆检查 ============================ */
export function VehicleInspect() {
  const items = [
    { l: "轮胎/胎压", ok: true },
    { l: "灯光/转向", ok: true },
    { l: "制动系统", ok: true },
    { l: "车厢清洁", ok: true },
    { l: "随车工具", ok: false },
    { l: "灭火器", ok: true },
  ]
  return (
    <Device>
      <div className="flex min-h-full flex-col bg-page">
        <AppBar title="车辆检查" sub="出车前点检" />
        <div className="flex-1 space-y-3 p-3">
          <TripSelect />
          <Card pad>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[13px] font-bold text-ink-2">点检项(6)</span>
              <span className="text-[12px] text-warn">1 项异常</span>
            </div>
            <div className="space-y-1">
              {items.map((it) => (
                <div key={it.l} className="flex items-center justify-between border-b border-line py-2.5 last:border-0">
                  <span className="text-[15px] text-ink">{it.l}</span>
                  <div className="flex gap-2">
                    <span className={"flex items-center gap-1 rounded-lg px-3 py-1 text-[13px] font-medium " + (it.ok ? "bg-ok-tint text-ok" : "border border-line text-ink-3")}>
                      <Icons.check size={14} strokeWidth={2.4} /> 正常
                    </span>
                    <span className={"flex items-center gap-1 rounded-lg px-3 py-1 text-[13px] font-medium " + (!it.ok ? "bg-danger-tint text-danger" : "border border-line text-ink-3")}>
                      <Icons.x size={14} strokeWidth={2.4} /> 异常
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          <Card pad>
            <div className="mb-1 text-[13px] text-ink-2">异常说明(随车工具缺失)</div>
            <div className="rounded-xl border border-line bg-white px-3 py-2 text-[14px] text-ink">缺少三角警示牌,已申请补充</div>
          </Card>
        </div>
        <BottomBar>
          <Btn variant="outline" icon="camera">拍照存档</Btn>
          <Btn icon="check" to="resultOk" meta={{ title: "车辆点检完成", sub: "点检结果已上传", rows: [{ k: "车牌", v: "沪B·2F3K9" }, { k: "点检项", v: "12 项全部合格" }, { k: "点检人", v: "王强" }], note: "点检照片已归档" }}>提交点检</Btn>
        </BottomBar>
      </div>
    </Device>
  )
}

/* ============================ 解封 ============================ */
export function Unseal() {
  return (
    <Device>
      <div className="flex min-h-full flex-col bg-page">
        <AppBar title="解封" sub="卸车前解封" />
        <div className="flex-1 space-y-3 p-3">
          <TripSelect label="到货车次" />
          <Card pad>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[14px] font-bold">铅封核对</span>
              <Tag tone="ok">封号一致</Tag>
            </div>
            <KV k="系统铅封号" v="FS-0099821" strong />
            <KV k="实际铅封号" v="FS-0099821" strong />
          </Card>
          <ScanZone placeholder="扫描/输入实际铅封号" state={{ tone: "ok", text: "铅封核验通过", code: "FS-0099821" }} />
          <Card pad>
            <div className="mb-1 text-[13px] text-ink-2">解封照片 <span className="text-danger">*</span></div>
            <div className="flex gap-2">
              <div className="grid h-16 w-16 place-items-center rounded-xl bg-brand-tint text-brand"><Icons.camera size={22} /></div>
              <div className="grid h-16 w-16 place-items-center rounded-xl border-2 border-dashed border-line text-ink-3"><Icons.plus size={22} /></div>
            </div>
          </Card>
          <div className="flex items-center gap-2 rounded-xl bg-warn-tint px-3 py-2.5 text-[13px] text-warn">
            <Icons.warn size={16} /> 若封号不符或破损,请勿解封并立即上报
          </div>
        </div>
        <BottomBar>
          <Btn variant="danger" icon="warn">封号异常</Btn>
          <Btn variant="ok" icon="lock" to="unload">确认解封</Btn>
        </BottomBar>
      </div>
    </Device>
  )
}
