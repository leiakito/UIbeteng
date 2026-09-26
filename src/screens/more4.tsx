import React from "react"
import {
  Device, AppBar, Icons, Card, KV, Btn, BottomBar, ScanZone, CountBar, Row,
  Tag, Sample, useNav, Segments,
} from "../components/kit"

/* ============================ 结果反馈 · 成功 ============================ */
export function ResultOk() {
  const nav = useNav()
  const m = nav.meta
  const rows = m?.rows ?? [
    { k: "业务单号", v: "YD-778120054" },
    { k: "操作类型", v: "派送签收" },
    { k: "操作时间", v: "今日 11:42:08" },
  ]
  return (
    <Device>
      <div className="flex min-h-full flex-col bg-page">
        <div className="flex flex-1 flex-col items-center px-6 pt-16 text-center">
          <div className="grid h-24 w-24 place-items-center rounded-full bg-ok-tint">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-ok text-white">
              <Icons.check size={40} strokeWidth={2.6} />
            </div>
          </div>
          <h2 className="mt-5 text-[22px] font-black text-ink">{m?.title ?? "提交成功"}</h2>
          <p className="mt-1 text-[14px] text-ink-3">{m?.sub ?? "操作已完成并同步至服务器"}</p>

          <Card pad className="mt-6 w-full text-left">
            {rows.map((r, i) => (
              <KV key={r.k} k={r.k} v={r.v} strong={i === 0} />
            ))}
            <KV k="同步状态" v={<Tag tone="ok">已同步</Tag>} />
          </Card>

          <div className="mt-4 flex w-full items-center gap-2 rounded-xl bg-info-tint px-3 py-2.5 text-left text-[13px] text-info">
            <Icons.print size={16} /> {m?.note ?? "已发送打印回单 · Zebra ZQ521"}
          </div>
        </div>
        <BottomBar>
          <Btn variant="outline" onClick={() => nav.go("home")}>返回首页</Btn>
          <Btn icon="scan" onClick={() => nav.back()}>继续下一单</Btn>
        </BottomBar>
      </div>
    </Device>
  )
}

/* ============================ 结果反馈 · 离线待同步 ============================ */
export function ResultOffline() {
  const nav = useNav()
  const m = nav.meta
  const rows = m?.rows ?? [
    { k: "业务单号", v: "YD-778120066" },
    { k: "操作类型", v: "装车扫描" },
    { k: "当前待传", v: "6 条" },
  ]
  return (
    <Device>
      <div className="flex min-h-full flex-col bg-page">
        <div className="flex flex-1 flex-col items-center px-6 pt-16 text-center">
          <div className="grid h-24 w-24 place-items-center rounded-full bg-warn-tint">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-warn text-white">
              <Icons.wifiOff size={38} strokeWidth={2} />
            </div>
          </div>
          <h2 className="mt-5 text-[22px] font-black text-ink">{m?.title ?? "已保存 · 待上传"}</h2>
          <p className="mt-1 text-[14px] text-ink-3">{m?.sub ?? "当前网络不可用,恢复后将自动同步"}</p>

          <Card pad className="mt-6 w-full text-left">
            {rows.map((r, i) => (
              <KV key={r.k} k={r.k} v={r.v} strong={i === 0} />
            ))}
            <KV k="本地保存" v={<Tag tone="warn">待上传</Tag>} />
          </Card>

          <div className="mt-4 flex w-full items-center gap-2 rounded-xl bg-warn-tint px-3 py-2.5 text-left text-[13px] text-warn">
            <Icons.warn size={16} /> 数据仅存于本设备,请勿在同步前清除应用数据
          </div>
        </div>
        <BottomBar>
          <Btn variant="outline" icon="upload" onClick={() => nav.go("pending")}>查看待上传</Btn>
          <Btn onClick={() => nav.back()}>继续作业</Btn>
        </BottomBar>
      </div>
    </Device>
  )
}

/* ============================ 渠道交货 · 扫码交接 ============================ */
export function ChannelHandover() {
  const nav = useNav()
  return (
    <Device>
      <div className="flex min-h-full flex-col bg-page">
        <AppBar title="渠道交货" sub="顺丰同城 · 华东仓" />
        <div className="flex-1 space-y-3 p-3">
          <Card pad>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand-tint text-brand"><Icons.layers size={20} /></div>
                <div>
                  <div className="text-[15px] font-bold">顺丰同城</div>
                  <div className="text-[12px] text-ink-3">渠道单号 SF-CH-20240926-77</div>
                </div>
              </div>
              <Tag tone="info">交接中</Tag>
            </div>
          </Card>
          <CountBar
            items={[
              { label: "本次交接", value: "1", tone: "ok" },
              { label: "已交", value: "18", tone: "ink" },
              { label: "应交", value: "24", tone: "warn" },
            ]}
          />
          <ScanZone placeholder="逐件扫码交接给渠道商" state={{ tone: "ok", text: "交接成功", code: "YD-778120066" }} />
          <Card pad={false} className="p-3">
            <div className="mb-1 px-1 text-[13px] font-bold text-ink-2">交接明细</div>
            <Row title="YD-778120066" sub="1 件 · 11:40" icon="check" tone="ok" right={<Tag tone="ok" icon={false}>已交</Tag>} />
            <Row title="YD-778120063" sub="2 件 · 11:39" icon="check" tone="ok" right={<Tag tone="ok" icon={false}>已交</Tag>} />
          </Card>
          <div className="rounded-xl bg-info-tint px-3 py-2.5 text-[13px] text-info">
            <Icons.sign size={14} className="mr-1 inline" /> 交接完成需渠道商签字或扫码确认
          </div>
        </div>
        <BottomBar>
          <Btn variant="outline" icon="scan">继续扫描</Btn>
          <Btn variant="ok" icon="sign" onClick={() => nav.go("resultOk")}>完成交接</Btn>
        </BottomBar>
      </div>
    </Device>
  )
}
