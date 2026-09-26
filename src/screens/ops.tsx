import React from "react"
import {
  Device, AppBar, Icons, Tag, Card, KV, Field, Btn, BottomBar, Segments, ScanZone,
  CountBar, Row, Sample, Tone,
} from "../components/kit"

/* Vehicle / trip selector */
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

/* -------------------- Loading scan — success -------------------- */
export function LoadScanOk() {
  return (
    <Device title="装车扫码 · 成功">
      <div className="flex min-h-full flex-col bg-page">
        <AppBar title="装车" sub="整票扫码" right={<Segments items={["整票", "单件"]} active={0} />} />
        <div className="flex-1 space-y-3 p-3">
          <TripSelect />
          <CountBar
            items={[
              { label: "本次扫描", value: "1", tone: "ok" },
              { label: "累计装车", value: "43", tone: "ink" },
              { label: "应装", value: "56" },
            ]}
          />
          <ScanZone
            hint="支持硬件扫码枪连续扫描，或点击手动输入"
            state={{ tone: "ok", text: "扫码成功 · 已装车", code: "YD-778120054" }}
          />
          <Card pad={false} className="p-3">
            <div className="mb-1 flex items-center justify-between px-1">
              <span className="text-[13px] font-bold text-ink-2">最近扫描</span>
              <span className="text-[12px] text-ink-3">下拉查看全部</span>
            </div>
            <Row title="YD-778120054" sub="6 件 · 深圳 · 09:41:22" icon="check" tone="ok" right={<Tag tone="ok" icon={false}>成功</Tag>} />
            <Row title="YD-778120051" sub="2 件 · 杭州 · 09:41:08" icon="check" tone="ok" right={<Tag tone="ok" icon={false}>成功</Tag>} />
            <Row title="YD-778120049" sub="4 件 · 南京 · 09:40:55" icon="check" tone="ok" right={<Tag tone="ok" icon={false}>成功</Tag>} />
          </Card>
        </div>
        <BottomBar>
          <Btn variant="outline" icon="camera">拍照</Btn>
          <Btn icon="scan">继续扫描</Btn>
        </BottomBar>
      </div>
    </Device>
  )
}

/* -------------------- Loading scan — error states -------------------- */
export function LoadScanErrors() {
  return (
    <Device title="装车扫码 · 异常与离线">
      <div className="flex min-h-full flex-col bg-page">
        <AppBar title="装车" sub="单件扫码" right={<Segments items={["整票", "单件"]} active={1} />} />
        <div className="flex-1 space-y-3 p-3">
          <div className="flex items-center gap-2 rounded-xl bg-danger-tint px-3 py-2 text-[13px] text-danger">
            <Icons.wifiOff size={18} />
            <span className="flex-1">网络中断，扫描将写入待上传，恢复后自动同步</span>
            <span className="font-mono font-medium">待传 5</span>
          </div>
          <CountBar
            items={[
              { label: "重复", value: "2", tone: "warn" },
              { label: "错误", value: "1", tone: "danger" },
              { label: "累计", value: "43", tone: "ink" },
            ]}
          />
          <ScanZone state={{ tone: "warn", text: "重复扫描 · 该件已装车", code: "YD-778120051" }} />
          <div className="space-y-2">
            <div className="flex items-center gap-2 rounded-xl bg-danger-tint px-3 py-2.5">
              <Icons.x size={18} className="text-danger" strokeWidth={2.4} />
              <span className="flex-1 text-[14px] font-medium text-danger">格式错误 · 非本系统单号</span>
              <span className="font-mono text-[13px] text-ink-2">A9921X</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-warn-tint px-3 py-2.5">
              <Icons.warn size={18} className="text-warn" />
              <span className="flex-1 text-[14px] font-medium text-warn">业务校验失败 · 车次不匹配</span>
              <span className="font-mono text-[13px] text-ink-2">YD-660...</span>
            </div>
          </div>
          <Card pad={false} className="p-3">
            <Row title="YD-778120051" sub="重复 · 09:42:10" icon="warn" tone="warn" right={<Tag tone="warn" icon={false}>重复</Tag>} />
            <Row title="A9921X" sub="格式错误 · 09:41:58" icon="x" tone="danger" right={<Tag tone="danger" icon={false}>错误</Tag>} />
          </Card>
        </div>
        <BottomBar>
          <Btn variant="outline" icon="upload">待上传 5</Btn>
          <Btn icon="scan">继续扫描</Btn>
        </BottomBar>
      </div>
    </Device>
  )
}

