import React from "react";
import {
  RichTooltip,
  RichTooltipItem,
} from "../../../design-system/ui-components/data-display";
import { Button } from "../../../design-system/ui-components/general/Button";
import { getSemanticColor, grayColors } from "../../../styles";

export function Element(): React.ReactElement {
  const positions = [
    "bottom-start", // Default
    "bottom-end",
    "top-start",
    "top-end",
    "right-start",
    "right-end",
    "left-start",
    "left-end",
  ] as const;

  const tooltipItems = [
    <RichTooltipItem
      key="done"
      icon="check_circle"
      iconColor={getSemanticColor("success")}
      label="Done"
      value="32"
    />,
    <RichTooltipItem
      key="progress"
      icon="sync"
      iconColor={getSemanticColor("active")}
      label="In Progress"
      value="15"
    />,
    <RichTooltipItem
      key="pending"
      icon="pending"
      iconColor={`var(${grayColors.gray8})`}
      label="Pending"
      value="8"
    />,
  ];

  return (
    <div>
      {/* 固定显示的调试版本 - 使用完整的 TooltipPortal */}
      <div
        style={{
          padding: "20px",
          borderBottom: "2px solid #eee",
          marginBottom: "20px",
        }}
      >
        <h3 style={{ marginBottom: "16px", color: "#666" }}>
          🔧 固定显示调试版本 (完整 Portal + 定位)
        </h3>
        <RichTooltip trigger={<Button>test</Button>} alwaysVisible={true}>
          {tooltipItems}
        </RichTooltip>
      </div>

      {/* 原有的 hover 版本 */}
      <div
        style={{
          padding: "100px",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "120px",
          justifyItems: "center",
        }}
      >
        {/* Default position (bottom-start) */}
        <RichTooltip trigger={<Button>Default (bottom-start)</Button>}>
          {tooltipItems}
        </RichTooltip>

        {/* Other positions */}
        {positions
          .filter((p) => p !== "bottom-start")
          .map((position) => (
            <RichTooltip
              key={position}
              trigger={<Button>{position}</Button>}
              position={position}
            >
              {tooltipItems}
            </RichTooltip>
          ))}
      </div>
    </div>
  );
}
