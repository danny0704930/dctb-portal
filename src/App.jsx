import { Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut, SignIn } from "@clerk/clerk-react";
import { Lightbulb } from "lucide-react";
import { T } from "./theme";
import Menu from "./pages/Menu";
import ApoGo from "./pages/ApoGo";

// Single, app-wide auth gate. Whatever path the browser is on (/, /apogo,
// and any future internal tool route), an unauthenticated visitor only ever
// sees the SignedOut branch below — the actual page content in <Routes>
// never mounts until Clerk confirms the session. This is what makes every
// internal route "protected by default" without having to add Clerk checks
// to each individual page.
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
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/apogo" element={<ApoGo />} />
          {/* Add new internal tools here as they're migrated in, e.g.:
              <Route path="/sales" element={<Sales />} /> */}
        </Routes>
      </SignedIn>
    </>
  );
}