/* -------------------- Sealing + handover -------------------- */
export function SealHandover() {
  return (
    <Device title="封车 + 打印交接单">
      <div className="flex min-h-full flex-col bg-page">
        <AppBar title="封车" sub="HZ2409-018" />
        <div className="flex-1 space-y-3 p-3">
          <TripSelect />
          <Card pad>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[15px] font-bold">装车核对</span>
              <Tag tone="ok">件数一致</Tag>
            </div>
            <div className="flex divide-x divide-line">
              <div className="flex-1 text-center">
                <div className="font-mono text-[24px] font-medium text-ink tnum">56</div>
                <div className="text-[12px] text-ink-3">应装</div>
              </div>
              <div className="flex-1 text-center">
                <div className="font-mono text-[24px] font-medium text-ok tnum">56</div>
                <div className="text-[12px] text-ink-3">实装</div>
              </div>
              <div className="flex-1 text-center">
                <div className="font-mono text-[24px] font-medium text-ink-3 tnum">0</div>
                <div className="text-[12px] text-ink-3">差异</div>
              </div>
            </div>
          </Card>
          <Card pad className="space-y-3">
            <Field label="铅封号" value="FS-0099821" required keyboard="扫码/数字" />
            <Field label="下一站" value="杭州转运中心" required />
            <div>
              <div className="mb-1 text-[13px] text-ink-2">封车照片</div>
              <div className="grid h-16 w-16 place-items-center rounded-xl bg-brand-tint text-brand">
                <Icons.camera size={22} />
              </div>
            </div>
          </Card>
          <div className="flex items-center gap-2 rounded-xl bg-info-tint px-3 py-2 text-[13px] text-info">
            <Icons.bluetooth size={16} /> 蓝牙打印机 已连接 · Zebra ZQ521
          </div>
        </div>
        <BottomBar>
          <Btn variant="outline" icon="print">打印交接单</Btn>
          <Btn variant="ok" icon="lock" to="resultOk" meta={{ title: "封车成功", sub: "铅封已登记并同步", rows: [{ k: "铅封号", v: "FS-0099821" }, { k: "车次", v: "HZ2409-018" }, { k: "封车件数", v: "56 件" }], note: "已打印封车交接单" }}>确认封车</Btn>
        </BottomBar>
      </div>
    </Device>
  )
}

/* -------------------- Port arrival / departure -------------------- */
export function Port() {
  return (
    <Device title="到港 / 离港确认">
      <div className="flex min-h-full flex-col bg-page">
        <AppBar title="到港确认" sub="杭州转运中心" />
        <div className="flex-1 space-y-3 p-3">
          <Segments items={["到港确认", "离港确认"]} active={0} />
          <TripSelect trip="HZ2409-018" plate="沪B·2F3K9" />
          <Card pad>
            <KV k="发车站点" v="上海浦东营业部" />
            <KV k="铅封号" v="FS-0099821" strong />
            <KV k="预计到港" v="今日 11:20" />
            <KV k="载货件数" v="56 件 / 3.2m³" />
          </Card>
          <Card pad>
            <div className="mb-2 text-[13px] font-bold text-ink-2">到港校验</div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[14px]">
                <Icons.check size={18} className="text-ok" strokeWidth={2.4} /> 铅封完好，与系统一致
              </div>
              <div className="flex items-center gap-2 text-[14px]">
                <Icons.pin size={18} className="text-ok" /> 定位在场区范围内
              </div>
              <div className="flex items-center gap-2 text-[14px] text-warn">
                <Icons.warn size={18} /> 到港较预计晚 18 分钟
              </div>
            </div>
          </Card>
          <div>
            <div className="mb-1 text-[13px] text-ink-2">到港照片</div>
            <div className="flex gap-2">
              <div className="grid h-16 w-16 place-items-center rounded-xl bg-brand-tint text-brand"><Icons.camera size={22} /></div>
              <div className="grid h-16 w-16 place-items-center rounded-xl border-2 border-dashed border-line text-ink-3"><Icons.plus size={22} /></div>
            </div>
          </div>
        </div>
        <BottomBar>
          <Btn variant="outline" icon="lock">解封</Btn>
          <Btn variant="ok" icon="pin" to="resultOk" meta={{ title: "到港确认成功", sub: "车辆到港已登记", rows: [{ k: "车次", v: "HZ2409-018" }, { k: "到港网点", v: "杭州转运中心" }, { k: "到港时间", v: "今日 09:52" }], note: "已推送卸车任务" }}>确认到港</Btn>
        </BottomBar>
      </div>
    </Device>
  )
}

