import ToolFrame from "./ToolFrame";
import wellskinHtml from "./wellskin-content.html?raw";

export default function Wellskin() {
  return (
    <ToolFrame title="Wellskin 销售看板">
      <iframe
        title="Wellskin Sales Dashboard"
        srcDoc={wellskinHtml}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
      />
    </ToolFrame>
  );
}
