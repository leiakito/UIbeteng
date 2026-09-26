import React from "react"
import {
  Device, AppBar, Icons, Tag, Card, KV, Field, Btn, BottomBar, Segments,
  ScanZone, CountBar, Row, Sample, useNav,
} from "../components/kit"

/* Shared printer status header */
function PrinterCard({
  name = "Zebra ZQ521",
  status = "已连接 · 电量 76% · 纸张正常",
}: {
  name?: string
  status?: string
}) {
  return (
    <Card pad>
      <div className="flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-xl bg-info-tint text-info">
          <Icons.bluetooth size={24} />
        </div>
        <div className="flex-1">
          <div className="text-[15px] font-bold">{name}</div>
          <div className="text-[12px] text-ok">{status}</div>
        </div>
        <button className="rounded-lg border border-line px-3 py-1.5 text-[13px] text-ink-2">切换</button>
      </div>
    </Card>
  )
}

function Stepper({ value = 1, label = "打印份数" }: { value?: number; label?: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-white px-3 py-2.5">
      <span className="text-[14px] font-medium text-ink-2">{label}</span>
      <div className="flex items-center gap-3">
        <button className="grid h-9 w-9 place-items-center rounded-lg bg-page text-ink-2"><Icons.x size={16} /></button>
        <span className="w-8 text-center font-mono text-[18px] font-bold tnum">{value}</span>
        <button className="grid h-9 w-9 place-items-center rounded-lg bg-brand-tint text-brand"><Icons.plus size={16} /></button>
      </div>
    </div>
  )
}

/* ============================ 标签打印（运单/贴标机） ============================ */
export function PrintLabel() {
  return (
    <Device>
      <div className="flex min-h-full flex-col bg-page">
        <AppBar title="标签打印" sub="运单面单 · 100×150mm" right={<Segments items={["面单", "贴标机"]} active={0} />} />
        <div className="flex-1 space-y-3 p-3">
          <PrinterCard />
          <ScanZone placeholder="扫描运单号自动带出面单" state={{ tone: "ok", text: "已加载面单", code: "YD-778120054" }} />
          <Card pad>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[13px] font-bold text-ink-2">面单预览 <Sample /></span>
              <Tag tone="ok">数据完整</Tag>
            </div>
            <div className="rounded-xl border border-dashed border-line bg-white p-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-mono text-[13px] text-ink-3">YD-778120054</div>
                  <div className="mt-1 text-[16px] font-black">深圳南山 · 到付</div>
                </div>
                <div className="grid h-14 w-14 place-items-center rounded bg-ink text-white"><Icons.scan size={30} /></div>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-y-0.5">
                <KV k="寄" v="上海鼎晟贸易" />
                <KV k="收" v="周先生" />
                <KV k="件数" v="6 件 / 45kg" />
                <KV k="金额" v="¥ 128.00" />
              </div>
            </div>
          </Card>
          <Stepper value={1} />
        </div>
        <BottomBar>
          <Btn variant="outline" icon="scan">重新扫描</Btn>
          <Btn icon="print" to="resultOk" meta={{ title: "打印已发送", sub: "面单已发送至打印机", rows: [{ k: "业务单号", v: "YD-778120054" }, { k: "标签类型", v: "运单面单 100×150" }, { k: "打印份数", v: "1 份" }], note: "打印中 · Zebra ZQ521" }}>打印面单</Btn>
        </BottomBar>
      </div>
    </Device>
  )
}

/* ============================ SKU 标签打印 ============================ */
export function PrintSku() {
  return (
    <Device>
      <div className="flex min-h-full flex-col bg-page">
        <AppBar title="SKU 标签打印" sub="商品条码 · 40×30mm" />
        <div className="flex-1 space-y-3 p-3">
          <PrinterCard />
          <ScanZone placeholder="扫描 SKU / 商品条码" state={{ tone: "ok", text: "已匹配商品", code: "SKU-88012" }} />
          <Card pad>
            <div className="mb-2 text-[13px] font-bold text-ink-2">商品信息</div>
            <KV k="SKU" v="SKU-88012" strong />
            <KV k="品名" v="家用净水滤芯 RO-400G" />
            <KV k="批次" v="B2409-07" />
            <KV k="库位" v="A-12-03" />
          </Card>
          <CountBar
            items={[
              { label: "本单需打", value: "24", tone: "ink" },
              { label: "已打印", value: "12", tone: "ok" },
              { label: "剩余", value: "12", tone: "warn" },
            ]}
          />
          <Stepper value={12} label="本次打印数量" />
        </div>
        <BottomBar>
          <Btn variant="outline" icon="clipboard">批量导入</Btn>
          <Btn icon="print" to="resultOk" meta={{ title: "SKU 标签已打印", sub: "条码标签已发送", rows: [{ k: "SKU", v: "SKU-88012" }, { k: "品名", v: "家用净水滤芯" }, { k: "打印数量", v: "12 张" }], note: "打印中 · 40×30mm" }}>打印标签</Btn>
        </BottomBar>
      </div>
    </Device>
  )
}