/* -------------------- Driver boarding -------------------- */
export function DriverBoard() {
  return (
    <Device title="司机上车（里程/定位）">
      <div className="flex min-h-full flex-col bg-page">
        <AppBar title="司机上车" sub="王强 · 沪B·2F3K9" />
        <div className="flex-1 space-y-3 p-3">
          <Card pad>
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-tint text-brand">
                <Icons.truck size={26} />
              </div>
              <div>
                <div className="font-mono text-[18px] font-bold">沪B·2F3K9</div>
                <div className="text-[12px] text-ink-3">厢式货车 · 4.2m <Sample /></div>
              </div>
            </div>
          </Card>
          <Card pad className="space-y-3">
            <Field label="起始里程" value="128,460" required suffix="km" keyboard="数字键盘" />
            <div>
              <div className="mb-1 text-[13px] text-ink-2">里程表照片 <span className="text-danger">*</span></div>
              <div className="grid h-24 place-items-center rounded-xl bg-brand-tint text-brand">
                <div className="text-center">
                  <Icons.camera size={26} className="mx-auto" />
                  <div className="mt-1 text-[12px]">拍摄里程表</div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-ok-tint px-3 py-2 text-[13px] text-ok">
              <Icons.pin size={16} /> 定位成功 · 上海浦东营业部（±8m）
            </div>
          </Card>
        </div>
        <BottomBar>
          <Btn icon="check" to="resultOk" meta={{ title: "上车提交成功", sub: "装车任务已发起", rows: [{ k: "车次", v: "HZ2409-018" }, { k: "司机", v: "王强" }, { k: "计划件数", v: "56 件" }] }}>提交上车</Btn>
        </BottomBar>
      </div>
    </Device>
  )
}

/* -------------------- Driver tasks + channel delivery -------------------- */
export function DriverTasks() {
  return (
    <Device title="司机作业 · 渠道交货">
      <div className="flex min-h-full flex-col bg-page">
        <AppBar title="司机作业" sub="今日任务 8 单" />
        <div className="flex-1 space-y-3 p-3">
          <Segments items={["派送", "签收", "渠道交货"]} active={2} />
          <div className="rounded-xl bg-white p-2">
            <Segments items={["按渠道商", "按客户订单"]} active={0} />
          </div>
          <Card pad className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[15px] font-bold">顺丰同城 · 华东仓</span>
              <Tag tone="info">待交货</Tag>
            </div>
            <KV k="交货件数" v="24 件" strong />
            <KV k="渠道单号" v="SF-CH-20240926-77" />
            <Btn variant="ghost" icon="scan">扫码交货</Btn>
          </Card>
          <Card pad className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[15px] font-bold">京东物流 · 青浦</span>
              <Tag tone="ok">已交货</Tag>
            </div>
            <KV k="交货件数" v="12 件" />
            <KV k="交接人" v="李明 · 11:02" />
          </Card>
          <Card pad className="border-danger/30">
            <div className="flex items-center justify-between">
              <span className="text-[15px] font-bold">德邦 · 松江</span>
              <Tag tone="danger">未签异常</Tag>
            </div>
            <div className="mt-1 text-[13px] text-danger">对方拒收 2 件，需登记异常</div>
            <Btn variant="danger" className="mt-2" icon="warn">登记异常</Btn>
          </Card>
        </div>
      </div>
    </Device>
  )
}

