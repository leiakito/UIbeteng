import React from "react"
import {
  Device, AppBar, Icons, Tag, Card, KV, Field, Btn, BottomBar, Segments, Chips,
  ScanZone, CountBar, Row, Sample, Tone,
} from "../components/kit"

/* ============================ 运营调度（区别于调度管理） ============================ */
export function OpsDispatch() {
  return (
    <Device>
      <div className="flex min-h-full flex-col bg-page">
        <AppBar title="运营调度" sub="站点全局看板" right={<Icons.refresh size={20} className="text-white/90" />} />
        <div className="flex-1 space-y-3 p-3">
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-2xl bg-brand p-4 text-white">
              <div className="text-[12px] text-white/75">在途车辆</div>
              <div className="font-mono text-[30px] font-bold tnum">12</div>
              <div className="text-[12px] text-white/70">正点 10 · 延误 2</div>
            </div>
            <div className="rounded-2xl bg-white p-4">
              <div className="text-[12px] text-ink-3">今日运力负荷</div>
              <div className="font-mono text-[30px] font-bold text-brand tnum">86%</div>
              <div className="text-[12px] text-warn">高峰临近饱和</div>
            </div>
          </div>
          <Card pad>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[14px] font-bold">车辆状态分布 <Sample /></span>
              <Tag tone="info">实时</Tag>
            </div>
            {[
              { l: "装车中", n: 4, c: "bg-brand", w: "40%" },
              { l: "在途", n: 12, c: "bg-info", w: "100%" },
              { l: "待卸", n: 3, c: "bg-warn", w: "30%" },
              { l: "空闲", n: 5, c: "bg-ink-3", w: "50%" },
            ].map((r) => (
              <div key={r.l} className="mb-2">
                <div className="mb-1 flex justify-between text-[13px]">
                  <span className="text-ink-2">{r.l}</span>
                  <span className="font-mono font-medium">{r.n}</span>
                </div>
                <div className="h-2 rounded-full bg-page">
                  <div className={"h-2 rounded-full " + r.c} style={{ width: r.w }} />
                </div>
              </div>
            ))}
          </Card>
          <Card pad>
            <div className="mb-2 text-[13px] font-bold text-ink-2">待调度事项</div>
            <Row title="沪B·2F3K9 延误 18min" sub="建议改派备用车" icon="warn" tone="warn" />
            <Row title="A 线运力不足" sub="缺口约 2 车次" icon="truck" tone="danger" />
            <Row title="杭州线待发 3 单" sub="等待配载" icon="box" tone="info" />
          </Card>
        </div>
        <BottomBar>
          <Btn variant="outline">配载建议</Btn>
          <Btn icon="truck">调派车辆</Btn>
        </BottomBar>
      </div>
    </Device>
  )
}

