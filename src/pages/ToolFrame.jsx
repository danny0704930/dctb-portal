import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { T } from "../theme";

// Shared shell for embedded internal tools. Renders a slim top bar (back to
// menu + tool name) and fills the rest of the viewport with the given
// content — typically an <iframe srcDoc={...}> so the tool's own HTML/CSS/JS
// runs in total isolation without fighting the portal's Tailwind styles.
export default function ToolFrame({ title, children }) {
  return (
    <div className="min-h-screen w-full flex flex-col" style={{ background: T.ink }}>
      <div
        className="flex items-center gap-3 px-4 py-3"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", background: T.card }}
      >
        <Link
          to="/"
          className="flex items-center gap-1.5"
          style={{
            fontFamily: T.body,
            fontSize: 13,
            fontWeight: 600,
            color: T.sky,
            textDecoration: "none",
          }}
        >
          <ArrowLeft size={15} /> 返回入口
        </Link>
        <span style={{ color: "rgba(255,255,255,0.15)" }}>|</span>
        <span style={{ fontFamily: T.body, fontSize: 13, fontWeight: 700, color: T.porcelain }}>{title}</span>
      </div>
      <div style={{ flex: 1, minHeight: 0 }}>{children}</div>
    </div>
  );
}
