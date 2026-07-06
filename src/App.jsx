import { SignedIn, SignedOut, SignIn, UserButton } from "@clerk/clerk-react";
import { BarChart3, Megaphone, MessageSquareText, Lightbulb, ArrowUpRight } from "lucide-react";

// ---- Design tokens (matches the rest of the DCTB internal tools) ----
const T = {
  ink: "#10152B",
  card: "#1B2242",
  cardLight: "#242C52",
  amber: "#FFB454",
  amberDeep: "#E89A3C",
  porcelain: "#F5F1E8",
  sky: "#8B9BC4",
  mono: "'IBM Plex Mono', 'SF Mono', monospace",
  body: "-apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', 'Helvetica Neue', sans-serif",
};

// Add a new tool here any time you spin up a new dashboard — just give it a
// subdomain (e.g. xxx.dctb.my) once it's set up in Vercel + Exabytes DNS.
const TOOLS = [
  {
    id: "sales",
    label: "Sales Dashboard",
    desc: "H1/H2 KPI 与四渠道销售数据总览",
    url: "https://sales.dctb.my",
    icon: BarChart3,
    ready: false, // flip to true once sales.dctb.my is wired up
  },
  {
    id: "ads",
    label: "Ads Dashboard",
    desc: "Meta Ads 投放成效与预算分析",
    url: "https://ads.dctb.my",
    icon: Megaphone,
    ready: false, // flip to true once ads.dctb.my is wired up
  },
  {
    id: "review",
    label: "Review Generator",
    desc: "AI 评价文案生成工具（客户端 QR 用）",
    url: "https://review.dctb.my",
    icon: MessageSquareText,
    ready: true,
  },
];

function ToolCard({ tool }) {
  const Icon = tool.icon;
  const content = (
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

  if (!tool.ready) return content;

  return (
    <a href={tool.url} style={{ textDecoration: "none", display: "block" }}>
      {content}
    </a>
  );
}

export default function App() {
  return (
    <>
      <SignedOut>
        <div
          className="min-h-screen w-full flex flex-col items-center justify-center p-6 gap-6"
          style={{ background: T.ink }}
        >
          <div className="flex items-center gap-2">
            <div
              className="flex items-center justify-center rounded-xl"
              style={{ width: 30, height: 30, background: "rgba(255,180,84,0.12)" }}
            >
              <Lightbulb size={16} color={T.amber} />
            </div>
            <span style={{ fontFamily: T.mono, fontSize: 12, letterSpacing: "0.14em", color: T.amber }}>
              DCTB · 内部工具入口
            </span>
          </div>
          <SignIn />
        </div>
      </SignedOut>

      <SignedIn>
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
      </SignedIn>
    </>
  );
}
