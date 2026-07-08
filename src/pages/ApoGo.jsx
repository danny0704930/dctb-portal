import ToolFrame from "./ToolFrame";
import apogoHtml from "./apogo-content.html?raw";

// The entire APO GO page (its own HTML/CSS/JS) is imported as a raw string
// at build time and rendered inside an iframe via srcDoc. This keeps its
// styles/scripts fully isolated from the portal's own Tailwind setup, and —
// crucially — means there is no separate public URL serving this file. It
// only exists bundled inside the portal's JS, so it's only ever reachable by
// going through this route, which sits behind the same Clerk <SignedIn>
// check as everything else in the app.
export default function ApoGo() {
  return (
    <ToolFrame title="APO GO 订阅看板">
      <iframe
        title="APO GO Subscription Dashboard"
        srcDoc={apogoHtml}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
      />
    </ToolFrame>
  );
}
