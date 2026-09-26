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

function PhotoSlot({ n = 1, of = 3 }: { n?: number; of?: number }) {
  return (
    <div>
      <div className="mb-1 text-[13px] text-ink-2">现场照片（{n}/{of}）</div>
      <div className="flex gap-2">
        {Array.from({ length: n }).map((_, i) => (
          <div key={i} className="grid h-16 w-16 place-items-center rounded-xl bg-brand-tint text-brand">
            <Icons.camera size={22} />
          </div>
        ))}
        <div className="grid h-16 w-16 place-items-center rounded-xl border-2 border-dashed border-line text-ink-3">
          <Icons.plus size={22} />
        </div>
      </div>
    </div>
  )
}

/* ============================ 卸车 ============================ */
export function Unload() {
  return (
    <Device>
      <div className="flex min-h-full flex-col bg-page">
        <AppBar title="卸车" sub="到货扫码" right={<Segments items={["整票", "单件"]} active={1} />} />
        <div className="flex-1 space-y-3 p-3">
          <TripSelect label="到货车次" />
          <CountBar
            items={[
              { label: "本次卸车", value: "1", tone: "ok" },
              { label: "累计卸车", value: "38", tone: "ink" },
              { label: "应卸", value: "56", tone: "warn" },
            ]}
          />
          <ScanZone hint="扫描运单/包裹条码进行卸车登记" state={{ tone: "ok", text: "卸车成功", code: "YD-778120031" }} />
          <div className="flex items-center gap-2 rounded-xl bg-warn-tint px-3 py-2.5">
            <Icons.warn size={18} className="text-warn" />
            <span className="flex-1 text-[14px] font-medium text-warn">尚有 18 件未卸，注意漏卸</span>
          </div>
          <Card pad={false} className="p-3">
            <div className="mb-1 px-1 text-[13px] font-bold text-ink-2">最近卸车</div>
            <Row title="YD-778120031" sub="4 件 · 09:52:10" icon="check" tone="ok" right={<Tag tone="ok" icon={false}>已卸</Tag>} />
            <Row title="YD-778120028" sub="1 件 · 09:51:44" icon="check" tone="ok" right={<Tag tone="ok" icon={false}>已卸</Tag>} />
          </Card>
        </div>
        <BottomBar>
          <Btn variant="outline">漏卸清单</Btn>
          <Btn icon="scan">继续卸车</Btn>
        </BottomBar>
      </div>
    </Device>
  )
}

/* ============================ 开单 ============================ */
export function Billing() {
  return (
    <Device>
      <div className="flex min-h-full flex-col bg-page">
        <AppBar title="开单" sub="新建运单" />
        <div className="flex-1 space-y-3 p-3">
          <Card pad className="space-y-3">
            <div className="text-[13px] font-bold text-ink-2">寄收件</div>
            <Field label="寄件人" value="上海鼎晟贸易 · 陈经理" required />
            <Field label="收件人 / 电话" value="周先生 · 138 0013 0000" required keyboard="数字" />
            <Field label="到达网点" value="深圳南山营业部" required />
          </Card>
          <Card pad className="space-y-3">
            <div className="text-[13px] font-bold text-ink-2">货物与计费</div>
            <div className="grid grid-cols-3 gap-2">
              <Field label="件数" value="6" suffix="件" keyboard="数字" required />
              <Field label="重量" value="45" suffix="kg" keyboard="数字" required />
              <Field label="体积" value="0.32" suffix="m³" keyboard="数字" />
            </div>
            <Field label="产品类型" value="标准零担" />
          </Card>
          <Card pad>
            <div className="mb-2 text-[13px] font-bold text-ink-2">费用明细 <Sample /></div>
            <KV k="运费" v="¥ 96.00" />
            <KV k="保价费" v="¥ 12.00" />
            <KV k="包装费" v="¥ 20.00" />
            <div className="mt-1 flex items-center justify-between border-t border-line pt-2">
              <span className="text-[14px] font-bold">合计（到付）</span>
              <span className="font-mono text-[22px] font-bold text-brand">¥ 128.00</span>
            </div>
          </Card>
        </div>
        <BottomBar>
          <Btn variant="outline" icon="print">开单并打印</Btn>
          <Btn icon="check" to="pickedList">确认开单</Btn>
        </BottomBar>
      </div>
    </Device>
  )
}

