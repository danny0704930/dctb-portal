import { Link } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";
import { BarChart3, Megaphone, MessageSquareText, Lightbulb, ArrowUpRight, Home, Sparkles } from "lucide-react";
import { T } from "../theme";

// Add a new tool here any time you spin up a new dashboard.
// - internal: true  → renders as an internal route (e.g. /apogo), protected
//   by the same Clerk check as everything else. Add the matching <Route> in
//   App.jsx and a page component in src/pages/.
// - internal: false → external link (e.g. still a separate Vercel project /
//   subdomain that hasn't been migrated in yet). NOT covered by this app's
//   login — only use this for tools that don't need per-tool protection yet.
export const TOOLS = [
  {
    id: "sales",
    label: "Sales Dashboard",
    desc: "H1/H2 KPI 与四渠道销售数据总览",
    path: "/sales",
    icon: BarChart3,
    ready: false, // flip to true once the Sales page is migrated in
  },
  {
    id: "ads",
    label: "Ads Dashboard",
    desc: "Meta Ads 投放成效与预算分析",
    path: "/ads",
    icon: Megaphone,
    ready: false, // flip to true once the Ads page is migrated in
  },
  {
    id: "apogo",
    label: "APO GO 订阅看板",
    desc: "APO / COCO 订阅数据总览",
    path: "/apogo",
    icon: BarChart3,
    ready: true,
  },
  {
    id: "smarthome",
    label: "DCTB Smart Home 零售看板",
    desc: "门市 + 线上销售、销售员业绩总览",
    path: "/smarthome",
    icon: Home,
    ready: true,
  },
  {
    id: "wellskin",
    label: "Wellskin 销售看板",
    desc: "销售数据、客户回购分析 + AI 助手",
    path: "/wellskin",
    icon: Sparkles,
    ready: true,
  },
  {
    id: "review",
    label: "Review Generator",
    desc: "AI 评价文案生成工具（客户端 QR 用）",
    path: "/review",
    icon: MessageSquareText,
    ready: true,
    external: "https://review.dctb.my",
  },
];

function ToolCard({ tool }) {
  const Icon = tool.icon;
  const inner = (
    <div
      className="flex items-start gap-4 p-5 rounded-2xl transition-all"
      style={{
        background: T.cardLight,
        border: "1px solid rgba(255,180,84,0.14)",
        opacity: tool.ready ? 1 : 0.5,
        cursor: tool.ready ? "pointer" : "not-allowed",
      }}
    >
      <div
        className="flex items-center justify-center rounded-xl shrink-0"
        style={{ width: 42, height: 42, background: "rgba(255,180,84,0.12)" }}
      >
        <Icon size={20} color={T.amber} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span style={{ fontFamily: T.body, fontWeight: 700, fontSize: 15, color: T.porcelain }}>
            {tool.label}
          </span>
          {tool.ready && <ArrowUpRight size={14} color={T.sky} />}
        </div>
        <p style={{ fontFamily: T.body, fontSize: 12.5, color: T.sky, marginTop: 4, lineHeight: 1.5 }}>
          {tool.desc}
        </p>
        {!tool.ready && (
          <span
            style={{
              fontFamily: T.mono,
              fontSize: 10,
              letterSpacing: "0.08em",
              color: T.amber,
              display: "inline-block",
              marginTop: 8,
            }}
          >
            即将上线
          </span>
        )}
      </div>
    </div>
  );

  if (!tool.ready) return inner;

  // External (not yet migrated in) tools still open outside the protected
  // shell — kept as a plain link. Internal ones use React Router so they
  // never leave the Clerk-guarded app.
  if (tool.external) {
    return (
      <a href={tool.external} style={{ textDecoration: "none", display: "block" }}>
        {inner}
      </a>
    );
  }

  return (
    <Link to={tool.path} style={{ textDecoration: "none", display: "block" }}>
      {inner}
    </Link>
  );
}

export default function Menu() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6" style={{ background: T.ink }}>
      <div
        className="w-full max-w-md rounded-3xl overflow-hidden"
        style={{ background: T.card, border: "1px solid rgba(255,180,84,0.14)" }}
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <div
                className="flex items-center justify-center rounded-xl"
                style={{ width: 30, height: 30, background: "rgba(255,180,84,0.12)" }}
              >
                <Lightbulb size={16} color={T.amber} />
              </div>
              <span style={{ fontFamily: T.mono, fontSize: 10.5, letterSpacing: "0.14em", color: T.amber }}>
                DCTB
              </span>
            </div>
            <UserButton afterSignOutUrl="/" />
          </div>
          <h1 style={{ fontFamily: T.body, fontWeight: 800, fontSize: 20, color: T.porcelain, marginBottom: 6 }}>
            内部工具入口
          </h1>
          <p style={{ fontFamily: T.body, fontSize: 12.5, color: T.sky, lineHeight: 1.5 }}>
            选择要打开的工具，点击后会跳转到对应的 dashboard。
          </p>
        </div>

        {/* Tool list */}
        <div className="px-6 py-5 flex flex-col gap-3">
          {TOOLS.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>

        {/* Footer */}
        <div
          className="px-6 py-4 text-center"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            fontFamily: T.body,
            fontSize: 11.5,
            color: T.sky,
          }}
        >
          DCTB Smart Home · 内部使用
        </div>
      </div>
    </div>
  );
}