/* ============================ 司机下车 ============================ */
export function DriverOff() {
  return (
    <Device>
      <div className="flex min-h-full flex-col bg-page">
        <AppBar title="司机下车" sub="王强 · 沪B·2F3K9" />
        <div className="flex-1 space-y-3 p-3">
          <Card pad>
            <div className="flex items-center justify-between">
              <span className="text-[14px] font-bold">本次行程 <Sample /></span>
              <Tag tone="ok">任务完成</Tag>
            </div>
            <div className="mt-2 flex divide-x divide-line">
              <div className="flex-1 text-center"><div className="font-mono text-[22px] font-medium tnum">128,562</div><div className="text-[12px] text-ink-3">当前里程</div></div>
              <div className="flex-1 text-center"><div className="font-mono text-[22px] font-medium text-brand tnum">102</div><div className="text-[12px] text-ink-3">本程 km</div></div>
              <div className="flex-1 text-center"><div className="font-mono text-[22px] font-medium tnum">6.2</div><div className="text-[12px] text-ink-3">时长 h</div></div>
            </div>
          </Card>
          <Card pad className="space-y-3">
            <Field label="结束里程" value="128,562" required suffix="km" keyboard="数字键盘" />
            <div>
              <div className="mb-1 text-[13px] text-ink-2">里程表照片 <span className="text-danger">*</span></div>
              <div className="grid h-24 place-items-center rounded-xl bg-brand-tint text-brand">
                <div className="text-center"><Icons.camera size={26} className="mx-auto" /><div className="mt-1 text-[12px]">拍摄里程表</div></div>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-ok-tint px-3 py-2 text-[13px] text-ok">
              <Icons.pin size={16} /> 定位：上海浦东营业部（±6m）
            </div>
          </Card>
          <div className="rounded-xl bg-warn-tint px-3 py-2.5 text-[13px] text-warn">
            <Icons.warn size={14} className="mr-1 inline" /> 下车前请确认车厢已清空、无遗留货物
          </div>
        </div>
        <BottomBar>
          <Btn variant="ok" icon="check" to="resultOk" meta={{ title: "下车确认成功", sub: "本次行程已结束", rows: [{ k: "车次", v: "HZ2409-018" }, { k: "结束里程", v: "128,562 km" }, { k: "本程里程", v: "102 km" }], note: "里程表照片已归档" }}>确认下车</Btn>
        </BottomBar>
      </div>
    </Device>
  )
}

/* ============================ 派送装车 ============================ */
export function DeliveryLoad() {
  return (
    <Device>
      <div className="flex min-h-full flex-col bg-page">
        <AppBar title="派送装车" sub="王强 · 派送路线 A" />
        <div className="flex-1 space-y-3 p-3">
          <CountBar
            items={[
              { label: "本次", value: "1", tone: "ok" },
              { label: "已装", value: "17", tone: "ink" },
              { label: "待派", value: "24", tone: "warn" },
            ]}
          />
          <ScanZone placeholder="扫描派送运单装车" state={{ tone: "ok", text: "已装车 · 顺路 3 号点", code: "YD-778120066" }} />
          <Card pad={false} className="p-3">
            <div className="mb-1 flex items-center justify-between px-1">
              <span className="text-[13px] font-bold text-ink-2">派送顺序</span>
              <span className="text-[12px] text-brand">按路线排序</span>
            </div>
            <Row title="① 张江博云路 2 号" sub="3 件 · 陈经理" icon="pin" tone="brand" right={<Tag tone="ok" icon={false}>已装</Tag>} />
            <Row title="② 金科路 2889 号" sub="2 件 · 恒美家居" icon="pin" tone="brand" right={<Tag tone="ok" icon={false}>已装</Tag>} />
            <Row title="③ 世纪大道 100 号" sub="1 件 · 李女士" icon="pin" tone="muted" right={<Tag tone="warn" icon={false}>待装</Tag>} />
          </Card>
        </div>
        <BottomBar>
          <Btn variant="outline" icon="pin">规划路线</Btn>
          <Btn icon="truck" to="resultOk" meta={{ title: "派送出车成功", sub: "派送任务已下发", rows: [{ k: "路线", v: "派送路线 A" }, { k: "装车件数", v: "18 件" }, { k: "派送点", v: "3 个" }], note: "已按路线生成导航" }}>完成装车出车</Btn>
        </BottomBar>
      </div>
    </Device>
  )
}