/* ============================ 单票查询 + 轨迹 ============================ */
export function WaybillQuery() {
  const trace = [
    { t: "09:52", s: "到达 杭州转运中心 · 待卸车", tone: "info" as Tone, on: true },
    { t: "06:10", s: "从 上海浦东 发出 · 车次 HZ2409-018", tone: "brand" as Tone, on: true },
    { t: "昨 18:22", s: "已封车 · 铅封 FS-0099821", tone: "brand" as Tone, on: true },
    { t: "昨 15:40", s: "已揽收 · 王强", tone: "ok" as Tone, on: true },
    { t: "昨 14:02", s: "已开单 · 上海浦东营业部", tone: "muted" as Tone, on: true },
  ]
  return (
    <Device>
      <div className="flex min-h-full flex-col bg-page">
        <AppBar title="单票查询" sub="运单轨迹" />
        <div className="flex-1 space-y-3 p-3">
          <div className="flex items-center gap-2 rounded-xl border border-line bg-white px-3 py-2.5">
            <Icons.scan size={18} className="text-brand" />
            <span className="flex-1 font-mono text-[14px]">YD-778120054</span>
            <span className="text-[13px] font-medium text-brand">查询</span>
          </div>
          <Card pad>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[15px] font-bold">YD-778120054</span>
              <Tag tone="info">在途</Tag>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-y-1">
              <KV k="始发" v="上海浦东" />
              <KV k="到达" v="深圳南山" />
              <KV k="件数" v="6 件 / 45kg" />
              <KV k="付款" v="到付 128" />
            </div>
          </Card>
          <Card pad>
            <div className="mb-3 text-[13px] font-bold text-ink-2">物流轨迹</div>
            <div className="space-y-0">
              {trace.map((n, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className={"h-3 w-3 rounded-full " + (i === 0 ? "bg-brand ring-4 ring-brand-tint" : "bg-line")} />
                    {i < trace.length - 1 && <div className="w-px flex-1 bg-line" />}
                  </div>
                  <div className={"pb-4 " + (i === 0 ? "text-ink" : "text-ink-2")}>
                    <div className="text-[14px] font-medium">{n.s}</div>
                    <div className="text-[12px] text-ink-3">{n.t}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </Device>
  )
}

/* ============================ 费用申报 ============================ */
export function Expense() {
  return (
    <Device>
      <div className="flex min-h-full flex-col bg-page">
        <AppBar title="费用申报" sub="沪B·2F3K9" />
        <div className="flex-1 space-y-3 p-3">
          <Chips items={["过路过桥", "停车费", "住宿", "餐饮", "其他"]} active={0} />
          <Card pad className="space-y-3">
            <Field label="费用类型" value="过路过桥费" required />
            <Field label="金额" value="86.00" suffix="元" required keyboard="数字键盘" />
            <Field label="发生时间" value="2026-09-26 10:20" />
            <Field label="关联车次" value="HZ2409-018" />
            <PhotoSlot n={1} of={3} />
            <Field label="备注" placeholder="填写补充说明（选填）" />
          </Card>
          <div className="flex items-center justify-between rounded-xl bg-brand-tint px-3 py-3">
            <span className="text-[14px] text-ink-2">本月已申报</span>
            <span className="font-mono text-[18px] font-bold text-brand">¥ 1,240.00</span>
          </div>
        </div>
        <BottomBar>
          <Btn variant="outline">存草稿</Btn>
          <Btn icon="check" to="resultOk" meta={{ title: "费用申报已提交", sub: "等待财务审核", rows: [{ k: "申报单号", v: "FY-20240926-031" }, { k: "费用类型", v: "过路过桥费" }, { k: "金额", v: "¥ 120.00" }], note: "审核通过后计入车辆成本" }}>提交申报</Btn>
        </BottomBar>
      </div>
    </Device>
  )
}

/* ============================ 现金加油 ============================ */
export function Fuel() {
  return (
    <Device>
      <div className="flex min-h-full flex-col bg-page">
        <AppBar title="现金加油" sub="沪B·2F3K9" />
        <div className="flex-1 space-y-3 p-3">
          <Card pad className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <Field label="加油金额" value="500.00" suffix="元" required keyboard="数字" />
              <Field label="升数" value="72.4" suffix="L" required keyboard="数字" />
            </div>
            <Field label="油品" value="0# 柴油" />
            <Field label="加油站" value="中石化浦东张江站" />
            <Field label="当前里程" value="128,562" suffix="km" keyboard="数字" />
          </Card>
          <Card pad>
            <PhotoSlot n={2} of={3} />
            <div className="mt-2 text-[12px] text-ink-3">需上传：油枪读数、加油小票、里程表</div>
          </Card>
          <div className="rounded-xl bg-ok-tint px-3 py-2.5 text-[13px] text-ok">
            <Icons.check size={14} className="mr-1 inline" strokeWidth={2.4} />
            单价约 ¥6.91/L，处于正常区间
          </div>
        </div>
        <BottomBar>
          <Btn variant="ok" icon="check" to="resultOk" meta={{ title: "加油记录已提交", sub: "现金加油已登记", rows: [{ k: "车牌", v: "沪B·2F3K9" }, { k: "加油金额", v: "¥ 500.00" }, { k: "升数", v: "62.5 L" }], note: "小票照片已上传归档" }}>提交加油记录</Btn>
        </BottomBar>
      </div>
    </Device>
  )
}

/* ============================ 故障申报 ============================ */
export function Fault() {
  return (
    <Device>
      <div className="flex min-h-full flex-col bg-page">
        <AppBar title="故障申报" sub="沪B·2F3K9" />
        <div className="flex-1 space-y-3 p-3">
          <Card pad>
            <div className="mb-2 text-[13px] font-bold text-ink-2">紧急程度</div>
            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-lg border border-line py-2 text-center text-[13px] text-ink-2">一般</div>
              <div className="rounded-lg border-2 border-warn bg-warn-tint py-2 text-center text-[13px] font-medium text-warn">较急</div>
              <div className="rounded-lg border border-line py-2 text-center text-[13px] text-danger">紧急停运</div>
            </div>
          </Card>
          <Card pad className="space-y-3">
            <Field label="故障部位" value="制动系统" required />
            <Field label="故障描述" value="下坡刹车偏软，踏板行程变长" required />
            <div className="flex items-center gap-2 rounded-lg bg-ok-tint px-3 py-2 text-[13px] text-ok">
              <Icons.pin size={16} /> 定位：G60 沪昆高速松江段（±12m）
            </div>
            <PhotoSlot n={1} of={4} />
          </Card>
        </div>
        <BottomBar>
          <Btn variant="outline" icon="user">联系调度</Btn>
          <Btn variant="danger" icon="warn" to="resultOk" meta={{ title: "故障已上报", sub: "调度将尽快处理", rows: [{ k: "上报单号", v: "GZ-20240926-07" }, { k: "车牌", v: "沪B·2F3K9" }, { k: "故障级别", v: "中·可继续行驶" }], note: "已通知维修调度与安全员" }}>提交故障</Btn>
        </BottomBar>
      </div>
    </Device>
  )
}

/* ============================ 我的提成 ============================ */
export function Commission() {
  const rows = [
    { d: "09-26", label: "派送 24 单", amt: "+48.00" },
    { d: "09-25", label: "长途 620km", amt: "+186.00" },
    { d: "09-24", label: "派送 31 单", amt: "+62.00" },
    { d: "09-23", label: "装卸补贴", amt: "+35.00" },
  ]
  return (
    <Device>
      <div className="flex min-h-full flex-col bg-page">
        <AppBar title="我的提成" sub="王强 · 司机" />
        <div className="flex-1 space-y-3 p-3">
          <div className="rounded-2xl bg-gradient-to-br from-brand to-brand-deep p-5 text-white">
            <div className="text-[13px] text-white/75">本月累计提成（示例）</div>
            <div className="font-mono text-[34px] font-bold tnum">¥ 4,286.00</div>
            <div className="mt-2 flex gap-4 text-[12px] text-white/80">
              <span>行驶 3,240 km</span>
              <span>派送 486 单</span>
              <span>满勤 24 天</span>
            </div>
          </div>
          <Segments items={["本月", "上月", "全年"]} active={0} />
          <Card pad={false} className="p-3">
            {rows.map((r) => (
              <Row key={r.d + r.label} title={r.label} sub={"2026-" + r.d} icon="chart" tone="ok"
                right={<span className="font-mono text-[15px] font-bold text-ok">{r.amt}</span>} />
            ))}
          </Card>
        </div>
      </div>
    </Device>
  )
}

/* ============================ 车辆信息 ============================ */
export function Vehicle() {
  return (
    <Device>
      <div className="flex min-h-full flex-col bg-page">
        <AppBar title="车辆信息" sub="沪B·2F3K9" />
        <div className="flex-1 space-y-3 p-3">
          <Card pad>
            <div className="flex items-center gap-3">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-tint text-brand"><Icons.truck size={30} /></div>
              <div>
                <div className="font-mono text-[20px] font-bold">沪B·2F3K9</div>
                <div className="text-[12px] text-ink-3">厢式货车 4.2m · 载重 1.5t <Sample /></div>
              </div>
              <Tag tone="ok">正常营运</Tag>
            </div>
          </Card>
          <Card pad>
            <KV k="当前里程" v="128,562 km" strong />
            <KV k="核定载质量" v="1.5 吨" />
            <KV k="行驶证到期" v="2027-03-11" />
            <KV k="年检有效期" v={<span className="text-warn">2026-11-30（临近）</span>} />
            <KV k="保险到期" v="2027-01-20" />
          </Card>
          <Card pad>
            <div className="mb-2 text-[13px] font-bold text-ink-2">保养提醒</div>
            <div className="flex items-center gap-2 rounded-lg bg-warn-tint px-3 py-2.5 text-[13px] text-warn">
              <Icons.warn size={16} /> 距下次保养还剩 1,438 km
            </div>
          </Card>
        </div>
      </div>
    </Device>
  )
}

/* ============================ 未签异常 ============================ */
export function Unsigned() {
  return (
    <Device>
      <div className="flex min-h-full flex-col bg-page">
        <AppBar title="未签异常" sub="待处理 3 单" />
        <div className="flex-1 space-y-3 p-3">
          <Chips items={["全部", "拒收", "无人签收", "货损"]} active={0} />
          {[
            { no: "YD-778119920", r: "客户拒收 · 外包装破损", pc: "2 件", tone: "danger" as Tone, t: "拒收" },
            { no: "YD-778119905", r: "多次联系无人应答", pc: "1 件", tone: "warn" as Tone, t: "无人签收" },
            { no: "YD-778119888", r: "到货短少 1 件", pc: "5/6 件", tone: "danger" as Tone, t: "货损短少" },
          ].map((x) => (
            <Card key={x.no} pad className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[14px] font-medium">{x.no}</span>
                <Tag tone={x.tone}>{x.t}</Tag>
              </div>
              <div className="text-[13px] text-ink-2">{x.r}</div>
              <div className="text-[12px] text-ink-3">涉及 {x.pc}</div>
              <div className="flex gap-2 border-t border-line pt-2">
                <button className="flex-1 rounded-lg border border-line py-1.5 text-[13px] text-ink-2">上报调度</button>
                <button className="flex-1 rounded-lg bg-brand py-1.5 text-[13px] font-bold text-white">处理异常</button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Device>
  )
}

/* ============================ 盘库 ============================ */
export function StockCount() {
  return (
    <Device>
      <div className="flex min-h-full flex-col bg-page">
        <AppBar title="盘库" sub="A 区 · 03 货架" right={<Segments items={["扫码", "手动"]} active={0} />} />
        <div className="flex-1 space-y-3 p-3">
          <CountBar
            items={[
              { label: "账面", value: "120", tone: "ink" },
              { label: "已盘", value: "116", tone: "ok" },
              { label: "差异", value: "-4", tone: "danger" },
            ]}
          />
          <ScanZone placeholder="扫描 SKU / 库位条码" state={{ tone: "ok", text: "盘点 +1", code: "SKU-88012" }} />
          <Card pad={false} className="p-3">
            <div className="mb-1 flex items-center justify-between px-1">
              <span className="text-[13px] font-bold text-ink-2">盘点明细</span>
              <span className="text-[12px] text-danger">仅看差异</span>
            </div>
            <Row title="SKU-88012 · 减震垫" sub="账 30 / 盘 30" icon="check" tone="ok" right={<Tag tone="ok" icon={false}>相符</Tag>} />
            <Row title="SKU-88015 · 连接件" sub="账 40 / 盘 37" icon="warn" tone="warn" right={<Tag tone="danger" icon={false}>-3</Tag>} />
            <Row title="SKU-88021 · 支架" sub="账 50 / 盘 49" icon="warn" tone="warn" right={<Tag tone="danger" icon={false}>-1</Tag>} />
          </Card>
        </div>
        <BottomBar>
          <Btn variant="outline">盘亏补录</Btn>
          <Btn variant="ok" icon="check" to="resultOk" meta={{ title: "盘库已提交", sub: "库存差异已记录", rows: [{ k: "盘点单号", v: "PK-20240926-02" }, { k: "应盘/实盘", v: "560 / 558" }, { k: "差异", v: "-2 件" }], note: "差异明细已推送综合岗复核" }}>提交盘库</Btn>
        </BottomBar>
      </div>
    </Device>
  )
}

/* ============================ 收款 ============================ */
export function Payment() {
  return (
    <Device>
      <div className="flex min-h-full flex-col bg-page">
        <AppBar title="收款" sub="YD-778120054" />
        <div className="flex-1 space-y-3 p-3">
          <div className="rounded-2xl bg-brand p-5 text-center text-white">
            <div className="text-[13px] text-white/75">应收金额（到付）</div>
            <div className="font-mono text-[40px] font-bold tnum">¥ 128.00</div>
          </div>
          <Card pad>
            <div className="mb-2 text-[13px] font-bold text-ink-2">收款方式</div>
            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-lg border-2 border-brand bg-brand-tint py-3 text-center text-[13px] font-medium text-brand">
                <Icons.scan size={22} className="mx-auto mb-1" /> 扫码收款
              </div>
              <div className="rounded-lg border border-line py-3 text-center text-[13px] text-ink-2">
                <Icons.file size={22} className="mx-auto mb-1" /> 现金
              </div>
              <div className="rounded-lg border border-line py-3 text-center text-[13px] text-ink-2">
                <Icons.clipboard size={22} className="mx-auto mb-1" /> 月结
              </div>
            </div>
          </Card>
          <Card pad>
            <div className="grid place-items-center py-2">
              <div className="grid h-40 w-40 place-items-center rounded-2xl border border-line bg-white">
                <div className="grid h-32 w-32 grid-cols-6 gap-0.5 p-1">
                  {Array.from({ length: 36 }).map((_, i) => (
                    <div key={i} className={((i * 7) % 3 === 0 ? "bg-ink" : "bg-transparent") + " rounded-[1px]"} />
                  ))}
                </div>
              </div>
              <div className="mt-2 text-[13px] text-ink-3">请客户扫码支付 · 收款码 <Sample /></div>
            </div>
          </Card>
        </div>
        <BottomBar>
          <Btn variant="ok" icon="check" to="resultOk" meta={{ title: "收款成功", sub: "款项已入账", rows: [{ k: "业务单号", v: "YD-778120054" }, { k: "收款方式", v: "微信收款" }, { k: "收款金额", v: "¥ 128.00" }], note: "已打印收款凭条" }}>确认已收款</Btn>
        </BottomBar>
      </div>
    </Device>
  )
}

/* ============================ 时效监控预警 ============================ */
export function SlaAlerts() {
  return (
    <Device>
      <div className="flex min-h-full flex-col bg-page">
        <AppBar title="时效监控预警" sub="预警 4 条" right={<Icons.refresh size={20} className="text-white/90" />} />
        <div className="flex-1 space-y-3 p-3">
          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-xl bg-danger-tint py-3 text-center"><div className="font-mono text-[22px] font-bold text-danger tnum">2</div><div className="text-[12px] text-danger">已超时</div></div>
            <div className="rounded-xl bg-warn-tint py-3 text-center"><div className="font-mono text-[22px] font-bold text-warn tnum">2</div><div className="text-[12px] text-warn">临近</div></div>
            <div className="rounded-xl bg-ok-tint py-3 text-center"><div className="font-mono text-[22px] font-bold text-ok tnum">96%</div><div className="text-[12px] text-ok">准点率</div></div>
          </div>
          <Chips items={["全部", "已超时", "临近超时"]} active={0} />
          {[
            { no: "YD-778120001", info: "上海→广州 · 剩余 -1h20m", tone: "danger" as Tone, t: "已超时" },
            { no: "YD-778120009", info: "杭州→成都 · 剩余 -0h35m", tone: "danger" as Tone, t: "已超时" },
            { no: "YD-778120018", info: "南京→武汉 · 剩余 1h05m", tone: "warn" as Tone, t: "临近" },
          ].map((x) => (
            <Card key={x.no} pad className="flex items-center gap-3">
              <Icons.bell size={22} className={x.tone === "danger" ? "text-danger" : "text-warn"} />
              <div className="flex-1">
                <div className="font-mono text-[14px] font-medium">{x.no}</div>
                <div className="text-[12px] text-ink-3">{x.info}</div>
              </div>
              <Tag tone={x.tone}>{x.t}</Tag>
            </Card>
          ))}
        </div>
      </div>
    </Device>
  )
}

/* ============================ 运单资料上传 ============================ */
export function DocUpload() {
  return (
    <Device>
      <div className="flex min-h-full flex-col bg-page">
        <AppBar title="运单资料上传" sub="YD-778120048" />
        <div className="flex-1 space-y-3 p-3">
          <Card pad>
            <div className="mb-2 text-[13px] font-bold text-ink-2">资料清单</div>
            <div className="space-y-2">
              {[
                { n: "签收回单", s: "已上传 2 张", tone: "ok" as Tone, t: "完成" },
                { n: "货物照片", s: "已上传 3 张", tone: "ok" as Tone, t: "完成" },
                { n: "身份证明", s: "待上传", tone: "warn" as Tone, t: "缺失" },
                { n: "异常说明", s: "选填", tone: "muted" as Tone, t: "选填" },
              ].map((d) => (
                <div key={d.n} className="flex items-center gap-3 rounded-xl border border-line p-3">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-brand-tint text-brand"><Icons.file size={20} /></div>
                  <div className="flex-1"><div className="text-[14px] font-medium">{d.n}</div><div className="text-[12px] text-ink-3">{d.s}</div></div>
                  <Tag tone={d.tone}>{d.t}</Tag>
                </div>
              ))}
            </div>
          </Card>
          <div className="grid grid-cols-2 gap-2">
            <button className="flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-brand-soft bg-brand-tint py-4 text-[14px] font-medium text-brand"><Icons.camera size={20} /> 拍照上传</button>
            <button className="flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-line bg-white py-4 text-[14px] text-ink-2"><Icons.upload size={20} /> 从相册选</button>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-warn-tint px-3 py-2.5 text-[13px] text-warn">
            <Icons.wifiOff size={16} /> 弱网环境下将排队上传，可在待上传查看进度
          </div>
        </div>
        <BottomBar>
          <Btn icon="upload" to="resultOffline">提交上传</Btn>
        </BottomBar>
      </div>
    </Device>
  )
}

/* ============================ 异常录入 ============================ */
export function Exception() {
  return (
    <Device>
      <div className="flex min-h-full flex-col bg-page">
        <AppBar title="异常录入" />
        <div className="flex-1 space-y-3 p-3">
          <Card pad>
            <div className="mb-2 text-[13px] font-bold text-ink-2">异常类型</div>
            <div className="grid grid-cols-2 gap-2 text-[13px]">
              <div className="rounded-lg border-2 border-brand bg-brand-tint py-2.5 text-center font-medium text-brand">货物破损</div>
              <div className="rounded-lg border border-line py-2.5 text-center text-ink-2">货物短少</div>
              <div className="rounded-lg border border-line py-2.5 text-center text-ink-2">地址错误</div>
              <div className="rounded-lg border border-line py-2.5 text-center text-ink-2">信息不符</div>
            </div>
          </Card>
          <Card pad className="space-y-3">
            <Field label="关联运单" value="YD-778119888" required keyboard="扫码/输入" />
            <Field label="涉及件数" value="1" suffix="件" keyboard="数字" />
            <Field label="异常描述" value="纸箱受潮，边角凹陷" required />
            <PhotoSlot n={2} of={4} />
            <div className="flex items-center gap-2 rounded-lg bg-ok-tint px-3 py-2 text-[13px] text-ok">
              <Icons.pin size={16} /> 已记录当前位置与时间
            </div>
          </Card>
        </div>
        <BottomBar>
          <Btn variant="outline">存草稿</Btn>
          <Btn variant="danger" icon="warn" to="resultOk" meta={{ title: "异常已录入", sub: "已生成异常工单", rows: [{ k: "异常单号", v: "YC-20240926-14" }, { k: "关联运单", v: "YD-778120031" }, { k: "异常类型", v: "货物破损" }], note: "已通知客服与责任网点" }}>提交异常</Btn>
        </BottomBar>
      </div>
    </Device>
  )
}

/* ============================ 二次包装 ============================ */
export function Repackage() {
  return (
    <Device>
      <div className="flex min-h-full flex-col bg-page">
        <AppBar title="二次包装" sub="加固作业" />
        <div className="flex-1 space-y-3 p-3">
          <ScanZone placeholder="扫描需加固的运单" state={{ tone: "ok", text: "已读取运单", code: "YD-778120054" }} />
          <Card pad>
            <KV k="运单号" v="YD-778120054" strong />
            <KV k="原包装" v="纸箱 × 6" />
            <KV k="货物属性" v={<Tag tone="warn">易碎</Tag>} />
          </Card>
          <Card pad className="space-y-3">
            <div className="text-[13px] font-bold text-ink-2">加固方式（可多选）</div>
            <div className="grid grid-cols-2 gap-2 text-[13px]">
              {["缠绕膜", "木架", "泡沫填充", "打包带", "防水袋", "护角"].map((m, i) => (
                <div key={m} className={"flex items-center gap-2 rounded-lg border px-3 py-2.5 " + (i < 2 ? "border-brand bg-brand-tint text-brand" : "border-line text-ink-2")}>
                  <span className={"grid h-4 w-4 place-items-center rounded " + (i < 2 ? "bg-brand text-white" : "border border-line")}>
                    {i < 2 && <Icons.check size={11} strokeWidth={3} />}
                  </span>
                  {m}
                </div>
              ))}
            </div>
            <Field label="加固费" value="20.00" suffix="元" keyboard="数字" />
            <PhotoSlot n={1} of={2} />
          </Card>
        </div>
        <BottomBar>
          <Btn variant="outline" icon="print">打印新标签</Btn>
          <Btn variant="ok" icon="check" to="resultOk" meta={{ title: "二次包装完成", sub: "货物已重新加固", rows: [{ k: "关联运单", v: "YD-778120031" }, { k: "包装方式", v: "木架+缠膜" }, { k: "包装费", v: "¥ 20.00" }], note: "加固照片已上传" }}>完成加固</Btn>
        </BottomBar>
      </div>
    </Device>
  )
}
