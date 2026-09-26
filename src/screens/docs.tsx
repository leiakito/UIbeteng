import React from "react"
import { Icons, Tag, IconKey } from "../components/kit"

function Panel({ title, sub, children }: { title: string; sub?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-line bg-white p-6 shadow-[0_1px_2px_rgba(30,20,40,.04)]">
      <h3 className="text-[18px] font-bold text-ink">{title}</h3>
      {sub && <p className="mt-1 text-[13px] text-ink-3">{sub}</p>}
      <div className="mt-4">{children}</div>
    </section>
  )
}

/* -------------------- Information architecture -------------------- */
const IA: { group: string; tone: any; icon: IconKey; modules: string[] }[] = [
  {
    group: "营业部",
    tone: "brand",
    icon: "box",
    modules: [
      "上车", "调度管理", "已揽件列表", "揽件", "开单", "营业点寄件", "装车", "开单装车",
      "封车", "解封", "改单作废", "派送装车", "派送签收", "渠道交货", "货物拍照", "下车",
      "运营调度", "时效成本查询", "外发申请", "外发补录及打印",
    ],
  },
  {
    group: "转运场",
    tone: "info",
    icon: "layers",
    modules: [
      "装车", "卸车", "封车", "解封", "打印交接单", "到港确认", "离港确认", "二次包装",
      "车辆与货物", "单票查询", "渠道交货", "货物拍照", "车辆检查", "外发补录",
    ],
  },
  {
    group: "司机",
    tone: "warn",
    icon: "truck",
    modules: [
      "上车", "下车", "司机作业", "费用申报", "现金加油", "故障申报", "我的提成",
      "进港点到", "车辆信息", "渠道交货", "货物拍照", "未签异常",
    ],
  },
  {
    group: "综合",
    tone: "ok",
    icon: "clipboard",
    modules: [
      "盘库", "盘亏补录", "待上传", "打印测试", "异常录入", "资产盘点", "称重/量体",
      "收款", "财务对账", "生成账单", "客户拣货", "查看库存", "贴标机打印", "SKU 打印",
      "协作查询", "时效监控预警", "运单资料上传", "揽件配置",
    ],
  },
]