/* -------------------- Delivery signing -------------------- */
export function Signing() {
  return (
    <Device title="派送签收">
      <div className="flex min-h-full flex-col bg-page">
        <AppBar title="派送签收" sub="YD-778120054" />
        <div className="flex-1 space-y-3 p-3">
          <Card pad>
            <KV k="收件人" v="深圳华胜电子 · 周先生" strong />
            <KV k="件数" v="6 件" />
            <KV k="付款" v={<Tag tone="warn">到付 128 元</Tag>} />
          </Card>
          <Card pad>
            <div className="mb-2 text-[13px] font-bold text-ink-2">签收方式</div>
            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-lg border-2 border-brand bg-brand-tint py-3 text-center text-[13px] font-medium text-brand">
                <Icons.sign size={22} className="mx-auto mb-1" /> 手写签名
              </div>
              <div className="rounded-lg border border-line py-3 text-center text-[13px] text-ink-2">
                <Icons.camera size={22} className="mx-auto mb-1" /> 拍照签收
              </div>
              <div className="rounded-lg border border-line py-3 text-center text-[13px] text-ink-2">
                <Icons.scan size={22} className="mx-auto mb-1" /> 验证码
              </div>
            </div>
          </Card>
          <div className="rounded-2xl border-2 border-dashed border-line bg-white p-4">
            <div className="grid h-28 place-items-center text-ink-3">
              <div className="text-center">
                <Icons.sign size={28} className="mx-auto text-brand/40" />
                <div className="mt-1 text-[12px]">请收件人在此签名</div>
              </div>
            </div>
          </div>
        </div>
        <BottomBar>
          <Btn variant="outline">清除</Btn>
          <Btn variant="ok" icon="check" to="resultOk" meta={{ title: "签收成功", sub: "运单已完成派送签收", rows: [{ k: "业务单号", v: "YD-778120054" }, { k: "签收人", v: "周先生" }, { k: "签收时间", v: "今日 11:42" }], note: "已发送签收回单短信" }}>确认签收</Btn>
        </BottomBar>
      </div>
    </Device>
  )
}

/* -------------------- Comprehensive: weighing (success feedback) -------------------- */
export function Weigh() {
  return (
    <Device title="综合作业 · 称重/量体（成功反馈）">
      <div className="flex min-h-full flex-col bg-page">
        <AppBar title="称重 / 量体" sub="SKU 采集" right={<Icons.bluetooth size={20} className="text-white/90" />} />
        <div className="flex-1 space-y-3 p-3">
          <ScanZone placeholder="扫描 SKU 条码" state={{ tone: "ok", text: "已读取 SKU", code: "SKU-88012" }} />
          <Card pad>
            <div className="text-center">
              <div className="text-[13px] text-ink-3">当前重量（蓝牙电子秤）</div>
              <div className="font-mono text-[46px] font-medium leading-tight text-brand tnum">
                12.48<span className="ml-1 text-[20px] text-ink-3">kg</span>
              </div>
              <Tag tone="ok">读数稳定</Tag>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              <Field label="长" value="60" suffix="cm" />
              <Field label="宽" value="40" suffix="cm" />
              <Field label="高" value="35" suffix="cm" />
            </div>
            <div className="mt-2 flex justify-between rounded-lg bg-brand-tint px-3 py-2 text-[14px]">
              <span className="text-ink-2">体积重</span>
              <span className="font-mono font-bold text-brand">14.00 kg</span>
            </div>
          </Card>
          <div className="flex items-center gap-2 rounded-xl bg-ok-tint px-3 py-3">
            <Icons.check size={20} className="text-ok" strokeWidth={2.4} />
            <span className="text-[14px] font-medium text-ok">已保存，可继续下一件（累计 37 件）</span>
          </div>
        </div>
        <BottomBar>
          <Btn variant="outline">复称</Btn>
          <Btn variant="ok" icon="check">保存并继续</Btn>
        </BottomBar>
      </div>
    </Device>
  )
}

