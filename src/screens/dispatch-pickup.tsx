import React from "react"
import {
  Device, AppBar, Icons, Tag, Card, KV, Field, Btn, BottomBar, Segments, Chips, Steps,
  Sample, Tone, useNav,
} from "../components/kit"

/* -------------------- Dispatch: dual list -------------------- */
function OrderCard({
  no,
  cust,
  addr,
  time,
  tone,
  status,
  action,
  picker,
}: {
  no: string
  cust: string
  addr: string
  time: string
  tone: Tone
  status: string
  action: string
  picker?: string
}) {
  const nav = useNav()
  return (
    <Card pad className="space-y-2" onClick={() => nav.go("orderDetail")}>
      <div className="flex items-center justify-between">
        <span className="font-mono text-[13px] text-ink-2">{no}</span>
        <Tag tone={tone}>{status}</Tag>
      </div>
      <div className="text-[15px] font-bold text-ink">{cust}</div>
      <div className="flex items-start gap-1.5 text-[13px] text-ink-2">
        <Icons.pin size={15} className="mt-0.5 shrink-0 text-ink-3" />
        <span>{addr}</span>
      </div>
      <div className="flex items-center justify-between border-t border-line pt-2">
        <span className="text-[12px] text-ink-3">
          {picker ? `揽件员：${picker}` : "预约"} · {time}
        </span>
        <button className="rounded-lg bg-brand px-3 py-1.5 text-[13px] font-bold text-white">
          {action}
        </button>
      </div>
    </Card>
  )
}

export function DispatchList() {
  return (
    <Device title="调度管理 · 双列表">
      <div className="flex min-h-full flex-col bg-page">
        <AppBar title="调度管理" sub="上海浦东营业部" right={<Icons.refresh size={20} className="text-white/90" />} />
        <div className="space-y-3 p-3">
          <Segments items={["待人工派单 18", "已派单待取货 9"]} active={0} />
          <div className="flex items-center gap-2 rounded-xl border border-line bg-white px-3 py-2">
            <Icons.search size={18} className="text-ink-3" />
            <span className="flex-1 text-[14px] text-ink-3">搜索单号 / 客户 / 电话</span>
            <span className="text-[13px] text-brand">筛选</span>
          </div>
          <Chips items={["全部", "急件", "超时", "同城", "本人负责"]} active={0} />
          <OrderCard
            no="LJ-20240926-0182"
            cust="上海鼎晟贸易有限公司"
            addr="浦东新区张江高科技园区博云路 2 号 A 栋 3 层"
            time="今日 14:00 前"
            tone="warn"
            status="待派单"
            action="分配揽件员"
          />
          <OrderCard
            no="LJ-20240926-0181"
            cust="李女士（个人）"
            addr="浦东新区世纪大道 100 号环球金融中心 58F"
            time="今日 16:30 前"
            tone="danger"
            status="急件"
            action="分配揽件员"
          />
          <OrderCard
            no="LJ-20240926-0179"
            cust="巨鲸电子商务"
            addr="浦东新区金桥路 1258 号"
            time="预约明日"
            tone="info"
            status="待派单"
            action="调整"
          />
          <p className="pb-2 text-center text-[12px] text-ink-3">示例数据 · 已加载 18 条</p>
        </div>
      </div>
    </Device>
  )
}

export function DispatchAssigned() {
  return (
    <Device title="调度管理 · 已派单待取货">
      <div className="flex min-h-full flex-col bg-page">
        <AppBar title="调度管理" sub="上海浦东营业部" right={<Icons.refresh size={20} className="text-white/90" />} />
        <div className="space-y-3 p-3">
          <Segments items={["待人工派单 18", "已派单待取货 9"]} active={1} />
          <OrderCard
            no="LJ-20240926-0175"
            cust="上海鼎晟贸易有限公司"
            addr="浦东新区博云路 2 号 A 栋 3 层"
            time="今日 14:00 前"
            picker="王强"
            tone="brand"
            status="已出车"
            action="导航"
          />
          <OrderCard
            no="LJ-20240926-0172"
            cust="恒美家居"
            addr="浦东新区金科路 2889 号"
            time="今日 15:00 前"
            picker="王强"
            tone="info"
            status="待出车"
            action="出车"
          />
          <Card pad className="space-y-2 border-danger/30">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[13px] text-ink-2">LJ-20240926-0168</span>
              <Tag tone="danger">地址异常</Tag>
            </div>
            <div className="text-[15px] font-bold">远大科技</div>
            <div className="flex items-start gap-1.5 text-[13px] text-danger">
              <Icons.warn size={15} className="mt-0.5 shrink-0" />
              <span>定位与填写地址偏差 1.2km，请到达后纠错</span>
            </div>
            <div className="flex gap-2 border-t border-line pt-2">
              <button className="flex-1 rounded-lg border border-line py-1.5 text-[13px] font-medium text-ink-2">
                地址纠错
              </button>
              <button className="flex-1 rounded-lg bg-brand py-1.5 text-[13px] font-bold text-white">
                到达打卡
              </button>
            </div>
          </Card>
        </div>
      </div>
    </Device>
  )
}