function IAMap() {
  return (
    <Panel
      title="一、信息架构"
      sub="按岗位与权限展示可用入口。首页顶部分组「常用 / 营业部 / 转运场 / 司机 / 综合」，底部固定「工具 / 接单 / 我的」。"
    >
      <div className="mb-5 grid grid-cols-3 gap-3 rounded-xl bg-page p-4 text-center text-[13px]">
        <div className="rounded-lg bg-white p-3">
          <Icons.tools size={20} className="mx-auto mb-1 text-brand" />
          <div className="font-medium">工具</div>
          <div className="text-[12px] text-ink-3">标签与单据打印</div>
        </div>
        <div className="rounded-lg bg-white p-3">
          <Icons.clipboard size={20} className="mx-auto mb-1 text-brand" />
          <div className="font-medium">接单</div>
          <div className="text-[12px] text-ink-3">已开单 / 改单 / 作废</div>
        </div>
        <div className="rounded-lg bg-white p-3">
          <Icons.user size={20} className="mx-auto mb-1 text-brand" />
          <div className="font-medium">我的</div>
          <div className="text-[12px] text-ink-3">联系人 / 设置 / 版本 / 站点更新 / 日志上传 / 退出</div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {IA.map((g) => {
          const Ic = Icons[g.icon]
          return (
            <div key={g.group} className="rounded-xl border border-line p-4">
              <div className="mb-3 flex items-center gap-2">
                <Ic size={20} className="text-brand" />
                <span className="text-[15px] font-bold">{g.group}</span>
                <span className="ml-auto text-[12px] text-ink-3">{g.modules.length} 个模块</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {g.modules.map((m) => (
                  <span
                    key={m}
                    className="rounded-md bg-brand-tint px-2 py-1 text-[12px] text-brand"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>
      <p className="mt-4 rounded-lg bg-warn-tint px-3 py-2 text-[12px] text-warn">
        注：「调度管理」与「运营调度」为两个独立入口，分别设计；「增值费用录入」当前隐藏，不放入正式首页；「常用」为用户自配置的快捷入口。
      </p>
    </Panel>
  )
}

/* -------------------- Flow diagrams -------------------- */
function Flow({
  title,
  nodes,
}: {
  title: string
  nodes: { label: string; tone?: "brand" | "ok" | "warn" | "danger" | "info" }[]
}) {
  const bg = {
    brand: "bg-brand text-white",
    ok: "bg-ok text-white",
    warn: "bg-warn text-white",
    danger: "bg-danger text-white",
    info: "bg-info text-white",
  }
  return (
    <div>
      <div className="mb-2 text-[14px] font-bold text-ink-2">{title}</div>
      <div className="flex flex-wrap items-center gap-1.5">
        {nodes.map((n, i) => (
          <React.Fragment key={i}>
            <span className={`rounded-lg px-3 py-1.5 text-[12.5px] font-medium ${bg[n.tone ?? "brand"]}`}>
              {n.label}
            </span>
            {i < nodes.length - 1 && <Icons.chevron size={14} className="text-ink-3" />}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

function Flows() {
  return (
    <Panel title="二、关键业务流程" sub="登录后依据车辆状态引导；每个作业环节明确状态与可执行动作，并覆盖离线/待上传处理。">
      <div className="space-y-5">
        <Flow
          title="登录与状态引导"
          nodes={[
            { label: "登录（服务/账号）" },
            { label: "校验车辆状态", tone: "info" },
            { label: "继续上车 / 下车 / 新上车", tone: "warn" },
            { label: "岗位首页", tone: "ok" },
          ]}
        />
        <Flow
          title="调度管理 → 揽件"
          nodes={[
            { label: "待人工派单", tone: "warn" },
            { label: "分配揽件员" },
            { label: "已派单待取货" },
            { label: "出车 / 到达打卡", tone: "info" },
            { label: "待揽件" },
            { label: "揽件提交", tone: "ok" },
          ]}
        />
        <Flow
          title="揽件表单"
          nodes={[
            { label: "扫码/选单进入" },
            { label: "寄收件信息" },
            { label: "货物件数/重量/体积" },
            { label: "费用与付款" },
            { label: "核对提交", tone: "ok" },
            { label: "打印标签", tone: "info" },
          ]}
        />
        <Flow
          title="装卸 → 封车 → 到离港"
          nodes={[
            { label: "选择车次" },
            { label: "整票/单件扫码", tone: "info" },
            { label: "件数校验", tone: "warn" },
            { label: "封车" },
            { label: "交接/到港" },
            { label: "解封/卸车" },
            { label: "离港", tone: "ok" },
          ]}
        />
        <Flow
          title="司机作业"
          nodes={[
            { label: "上车（车牌/里程/定位）" },
            { label: "派送装车", tone: "info" },
            { label: "派送签收" },
            { label: "费用/故障申报", tone: "warn" },
            { label: "下车", tone: "ok" },
          ]}
        />
        <Flow
          title="离线处理（贯穿全流程）"
          nodes={[
            { label: "作业提交" },
            { label: "网络失败", tone: "danger" },
            { label: "写入待上传", tone: "warn" },
            { label: "自动/手动重传", tone: "info" },
            { label: "同步成功", tone: "ok" },
          ]}
        />
      </div>
    </Panel>
  )
}

/* -------------------- Visual spec -------------------- */
function Swatch({ name, hex, text = "#fff" }: { name: string; hex: string; text?: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-line">
      <div className="flex h-16 items-end p-2" style={{ background: hex, color: text }}>
        <span className="text-[11px] font-medium">{name}</span>
      </div>
      <div className="bg-white px-2 py-1.5 font-mono text-[11px] text-ink-2">{hex}</div>
    </div>
  )
}

function Spec() {
  return (
    <Panel title="三、视觉与组件规范" sub="沿用品牌紫，白色/浅灰底，状态色一致且非仅靠颜色区分。触控区 ≥48dp，正文 16–18sp。">
      <div className="space-y-6">
        <div>
          <div className="mb-2 text-[14px] font-bold">配色</div>
          <div className="grid grid-cols-3 gap-2 md:grid-cols-6">
            <Swatch name="主紫" hex="#693F83" />
            <Swatch name="深紫" hex="#5B3572" />
            <Swatch name="紫底" hex="#F3EEF7" text="#693F83" />
            <Swatch name="页面灰" hex="#F5F5F5" text="#4a4453" />
            <Swatch name="正文墨" hex="#1F1A24" />
            <Swatch name="次级" hex="#8A8494" />
            <Swatch name="成功" hex="#1F9D63" />
            <Swatch name="警告" hex="#D98317" />
            <Swatch name="失败" hex="#D5433C" />
            <Swatch name="信息" hex="#2F6FD0" />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <div className="mb-2 text-[14px] font-bold">字体与字号</div>
            <div className="space-y-1.5 rounded-xl bg-page p-4">
              <div className="text-[22px] font-black">思源黑体 · 标题 22/700</div>
              <div className="text-[17px] font-medium">正文主要信息 17sp</div>
              <div className="text-[14px] text-ink-2">辅助说明文字 14sp</div>
              <div className="font-mono text-[26px] tnum text-brand">128 件 · DM Mono 数字</div>
              <p className="pt-1 text-[12px] text-ink-3">
                中文正文 16–18sp；关键数字/扫码结果用等宽数字放大加粗；次级信息 12–14sp。
              </p>
            </div>
          </div>
          <div>
            <div className="mb-2 text-[14px] font-bold">间距与圆角</div>
            <div className="space-y-2 rounded-xl bg-page p-4 text-[13px] text-ink-2">
              <div>基础间距：4 / 8 / 12 / 16 / 24（8pt 栅格）</div>
              <div>页面内边距 16 · 卡片内边距 16 · 卡片间距 12</div>
              <div>圆角：输入 12 · 卡片 16 · 弹窗 20 · 标签 6</div>
              <div>触控目标 ≥ 48dp；主操作固定底部单手可及区</div>
              <div>分隔用 1px 发丝线 #ECECEF，不用重边框</div>
            </div>
          </div>
        </div>

        <div>
          <div className="mb-2 text-[14px] font-bold">状态标签（图标 + 文字，非仅颜色）</div>
          <div className="flex flex-wrap gap-2">
            <Tag tone="ok">扫码成功</Tag>
            <Tag tone="warn">重复扫描</Tag>
            <Tag tone="danger">格式错误</Tag>
            <Tag tone="info">待派单</Tag>
            <Tag tone="brand">已揽件</Tag>
            <Tag tone="muted">草稿</Tag>
          </div>
        </div>

        <div>
          <div className="mb-2 text-[14px] font-bold">统一组件库</div>
          <div className="flex flex-wrap gap-1.5">
            {[
              "岗位首页入口", "任务卡片", "状态标签", "件数统计条", "扫码输入区", "车次选择",
              "表单分组", "照片上传", "蓝牙/网络状态", "待上传提示", "底部主按钮", "确认弹窗", "结果反馈",
            ].map((c) => (
              <span key={c} className="rounded-md border border-line bg-white px-2.5 py-1 text-[12px] text-ink-2">
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Panel>
  )
}

export function Docs() {
  return (
    <div className="space-y-6">
      <IAMap />
      <Flows />
      <Spec />
    </div>
  )
}
