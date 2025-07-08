import React from "react";
import { TristanLayout, TopNav, NavTitle, TristanLogo, Tag, ProgressCircle, Icon, Button } from "tristan-ui";
import { ExampleData, status, team, priority, riskLevel, type ProjectDataType } from "../example-data";

// 由于Table组件可能不可用，我们先使用自定义表格
interface TableProps {
  data: ProjectDataType[];
}

function CustomTable({ data }: TableProps) {
  return (
    <div style={{ 
      border: "1px solid var(--color--border-secondary)",
      borderRadius: "8px",
      overflow: "auto",
      backgroundColor: "var(--color--bg-prime)"
    }}>
      <table style={{ 
        width: "100%", 
        borderCollapse: "collapse",
        minWidth: "1400px"
      }}>
        <thead>
          <tr style={{ backgroundColor: "var(--color--bg-pale)" }}>
            <th style={headerStyle}>Project Key</th>
            <th style={headerStyle}>Name</th>
            <th style={headerStyle}>Status</th>
            <th style={headerStyle}>Progress</th>
            <th style={headerStyle}>Team</th>
            <th style={headerStyle}>Priority</th>
            <th style={headerStyle}>Category</th>
            <th style={headerStyle}>Risk Level</th>
            <th style={headerStyle}>Start Date</th>
            <th style={headerStyle}>End Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr 
              key={`${index}-${item.id}`}
              style={{
                backgroundColor: index % 2 === 0 ? "var(--color--bg-prime)" : "var(--color--bg-pale)",
                borderBottom: "1px solid var(--color--border-secondary-trans)"
              }}
            >
              <td style={cellStyle}>{item.projectKey}</td>
              <td style={{ ...cellStyle, fontWeight: 500 }}>{item.name}</td>
              <td style={cellStyle}>
                <Tag color={status[item.status].color}>
                  {status[item.status].name}
                </Tag>
              </td>
              <td style={cellStyle}>
                <ProgressCircle 
                  progress={item.progress} 
                  size="small" 
                  showText 
                  color={item.progress === 100 ? "var(--color--semantic-success)" : "var(--color--semantic-active)"}
                />
              </td>
              <td style={cellStyle}>
                <Tag color={team[item.team].color}>
                  {team[item.team].name}
                </Tag>
              </td>
              <td style={cellStyle}>
                <Tag color={priority[item.priority].color}>
                  <Icon name={priority[item.priority].icon} size={16} />
                  <span style={{ marginLeft: "4px" }}>{priority[item.priority].name}</span>
                </Tag>
              </td>
              <td style={cellStyle}>{item.category}</td>
              <td style={cellStyle}>
                <Tag color={riskLevel[item.riskLevel].color}>
                  {riskLevel[item.riskLevel].name}
                </Tag>
              </td>
                             <td style={cellStyle}>{item.startDate?.toLocaleDateString() || "N/A"}</td>
               <td style={cellStyle}>{item.endDate?.toLocaleDateString() || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const headerStyle: React.CSSProperties = {
  padding: "12px 16px",
  textAlign: "left",
  fontWeight: 600,
  color: "var(--color--text-prime)",
  borderBottom: "2px solid var(--color--border-secondary)"
};

const cellStyle: React.CSSProperties = {
  padding: "12px 16px",
  color: "var(--color--text-prime)",
  verticalAlign: "middle"
};

export function Element(): React.ReactElement {
  return (
    <TristanLayout
      top={
        <TopNav
          left={[
            <TristanLogo width={32} height={32} />,
            <NavTitle title="Issues Table - Project Data Overview" />,
          ]}
          right={[
            <Button onClick={() => window.location.href = "/"}>
              Back to Timeline
            </Button>,
          ]}
        />
      }
      main={
        <div style={{ padding: "2rem" }}>
          <div style={{ marginBottom: "1rem" }}>
            <h2 style={{ color: "var(--color--text-prime)", marginBottom: "0.5rem" }}>
              Project Issues Overview
            </h2>
            <p style={{ color: "var(--color--text-secondary)" }}>
              A comprehensive table view of all project issues with status, progress, and team assignments.
              Total Projects: {ExampleData.length}
            </p>
          </div>
          
          <CustomTable data={ExampleData} />
        </div>
      }
    />
  );
} 