export function OrderDetail() {
  return (
    <Device title="订单详情 → 待揽件">
      <div className="flex min-h-full flex-col bg-page">
        <AppBar title="订单详情" sub="LJ-20240926-0175" right={<Icons.pin size={20} className="text-white/90" />} />
        <div className="flex-1 space-y-3 p-3">
          <Card pad>
            <div className="flex items-center justify-between">
              <Tag tone="brand">已出车 · 待取货</Tag>
              <span className="text-[12px] text-ink-3">距离 3.4km · 约 12 分钟</span>
            </div>
            <div className="mt-3 space-y-2">
              <div className="flex gap-2">
                <Icons.user size={16} className="mt-0.5 text-ink-3" />
                <div className="text-[14px]">
                  <div className="font-medium">上海鼎晟贸易有限公司 · 陈经理</div>
                  <div className="text-[13px] text-ink-3">138 0013 0000 <Sample /></div>
                </div>
              </div>
              <div className="flex gap-2">
                <Icons.pin size={16} className="mt-0.5 text-ink-3" />
                <div className="text-[14px]">浦东新区博云路 2 号 A 栋 3 层前台</div>
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              <Btn variant="ghost" icon="pin">导航</Btn>
              <Btn variant="outline" icon="user">联系</Btn>
            </div>
          </Card>

          <Card pad>
            <KV k="预约时效" v="今日 14:00 前" strong />
            <KV k="揽件员" v="王强（本人）" />
            <KV k="预估件数" v="约 6 件 / 45kg" />
            <KV k="备注" v="易碎，需泡沫加固" />
          </Card>

          <Card pad>
            <div className="mb-2 text-[13px] font-bold text-ink-2">可执行动作</div>
            <div className="grid grid-cols-2 gap-2 text-[13px]">
              <button className="rounded-lg border border-line py-2 text-ink-2">调整揽件员</button>
              <button className="rounded-lg border border-line py-2 text-ink-2">地址纠错</button>
              <button className="rounded-lg border border-line py-2 text-ink-2">到达打卡</button>
              <button className="rounded-lg border border-line py-2 text-ink-2">改约时间</button>
            </div>
          </Card>
        </div>
        <BottomBar>
          <Btn variant="outline">拒收登记</Btn>
          <Btn icon="scan" to="pickup">开始揽件</Btn>
        </BottomBar>
      </div>
    </Device>
  )
}

/* -------------------- Pickup form (long, grouped, progress) -------------------- */
function GroupHead({ n, title }: { n: number; title: string }) {
  return (
    <div className="mb-2 mt-1 flex items-center gap-2">
      <span className="grid h-6 w-6 place-items-center rounded-full bg-brand text-[13px] font-bold text-white">
        {n}
      </span>
      <span className="text-[15px] font-bold text-ink">{title}</span>
    </div>
  )
}

export function PickupForm() {
  return (
    <Device title="揽件表单（分组 + 进度）">
      <div className="flex min-h-full flex-col bg-page">
        <AppBar title="揽件" sub="LJ-20240926-0175" right={<span className="text-[13px] text-white/90">草稿已存</span>} />
        <div className="border-b border-line bg-white px-4 py-3">
          <Steps steps={["寄收件", "货物", "费用", "核对"]} active={1} />
        </div>
        <div className="flex-1 space-y-4 p-4">
          <div>
            <GroupHead n={1} title="寄收件信息" />
            <Card pad className="space-y-3">
              <Field label="寄件人" value="上海鼎晟贸易 · 陈经理" required />
              <Field label="寄件电话" value="138 0013 0000" required keyboard="数字键盘" />
              <Field label="收件人" value="深圳华胜电子 · 周先生" required />
              <Field label="收件地址" value="深圳市南山区科技园南路 88 号" required />
            </Card>
          </div>
          <div>
            <GroupHead n={2} title="货物信息" />
            <Card pad className="space-y-3">
              <div className="grid grid-cols-3 gap-2">
                <Field label="件数" value="6" required suffix="件" keyboard="数字" />
                <Field label="重量" value="45.0" required suffix="kg" keyboard="数字" />
                <Field label="体积" value="0.32" suffix="m³" keyboard="数字" />
              </div>
              <Field label="包装方式" value="纸箱 + 泡沫加固" />
              <Field label="物品名称" value="电子元器件" required />
              <div>
                <div className="mb-1 text-[13px] text-ink-2">货物拍照（1/3）</div>
                <div className="flex gap-2">
                  <div className="grid h-16 w-16 place-items-center rounded-xl bg-brand-tint text-brand">
                    <Icons.box size={22} />
                  </div>
                  <div className="grid h-16 w-16 place-items-center rounded-xl border-2 border-dashed border-line text-ink-3">
                    <Icons.camera size={22} />
                  </div>
                </div>
              </div>
            </Card>
          </div>
          <div>
            <GroupHead n={3} title="费用与付款" />
            <Card pad className="space-y-3">
              <Field label="运费" value="128.00" suffix="元" keyboard="数字" />
              <Field label="付款方式" value="到付" required />
              <div className="rounded-lg bg-warn-tint px-3 py-2 text-[12px] text-warn">
                <Icons.warn size={13} className="mr-1 inline" />
                收件电话为必填，请在提交前核对
              </div>
            </Card>
          </div>
        </div>
        <BottomBar>
          <Btn variant="outline" icon="print">预打标签</Btn>
          <Btn icon="check" to="pickedList">核对提交</Btn>
        </BottomBar>
      </div>
    </Device>
  )
}