/* -------------------- Inventory empty / loading / permission -------------------- */
export function InventoryStates() {
  return (
    <Device title="查看库存 · 空/加载/无权限">
      <div className="flex min-h-full flex-col bg-page">
        <AppBar title="查看库存" sub="上海浦东仓" right={<Icons.refresh size={20} className="text-white/90" />} />
        <div className="flex-1 space-y-3 p-3">
          <div className="flex items-center gap-2 rounded-xl border border-line bg-white px-3 py-2">
            <Icons.search size={18} className="text-ink-3" />
            <span className="flex-1 text-[14px] text-ink-3">搜索 SKU / 品名</span>
          </div>

          <div className="rounded-xl bg-white p-3 text-[12px] font-bold text-ink-3">空数据</div>
          <Card pad>
            <div className="grid place-items-center py-6 text-center">
              <div className="grid h-16 w-16 place-items-center rounded-full bg-page">
                <Icons.box size={30} className="text-ink-3" />
              </div>
              <div className="mt-3 text-[15px] font-medium">暂无库存记录</div>
              <div className="mt-1 text-[13px] text-ink-3">调整筛选条件或下拉刷新</div>
            </div>
          </Card>

          <div className="rounded-xl bg-white p-3 text-[12px] font-bold text-ink-3">加载中</div>
          <Card pad className="space-y-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-10 w-10 animate-pulse rounded-lg bg-page" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-2/3 animate-pulse rounded bg-page" />
                  <div className="h-3 w-1/3 animate-pulse rounded bg-page" />
                </div>
              </div>
            ))}
          </Card>

          <div className="rounded-xl bg-white p-3 text-[12px] font-bold text-ink-3">无权限</div>
          <Card pad>
            <div className="grid place-items-center py-6 text-center">
              <Icons.lock size={30} className="text-ink-3" />
              <div className="mt-2 text-[15px] font-medium">暂无查看库存权限</div>
              <div className="mt-1 text-[13px] text-ink-3">请联系站点管理员开通</div>
            </div>
          </Card>
        </div>
      </div>
    </Device>
  )
}

/* -------------------- Pending upload -------------------- */
export function PendingUpload() {
  return (
    <Device title="待上传">
      <div className="flex min-h-full flex-col bg-page">
        <AppBar title="待上传数据" sub="共 8 条 · 3 条失败" right={<Icons.refresh size={20} className="text-white/90" />} />
        <div className="flex-1 space-y-3 p-3">
          <div className="flex items-center gap-2 rounded-xl bg-warn-tint px-3 py-2.5 text-[13px] text-warn">
            <Icons.wifiOff size={18} />
            <span className="flex-1">网络恢复后将自动重传，也可手动上传</span>
          </div>
          <Card pad={false} className="p-2">
            <Row title="装车扫描 · HZ2409-018" sub="12 条 · 09:42" icon="upload" tone="warn" right={<Tag tone="warn" icon={false}>待传</Tag>} />
            <Row title="揽件提交 · YD-778120048" sub="88kg · 09:15" icon="upload" tone="warn" right={<Tag tone="warn" icon={false}>待传</Tag>} />
            <Row title="签收 · YD-778119920" sub="上传失败 · 图片过大" icon="x" tone="danger" right={<Tag tone="danger" icon={false}>失败</Tag>} />
            <Row title="故障申报 · 沪B·2F3K9" sub="上传失败 · 超时重试 2/3" icon="x" tone="danger" right={<Tag tone="danger" icon={false}>失败</Tag>} />
            <Row title="称重 · SKU-88012" sub="已同步 · 09:03" icon="check" tone="ok" right={<Tag tone="ok" icon={false}>成功</Tag>} />
          </Card>
        </div>
        <BottomBar>
          <Btn variant="outline">清除已成功</Btn>
          <Btn icon="upload">全部重传</Btn>
        </BottomBar>
      </div>
    </Device>
  )
}