/* ============================ 打印测试 ============================ */
export function PrintTest() {
  return (
    <Device>
      <div className="flex min-h-full flex-col bg-page">
        <AppBar title="打印测试" sub="校验打印机与纸张" />
        <div className="flex-1 space-y-3 p-3">
          <PrinterCard />
          <Card pad>
            <div className="mb-2 text-[13px] font-bold text-ink-2">自检项</div>
            <Row title="蓝牙连接" sub="信号良好 -52dBm" icon="bluetooth" tone="ok" right={<Tag tone="ok" icon={false}>正常</Tag>} />
            <Row title="打印头温度" sub="41℃" icon="tools" tone="ok" right={<Tag tone="ok" icon={false}>正常</Tag>} />
            <Row title="纸张检测" sub="连续纸 · 余量约 60%" icon="file" tone="ok" right={<Tag tone="ok" icon={false}>就绪</Tag>} />
            <Row title="碳带/浓度" sub="浓度 8 / 15" icon="print" tone="warn" right={<Tag tone="warn" icon={false}>偏浅</Tag>} />
          </Card>
          <div className="rounded-xl bg-info-tint px-3 py-2.5 text-[13px] text-info">
            <Icons.print size={14} className="mr-1 inline" /> 打印测试页可校验对齐、浓度与条码可扫性
          </div>
        </div>
        <BottomBar>
          <Btn variant="outline" icon="tools">校准浓度</Btn>
          <Btn icon="print" to="resultOk" meta={{ title: "测试页已打印", sub: "请检查测试页质量", rows: [{ k: "打印机", v: "Zebra ZQ521" }, { k: "测试内容", v: "对齐 / 浓度 / 条码" }, { k: "浓度", v: "8 / 15" }], note: "如条码不清请上调浓度后重试" }}>打印测试页</Btn>
        </BottomBar>
      </div>
    </Device>
  )
}

/* ============================ 外发补录打印 ============================ */
export function OutboundPrint() {
  return (
    <Device>
      <div className="flex min-h-full flex-col bg-page">
        <AppBar title="外发补录打印" sub="外发申请回执" />
        <div className="flex-1 space-y-3 p-3">
          <PrinterCard />
          <Card pad className="space-y-3">
            <div className="text-[13px] font-bold text-ink-2">外发信息</div>
            <Field label="外发单号" value="WF-20240926-118" required />
            <Field label="外发渠道" value="德邦快递" required />
            <div className="grid grid-cols-2 gap-2">
              <Field label="件数" value="3" suffix="件" keyboard="数字" required />
              <Field label="外发费用" value="¥ 66.00" keyboard="数字" />
            </div>
          </Card>
          <div className="rounded-xl bg-warn-tint px-3 py-2.5 text-[13px] text-warn">
            <Icons.warn size={14} className="mr-1 inline" /> 补录后需打印回执随货交接,并上传外发凭证
          </div>
        </div>
        <BottomBar>
          <Btn variant="outline" icon="upload">上传凭证</Btn>
          <Btn icon="print" to="resultOk" meta={{ title: "外发回执已打印", sub: "补录已完成", rows: [{ k: "外发单号", v: "WF-20240926-118" }, { k: "外发渠道", v: "德邦快递" }, { k: "件数", v: "3 件" }], note: "回执随货交接 · 凭证已归档" }}>打印回执</Btn>
        </BottomBar>
      </div>
    </Device>
  )
}

/* ============================ 离港确认 ============================ */
export function Departure() {
  return (
    <Device>
      <div className="flex min-h-full flex-col bg-page">
        <AppBar title="离港确认" sub="车辆发车登记" />
        <div className="flex-1 space-y-3 p-3">
          <Card pad>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand-tint text-brand"><Icons.truck size={22} /></div>
                <div>
                  <div className="font-mono text-[15px] font-bold">HZ2409-021</div>
                  <div className="text-[12px] text-ink-3">沪B·2F3K9 · 司机 王强</div>
                </div>
              </div>
              <Tag tone="info">待发车</Tag>
            </div>
          </Card>
          <CountBar
            items={[
              { label: "计划装载", value: "56", tone: "ink" },
              { label: "已装", value: "56", tone: "ok" },
              { label: "封车", value: "已封", tone: "ok" },
            ]}
          />
          <Card pad className="space-y-3">
            <div className="text-[13px] font-bold text-ink-2">发车前核对</div>
            <Row title="铅封一致" sub="FS-0099821" icon="lock" tone="ok" right={<Tag tone="ok" icon={false}>已核</Tag>} />
            <Row title="随车单据" sub="交接单 · 危化证明" icon="file" tone="ok" right={<Tag tone="ok" icon={false}>齐全</Tag>} />
            <Row title="司机在岗打卡" sub="人脸核验通过" icon="user" tone="ok" right={<Tag tone="ok" icon={false}>已核</Tag>} />
          </Card>
          <div className="flex items-center gap-2 rounded-xl bg-ok-tint px-3 py-2.5 text-[13px] text-ok">
            <Icons.pin size={16} /> 离港定位：上海浦东转运场（±5m） · 今日 12:10
          </div>
        </div>
        <BottomBar>
          <Btn variant="outline" icon="clipboard">查看装载单</Btn>
          <Btn variant="ok" icon="pin" to="resultOk" meta={{ title: "离港确认成功", sub: "车辆已登记发车", rows: [{ k: "车次", v: "HZ2409-021" }, { k: "去向", v: "杭州转运中心" }, { k: "离港时间", v: "今日 12:10" }], note: "已推送在途跟踪与到港预约" }}>确认离港</Btn>
        </BottomBar>
      </div>
    </Device>
  )
}