export function PickedList() {
  return (
    <Device title="已揽件列表（+ 重打标签）">
      <div className="flex min-h-full flex-col bg-page">
        <AppBar title="已揽件列表" sub="今日 126 件" right={<Icons.search size={20} className="text-white/90" />} />
        <div className="flex-1 space-y-3 p-3">
          <Segments items={["今日", "本周", "全部"]} active={0} />
          {[
            { no: "YD-778120054", to: "深圳", pc: 6, w: "45kg", st: "已提交", tone: "ok" as Tone },
            { no: "YD-778120051", to: "杭州", pc: 2, w: "8kg", st: "已提交", tone: "ok" as Tone },
            { no: "YD-778120048", to: "北京", pc: 12, w: "88kg", st: "待上传", tone: "warn" as Tone },
          ].map((r) => (
            <Card key={r.no} pad className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[14px] font-medium">{r.no}</span>
                <Tag tone={r.tone}>{r.st}</Tag>
              </div>
              <div className="flex items-center justify-between text-[13px] text-ink-2">
                <span>目的地 {r.to} · {r.pc} 件 / {r.w}</span>
              </div>
              <div className="flex gap-2 border-t border-line pt-2">
                <button className="flex-1 rounded-lg border border-line py-1.5 text-[13px] text-ink-2">
                  查看
                </button>
                <button className="flex-1 rounded-lg bg-brand-tint py-1.5 text-[13px] font-medium text-brand">
                  <Icons.print size={14} className="mr-1 inline" /> 重打标签
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Device>
  )
}

export function VoidOrder() {
  return (
    <Device title="改单 / 作废（危险操作确认）">
      <div className="flex min-h-full flex-col bg-page">
        <AppBar title="改单作废" sub="YD-778120048" />
        <div className="flex-1 space-y-3 p-3">
          <Segments items={["改单", "作废"]} active={1} />
          <Card pad>
            <KV k="运单号" v="YD-778120048" strong />
            <KV k="客户" v="巨鲸电子商务" />
            <KV k="件数 / 重量" v="12 件 / 88kg" />
            <KV k="当前状态" v={<Tag tone="warn">待上传</Tag>} />
          </Card>
          <Card pad className="space-y-3">
            <Field label="作废原因" value="客户取消订单" required />
            <Field label="备注" placeholder="填写补充说明（选填）" />
          </Card>
        </div>
        {/* Confirm dialog overlay */}
        <div className="border-t border-line bg-white p-3">
          <div className="rounded-2xl border border-danger/30 bg-danger-tint p-4">
            <div className="flex items-center gap-2 text-danger">
              <Icons.warn size={20} />
              <span className="text-[15px] font-bold">确认作废该运单？</span>
            </div>
            <p className="mt-1.5 text-[13px] text-ink-2">
              作废后不可恢复，已打印标签将失效。请确认已与客户沟通。
            </p>
            <div className="mt-3 flex gap-2">
              <Btn variant="outline">取消</Btn>
              <Btn variant="danger" icon="x" to="resultOk" meta={{ title: "运单已作废", sub: "作废申请已生效", rows: [{ k: "业务单号", v: "YD-778120054" }, { k: "作废原因", v: "客户取消寄件" }, { k: "操作人", v: "张伟" }], note: "已同步财务冲销" }}>确认作废</Btn>
            </div>
          </div>
        </div>
      </div>
    </Device>
  )
}