/* ============================ 货物拍照 ============================ */
export function CargoPhoto() {
  return (
    <Device>
      <div className="flex min-h-full flex-col bg-page">
        <AppBar title="货物拍照" sub="YD-778120054" />
        <div className="flex-1 space-y-3 p-3">
          <ScanZone placeholder="扫描运单关联照片" state={{ tone: "ok", text: "已关联运单", code: "YD-778120054" }} />
          <Card pad>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[13px] font-bold text-ink-2">拍摄要求</span>
              <span className="text-[12px] text-ink-3">已拍 3 / 建议 5</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {["整体", "面单", "破损处"].map((t) => (
                <div key={t} className="relative aspect-square overflow-hidden rounded-xl bg-brand-tint">
                  <div className="grid h-full place-items-center text-brand"><Icons.box size={26} /></div>
                  <span className="absolute bottom-1 left-1 rounded bg-black/45 px-1.5 py-0.5 text-[11px] text-white">{t}</span>
                </div>
              ))}
              <button className="grid aspect-square place-items-center rounded-xl border-2 border-dashed border-brand-soft bg-white text-brand">
                <div className="text-center"><Icons.camera size={26} className="mx-auto" /><span className="text-[11px]">拍照</span></div>
              </button>
            </div>
          </Card>
          <div className="flex items-center gap-2 rounded-xl bg-info-tint px-3 py-2.5 text-[13px] text-info">
            <Icons.pin size={16} /> 照片自动附带时间、定位与操作人水印
          </div>
        </div>
        <BottomBar>
          <Btn variant="outline">重拍</Btn>
          <Btn icon="upload" to="resultOffline">保存并上传</Btn>
        </BottomBar>
      </div>
    </Device>
  )
}

/* ============================ 客户拣货 ============================ */
export function Picking() {
  return (
    <Device>
      <div className="flex min-h-full flex-col bg-page">
        <AppBar title="客户拣货" sub="拣货单 PK-20240926-12" />
        <div className="flex-1 space-y-3 p-3">
          <div className="flex items-center justify-between rounded-xl bg-brand-tint px-3 py-2.5">
            <div><div className="text-[12px] text-ink-3">客户</div><div className="text-[14px] font-medium">深圳华胜电子</div></div>
            <div className="text-right"><div className="font-mono text-[20px] font-bold text-brand tnum">8/12</div><div className="text-[12px] text-ink-3">已拣/应拣</div></div>
          </div>
          <ScanZone placeholder="扫描库位/SKU 拣货" state={{ tone: "ok", text: "拣货 +2 · A-03-12", code: "SKU-88015" }} />
          <Card pad={false} className="p-3">
            {[
              { sku: "SKU-88012 减震垫", loc: "A-01-05", need: 3, done: 3, tone: "ok" as Tone, t: "完成" },
              { sku: "SKU-88015 连接件", loc: "A-03-12", need: 5, done: 5, tone: "ok" as Tone, t: "完成" },
              { sku: "SKU-88021 支架", loc: "B-02-08", need: 4, done: 0, tone: "warn" as Tone, t: "待拣" },
            ].map((r) => (
              <Row key={r.sku} title={r.sku} sub={"库位 " + r.loc + " · " + r.done + "/" + r.need}
                icon={r.tone === "ok" ? "check" : "box"} tone={r.tone}
                right={<Tag tone={r.tone} icon={false}>{r.t}</Tag>} />
            ))}
          </Card>
        </div>
        <BottomBar>
          <Btn variant="outline">缺货登记</Btn>
          <Btn variant="ok" icon="check" to="resultOk" meta={{ title: "拣货完成", sub: "客户拣货已确认", rows: [{ k: "拣货单号", v: "JH-20240926-08" }, { k: "客户", v: "恒美家居" }, { k: "拣出件数", v: "12 件" }], note: "已生成出库单" }}>完成拣货</Btn>
        </BottomBar>
      </div>
    </Device>
  )
}