/* -------------------- Print / tools -------------------- */
export function PrintTools() {
  return (
    <Device title="工具 · 打印">
      <div className="flex min-h-full flex-col bg-page">
        <AppBar title="打印" sub="标签与单据" tone="white" back={false} />
        <div className="flex-1 space-y-3 p-3">
          <Card pad>
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-info-tint text-info">
                <Icons.bluetooth size={24} />
              </div>
              <div className="flex-1">
                <div className="text-[15px] font-bold">Zebra ZQ521</div>
                <div className="text-[12px] text-ok">已连接 · 电量 76% · 纸张正常</div>
              </div>
              <button className="rounded-lg border border-line px-3 py-1.5 text-[13px] text-ink-2">切换</button>
            </div>
          </Card>
          <div className="text-[13px] font-bold text-ink-2">标签打印</div>
          <Card pad={false} className="p-2">
            <Row title="运单标签" sub="面单 100×150mm" icon="print" tone="brand" to="printLabel" />
            <Row title="SKU 标签" sub="商品条码" icon="print" tone="brand" to="printSku" />
            <Row title="贴标机打印" sub="批量贴标" icon="print" tone="brand" to="printLabel" />
          </Card>
          <div className="text-[13px] font-bold text-ink-2">单据打印</div>
          <Card pad={false} className="p-2">
            <Row title="交接单" sub="车次交接明细" icon="file" tone="info" to="seal" />
            <Row title="外发补录单" sub="外发申请回执" icon="file" tone="info" to="outboundPrint" />
            <Row title="打印测试" sub="校验打印机与纸张" icon="print" tone="muted" to="printTest" />
          </Card>
        </div>
      </div>
    </Device>
  )
}

/* -------------------- My / settings -------------------- */
export function Profile() {
  return (
    <Device title="我的 · 设置">
      <div className="flex min-h-full flex-col bg-page">
        <div className="bg-brand px-4 pb-5 pt-6 text-white">
          <div className="flex items-center gap-3">
            <div className="grid h-14 w-14 place-items-center rounded-full bg-white/20 text-[20px] font-bold">张</div>
            <div>
              <div className="text-[18px] font-bold">张伟</div>
              <div className="text-[13px] text-white/75">营业部主管 · 工号 88213</div>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 text-[12px]">
            <span className="flex items-center gap-1 rounded-md bg-white/15 px-2 py-1"><Icons.bluetooth size={13} /> 蓝牙已连</span>
            <span className="flex items-center gap-1 rounded-md bg-white/15 px-2 py-1"><Icons.wifi size={13} /> 在线</span>
            <span className="flex items-center gap-1 rounded-md bg-white/15 px-2 py-1">SH-PD-07</span>
          </div>
        </div>
        <div className="flex-1 space-y-3 p-3">
          <Card pad={false} className="p-2">
            <Row title="联系人" sub="站点通讯录" icon="user" tone="brand" to="contacts" />
            <Row title="设置" sub="扫码/打印/推送" icon="tools" tone="brand" to="settings" />
            <Row title="站点更新" sub="同步基础数据" icon="refresh" tone="info" to="siteUpdate" right={<Tag tone="info" icon={false}>有更新</Tag>} />
          </Card>
          <Card pad={false} className="p-2">
            <Row title="日志上传" sub="上传运行日志排障" icon="upload" tone="info" to="logUpload" />
            <Row title="版本" sub="v3.2.1（已是最新）" icon="clipboard" tone="muted" />
          </Card>
          <button className="flex w-full items-center justify-center gap-2 rounded-2xl border border-danger/30 bg-white py-3.5 text-[16px] font-bold text-danger">
            <Icons.x size={20} /> 退出登录
          </button>
        </div>
      </div>
    </Device>
  )
}
