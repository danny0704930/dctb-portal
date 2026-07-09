import ToolFrame from "./ToolFrame";
import smartHomeHtml from "./dctbsmarthome-content.html?raw";

export default function DctbSmartHome() {
  return (
    <ToolFrame title="DCTB Smart Home 零售看板">
      <iframe
        title="DCTB Smart Home Retail Dashboard"
        srcDoc={smartHomeHtml}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
      />
    </ToolFrame>
  );
}