/* ============================ 财务对账 ============================ */
export function Reconcile() {
  return (
    <Device>
      <div className="flex min-h-full flex-col bg-page">
        <AppBar title="财务对账" sub="2026-09 账期" />
        <div className="flex-1 space-y-3 p-3">
          <Segments items={["待对账", "已对账", "有差异"]} active={0} />
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-xl bg-white p-3"><div className="text-[12px] text-ink-3">应收合计</div><div className="font-mono text-[20px] font-bold text-ink tnum">¥ 86,420</div></div>
            <div className="rounded-xl bg-white p-3"><div className="text-[12px] text-ink-3">已收合计</div><div className="font-mono text-[20px] font-bold text-ok tnum">¥ 82,180</div></div>
          </div>
          <div className="flex items-center justify-between rounded-xl bg-danger-tint px-3 py-3">
            <span className="text-[14px] font-medium text-danger">差异金额</span>
            <span className="font-mono text-[18px] font-bold text-danger">¥ 4,240</span>
          </div>
          <Card pad={false} className="p-3">
            <div className="mb-1 px-1 text-[13px] font-bold text-ink-2">对账明细</div>
            <Row title="巨鲸电子商务" sub="应收 12,400 / 已收 12,400" icon="check" tone="ok" right={<Tag tone="ok" icon={false}>相符</Tag>} />
            <Row title="恒美家居" sub="应收 8,600 / 已收 6,200" icon="warn" tone="warn" right={<Tag tone="danger" icon={false}>-2,400</Tag>} />
            <Row title="远大科技" sub="应收 5,840 / 已收 4,000" icon="warn" tone="warn" right={<Tag tone="danger" icon={false}>-1,840</Tag>} />
          </Card>
        </div>
        <BottomBar>
          <Btn variant="outline" icon="print">导出对账单</Btn>
          <Btn icon="check" to="resultOk" meta={{ title: "对账完成", sub: "账目已核对一致", rows: [{ k: "对账周期", v: "09-19 ~ 09-25" }, { k: "应收合计", v: "¥ 12,860" }, { k: "差异", v: "¥ 0" }], note: "对账单已生成" }}>确认对账</Btn>
        </BottomBar>
      </div>
    </Device>
  )
}

/* ============================ 生成账单 ============================ */
export function GenerateBill() {
  return (
    <Device>
      <div className="flex min-h-full flex-col bg-page">
        <AppBar title="生成账单" sub="月结客户" />
        <div className="flex-1 space-y-3 p-3">
          <Card pad className="space-y-3">
            <Field label="结算客户" value="巨鲸电子商务（月结）" required />
            <div className="grid grid-cols-2 gap-2">
              <Field label="账期起" value="2026-09-01" />
              <Field label="账期止" value="2026-09-30" />
            </div>
          </Card>
          <Card pad>
            <div className="mb-2 text-[13px] font-bold text-ink-2">账单汇总 <Sample /></div>
            <KV k="运单数" v="126 单" />
            <KV k="运费小计" v="¥ 11,800.00" />
            <KV k="增值服务" v="¥ 620.00" />
            <KV k="优惠减免" v="- ¥ 20.00" />
            <div className="mt-1 flex items-center justify-between border-t border-line pt-2">
              <span className="text-[14px] font-bold">账单合计</span>
              <span className="font-mono text-[24px] font-bold text-brand">¥ 12,400.00</span>
            </div>
          </Card>
          <div className="rounded-xl bg-ok-tint px-3 py-2.5 text-[13px] text-ok">
            <Icons.check size={14} className="mr-1 inline" strokeWidth={2.4} /> 126 单已全部完成，可生成账单
          </div>
        </div>
        <BottomBar>
          <Btn variant="outline" icon="print">预览打印</Btn>
          <Btn icon="file" to="resultOk" meta={{ title: "账单已生成", sub: "已发送至客户", rows: [{ k: "账单号", v: "ZD-20240926-05" }, { k: "客户", v: "上海鼎晟贸易" }, { k: "账单金额", v: "¥ 3,420" }], note: "已通过短信与邮件发送" }}>生成并发送</Btn>
        </BottomBar>
      </div>
    </Device>
  )
}

/* ============================ 我的 · 设置 ============================ */
function ToggleRow({ label, sub, on }: { label: string; sub?: string; on: boolean }) {
  return (
    <div className="flex items-center gap-3 border-b border-line py-3 last:border-0">
      <div className="flex-1">
        <div className="text-[15px] text-ink">{label}</div>
        {sub && <div className="text-[12px] text-ink-3">{sub}</div>}
      </div>
      <div className={"relative h-6 w-10 rounded-full transition " + (on ? "bg-brand" : "bg-line")}>
        <div className={"absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all " + (on ? "left-[18px]" : "left-0.5")} />
      </div>
    </div>
  )
}

export function Settings() {
  return (
    <Device statusTone="white">
      <div className="flex min-h-full flex-col bg-page">
        <AppBar title="设置" tone="white" />
        <div className="flex-1 space-y-3 p-3">
          <Card pad>
            <div className="mb-1 text-[13px] font-bold text-ink-2">扫码</div>
            <ToggleRow label="扫码后自动提交" sub="连续作业更快" on={true} />
            <ToggleRow label="扫码提示音" on={true} />
            <ToggleRow label="扫码震动反馈" on={false} />
          </Card>
          <Card pad>
            <div className="mb-1 text-[13px] font-bold text-ink-2">打印</div>
            <Row title="默认打印机" sub="Zebra ZQ521" icon="print" tone="brand" right={<span className="text-[13px] text-ink-3">切换</span>} />
            <ToggleRow label="标签打印后自动预览" on={false} />
            <Row title="标签模板" sub="面单 100×150mm" icon="file" tone="info" />
          </Card>
          <Card pad>
            <div className="mb-1 text-[13px] font-bold text-ink-2">通用</div>
            <ToggleRow label="消息推送" on={true} />
            <ToggleRow label="仅 Wi-Fi 下上传照片" sub="节省流量" on={true} />
            <Row title="清除缓存" sub="当前占用 128MB" icon="refresh" tone="muted" />
          </Card>
        </div>
      </div>
    </Device>
  )
}

/* ============================ 我的 · 联系人 ============================ */
export function Contacts() {
  const list = [
    { g: "本站点", people: [{ n: "李建国", r: "站长", p: "138 0000 0001" }, { n: "赵敏", r: "客服", p: "138 0000 0002" }] },
    { g: "调度中心", people: [{ n: "王海", r: "调度主管", p: "400 000 0000" }] },
    { g: "技术支持", people: [{ n: "系统热线", r: "7×24", p: "400 111 2222" }] },
  ]
  return (
    <Device>
      <div className="flex min-h-full flex-col bg-page">
        <AppBar title="联系人" sub="站点通讯录" right={<Icons.search size={20} className="text-white/90" />} />
        <div className="flex-1 space-y-3 p-3">
          {list.map((sec) => (
            <div key={sec.g}>
              <div className="mb-1 px-1 text-[13px] font-bold text-ink-2">{sec.g}</div>
              <Card pad={false} className="p-3">
                {sec.people.map((p) => (
                  <div key={p.n} className="flex items-center gap-3 border-b border-line py-2.5 last:border-0">
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-brand-tint text-[14px] font-bold text-brand">{p.n[0]}</div>
                    <div className="flex-1"><div className="text-[15px] font-medium">{p.n}</div><div className="text-[12px] text-ink-3">{p.r} · {p.p} <Sample /></div></div>
                    <div className="grid h-9 w-9 place-items-center rounded-full bg-ok-tint text-ok"><Icons.user size={18} /></div>
                  </div>
                ))}
              </Card>
            </div>
          ))}
        </div>
      </div>
    </Device>
  )
}

/* ============================ 我的 · 站点更新 ============================ */
export function SiteUpdate() {
  return (
    <Device>
      <div className="flex min-h-full flex-col bg-page">
        <AppBar title="站点更新" sub="基础数据同步" />
        <div className="flex-1 space-y-3 p-3">
          <Card pad className="text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand-tint text-brand"><Icons.refresh size={30} /></div>
            <div className="mt-3 text-[15px] font-bold">发现新数据包</div>
            <div className="mt-1 text-[13px] text-ink-3">上次同步：今日 08:12</div>
          </Card>
          <Card pad={false} className="p-3">
            <Row title="网点资料" sub="更新 12 条" icon="pin" tone="info" right={<Tag tone="warn" icon={false}>待更新</Tag>} />
            <Row title="计费规则" sub="更新 3 条" icon="file" tone="info" right={<Tag tone="warn" icon={false}>待更新</Tag>} />
            <Row title="渠道商名录" sub="已是最新" icon="layers" tone="ok" right={<Tag tone="ok" icon={false}>最新</Tag>} />
            <Row title="车辆档案" sub="已是最新" icon="truck" tone="ok" right={<Tag tone="ok" icon={false}>最新</Tag>} />
          </Card>
          <div className="rounded-xl bg-info-tint px-3 py-2.5 text-[13px] text-info">
            <Icons.warn size={14} className="mr-1 inline" /> 建议在 Wi-Fi 环境更新，约 8.6MB
          </div>
        </div>
        <BottomBar>
          <Btn icon="refresh">立即更新</Btn>
        </BottomBar>
      </div>
    </Device>
  )
}

/* ============================ 我的 · 日志上传 ============================ */
export function LogUpload() {
  return (
    <Device>
      <div className="flex min-h-full flex-col bg-page">
        <AppBar title="日志上传" sub="故障排查" />
        <div className="flex-1 space-y-3 p-3">
          <Card pad>
            <div className="mb-2 text-[13px] font-bold text-ink-2">选择日志范围</div>
            <Chips items={["今日", "近 3 天", "近 7 天", "全部"]} active={0} />
          </Card>
          <Card pad>
            <KV k="日志条数" v="1,284 条" />
            <KV k="预计大小" v="2.4 MB" />
            <KV k="设备型号" v="Chainway C66 <Sample />" />
            <KV k="App 版本" v="v3.2.1" />
          </Card>
          <Card pad>
            <div className="mb-2 text-[13px] font-bold text-ink-2">上传进度</div>
            <div className="mb-1 flex justify-between text-[13px]"><span className="text-ink-2">正在上传…</span><span className="font-mono text-brand">64%</span></div>
            <div className="h-2 rounded-full bg-page"><div className="h-2 w-[64%] rounded-full bg-brand" /></div>
          </Card>
          <div className="rounded-xl bg-info-tint px-3 py-2.5 text-[13px] text-info">
            <Icons.upload size={14} className="mr-1 inline" /> 上传后请把工单号告知技术支持
          </div>
        </div>
        <BottomBar>
          <Btn variant="outline">取消</Btn>
          <Btn icon="upload">上传日志</Btn>
        </BottomBar>
      </div>
    </Device>
  )
}

/* ============================ 揽件配置 ============================ */
export function PickupConfig() {
  return (
    <Device>
      <div className="flex min-h-full flex-col bg-page">
        <AppBar title="揽件配置" sub="默认参数" />
        <div className="flex-1 space-y-3 p-3">
          <Card pad>
            <div className="mb-1 text-[13px] font-bold text-ink-2">默认值</div>
            <Row title="默认产品类型" sub="标准零担" icon="box" tone="brand" right={<span className="text-[13px] text-ink-3">修改</span>} />
            <Row title="默认包装方式" sub="纸箱" icon="box" tone="brand" right={<span className="text-[13px] text-ink-3">修改</span>} />
            <Row title="默认付款方式" sub="到付" icon="file" tone="brand" right={<span className="text-[13px] text-ink-3">修改</span>} />
          </Card>
          <Card pad>
            <div className="mb-1 text-[13px] font-bold text-ink-2">必填校验</div>
            <ToggleRow label="收件电话必填" on={true} />
            <ToggleRow label="体积必填" on={false} />
            <ToggleRow label="揽件须拍照" on={true} />
          </Card>
          <Card pad>
            <div className="mb-1 text-[13px] font-bold text-ink-2">效率</div>
            <ToggleRow label="提交后自动打印标签" on={true} />
            <ToggleRow label="保留上一单寄件人" on={true} />
          </Card>
        </div>
        <BottomBar>
          <Btn icon="check">保存配置</Btn>
        </BottomBar>
      </div>
    </Device>
  )
}
