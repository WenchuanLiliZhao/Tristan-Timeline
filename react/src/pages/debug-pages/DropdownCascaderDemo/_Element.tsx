import React, { useState } from "react";
import { 
  Dropdown, 
  Cascader, 
  type CascaderGroupProps,
  Button,
  Icon
} from "../../../design-system/ui-components";

export const Element: React.FC = () => {
  const [lastClicked, setLastClicked] = useState<string>("");

  // Sample data for demonstrations
  const basicGroups: CascaderGroupProps[] = [
    {
      groupTitle: "Recent",
      items: [
        {
          key: "recent1",
          content: <span>Recently Used Option 1</span>,
          value: "recent1"
        },
        {
          key: "recent2", 
          content: <span>Recently Used Option 2</span>,
          value: "recent2"
        }
      ]
    },
    {
      groupTitle: "Categories",
      items: [
        {
          key: "cat1",
          content: <span>Category A</span>,
          value: "category-a"
        },
        {
          key: "cat2",
          content: <span>Category B</span>,
          value: "category-b"
        },
        {
          key: "cat3",
          content: <span>Category C</span>,
          value: "category-c"
        }
      ]
    }
  ];

  const iconGroups: CascaderGroupProps[] = [
    {
      groupTitle: "Actions",
      items: [
        {
          key: "add",
          content: (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Icon name="add" />
              <span>Add New</span>
            </div>
          ),
          value: "add"
        },
        {
          key: "edit",
          content: (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Icon name="edit" />
              <span>Edit</span>
            </div>
          ),
          value: "edit"
        },
        {
          key: "delete",
          content: (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Icon name="delete" />
              <span>Delete</span>
            </div>
          ),
          value: "delete"
        }
      ]
    },
    {
      items: [
        {
          key: "settings",
          content: (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Icon name="settings" />
              <span>Settings</span>
            </div>
          ),
          value: "settings"
        }
      ]
    }
  ];

  const complexGroups: CascaderGroupProps[] = [
    {
      groupTitle: "Files",
      items: [
        {
          key: "file1",
          content: (
            <div>
              <div style={{ fontWeight: 'bold' }}>Document.pdf</div>
              <div style={{ fontSize: '12px', color: 'var(--color--text-secondary)' }}>
                Modified 2 hours ago
              </div>
            </div>
          ),
          value: "document.pdf"
        },
        {
          key: "file2",
          content: (
            <div>
              <div style={{ fontWeight: 'bold' }}>Presentation.pptx</div>
              <div style={{ fontSize: '12px', color: 'var(--color--text-secondary)' }}>
                Modified yesterday
              </div>
            </div>
          ),
          value: "presentation.pptx"
        }
      ]
    },
    {
      groupTitle: "Templates",
      items: [
        {
          key: "template1",
          content: (
            <div>
              <div style={{ fontWeight: 'bold' }}>Project Template</div>
              <div style={{ fontSize: '12px', color: 'var(--color--text-secondary)' }}>
                Use this template for new projects
              </div>
            </div>
          ),
          value: "project-template"
        }
      ]
    }
  ];

  const handleItemClick = (value: string | number | object | undefined) => {
    if (typeof value === 'string') {
      setLastClicked(value);
    }
  };

  return (
    <div
      style={{
        padding: "2rem",
        maxWidth: "1200px",
        margin: "0 auto",
        color: "var(--color--text-prime)",
      }}
    >
      <h1>Dropdown & Cascader Components Demo</h1>
      <p style={{ marginBottom: "2rem", color: "var(--color--text-secondary)" }}>
        Demonstration of flexible dropdown and cascader components with various use cases.
      </p>

      {/* Status Display */}
      {lastClicked && (
        <div style={{ 
          padding: "1rem", 
          backgroundColor: "var(--color--bg-subtle)", 
          borderRadius: "8px",
          marginBottom: "2rem"
        }}>
          <strong>Last clicked:</strong> {lastClicked}
        </div>
      )}

      {/* Basic Dropdown Examples */}
      <section style={{ marginBottom: "3rem" }}>
        <h2>Basic Dropdown Examples</h2>
        <p style={{ marginBottom: "1rem", color: "var(--color--text-secondary)" }}>
          Simple dropdowns with text triggers and grouped options.
        </p>
        
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "flex-start" }}>
          <Dropdown
            trigger={<Button variant="outlined">Select Category</Button>}
            groups={basicGroups}
            onItemClick={handleItemClick}
            width={250}
          />

          <Dropdown
            trigger={
              <div style={{ 
                padding: "8px 12px", 
                border: "1px solid var(--color--border-default)",
                borderRadius: "6px",
                cursor: "pointer",
                backgroundColor: "var(--color--bg-default)"
              }}>
                Custom Trigger ▼
              </div>
            }
            groups={basicGroups}
            onItemClick={handleItemClick}
            position="bottom-end"
            width={220}
          />
        </div>
      </section>

      {/* Dropdown with Icons */}
      <section style={{ marginBottom: "3rem" }}>
        <h2>Dropdown with Icons</h2>
        <p style={{ marginBottom: "1rem", color: "var(--color--text-secondary)" }}>
          Dropdowns containing items with icons and mixed content.
        </p>
        
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "flex-start" }}>
          <Dropdown
            trigger={<Button variant="filled" icon="more_vert">Actions</Button>}
            groups={iconGroups}
            onItemClick={handleItemClick}
            width={180}
          />

          <Dropdown
            trigger={
              <div style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: "8px 12px", 
                border: "1px solid var(--color--border-default)",
                borderRadius: "6px",
                cursor: "pointer",
                backgroundColor: "var(--color--bg-default)"
              }}>
                <Icon name="folder" />
                <span>File Menu</span>
                <Icon name="arrow_drop_down" />
              </div>
            }
            groups={iconGroups}
            onItemClick={handleItemClick}
            position="bottom-start"
            width={200}
          />
        </div>
      </section>

      {/* Complex Content Dropdown */}
      <section style={{ marginBottom: "3rem" }}>
        <h2>Complex Content Dropdown</h2>
        <p style={{ marginBottom: "1rem", color: "var(--color--text-secondary)" }}>
          Dropdowns with rich content including multi-line items and descriptions.
        </p>
        
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "flex-start" }}>
          <Dropdown
            trigger={<Button variant="ghost" icon="attachment">Recent Files</Button>}
            groups={complexGroups}
            onItemClick={handleItemClick}
            width={300}
            maxHeight={400}
          />
        </div>
      </section>

      {/* Standalone Cascader */}
      <section style={{ marginBottom: "3rem" }}>
        <h2>Standalone Cascader</h2>
        <p style={{ marginBottom: "1rem", color: "var(--color--text-secondary)" }}>
          Cascader component used independently without dropdown wrapper.
        </p>
        
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", alignItems: "flex-start" }}>
          <div>
            <h3 style={{ marginBottom: "0.5rem" }}>Basic Cascader</h3>
            <Cascader
              groups={basicGroups}
              onItemClick={handleItemClick}
              width={250}
            />
          </div>

          <div>
            <h3 style={{ marginBottom: "0.5rem" }}>Icon Cascader</h3>
            <Cascader
              groups={iconGroups}
              onItemClick={handleItemClick}
              width={200}
            />
          </div>
        </div>
      </section>

      {/* Position Examples */}
      <section style={{ marginBottom: "3rem" }}>
        <h2>Position Examples</h2>
        <p style={{ marginBottom: "1rem", color: "var(--color--text-secondary)" }}>
          Dropdowns with all 8 positioning options: top, bottom, left, and right with start/end alignment.
        </p>
        
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", 
          gap: "1.5rem",
          alignItems: "flex-start",
          padding: "2rem"
        }}>
          {/* Top Positions */}
          <Dropdown
            trigger={<Button variant="outlined" size="small">Top Start</Button>}
            groups={[{ items: [
              { key: "1", content: "Option 1", value: "1" },
              { key: "2", content: "Option 2", value: "2" }
            ]}]}
            onItemClick={handleItemClick}
            position="top-start"
            width={120}
          />

          <Dropdown
            trigger={<Button variant="outlined" size="small">Top End</Button>}
            groups={[{ items: [
              { key: "1", content: "Option 1", value: "1" },
              { key: "2", content: "Option 2", value: "2" }
            ]}]}
            onItemClick={handleItemClick}
            position="top-end"
            width={120}
          />

          {/* Bottom Positions */}
          <Dropdown
            trigger={<Button variant="outlined" size="small">Bottom Start</Button>}
            groups={[{ items: [
              { key: "1", content: "Option 1", value: "1" },
              { key: "2", content: "Option 2", value: "2" }
            ]}]}
            onItemClick={handleItemClick}
            position="bottom-start"
            width={120}
          />

          <Dropdown
            trigger={<Button variant="outlined" size="small">Bottom End</Button>}
            groups={[{ items: [
              { key: "1", content: "Option 1", value: "1" },
              { key: "2", content: "Option 2", value: "2" }
            ]}]}
            onItemClick={handleItemClick}
            position="bottom-end"
            width={120}
          />

          {/* Left Positions */}
          <Dropdown
            trigger={<Button variant="outlined" size="small">Left Start</Button>}
            groups={[{ items: [
              { key: "1", content: "Option 1", value: "1" },
              { key: "2", content: "Option 2", value: "2" }
            ]}]}
            onItemClick={handleItemClick}
            position="left-start"
            width={120}
          />

          <Dropdown
            trigger={<Button variant="outlined" size="small">Left End</Button>}
            groups={[{ items: [
              { key: "1", content: "Option 1", value: "1" },
              { key: "2", content: "Option 2", value: "2" }
            ]}]}
            onItemClick={handleItemClick}
            position="left-end"
            width={120}
          />

          {/* Right Positions */}
          <Dropdown
            trigger={<Button variant="outlined" size="small">Right Start</Button>}
            groups={[{ items: [
              { key: "1", content: "Option 1", value: "1" },
              { key: "2", content: "Option 2", value: "2" }
            ]}]}
            onItemClick={handleItemClick}
            position="right-start"
            width={120}
          />

          <Dropdown
            trigger={<Button variant="outlined" size="small">Right End</Button>}
            groups={[{ items: [
              { key: "1", content: "Option 1", value: "1" },
              { key: "2", content: "Option 2", value: "2" }
            ]}]}
            onItemClick={handleItemClick}
            position="right-end"
            width={120}
          />
        </div>

        <div style={{ 
          marginTop: "1.5rem", 
          padding: "1rem", 
          backgroundColor: "var(--color--bg-subtle)", 
          borderRadius: "6px",
          fontSize: "0.9rem",
          color: "var(--color--text-secondary)"
        }}>
          <strong>Position Guide:</strong>
          <ul style={{ marginTop: "0.5rem", paddingLeft: "1.5rem" }}>
            <li><strong>start:</strong> Aligns to the start edge (left for top/bottom, top for left/right)</li>
            <li><strong>end:</strong> Aligns to the end edge (right for top/bottom, bottom for left/right)</li>
            <li><strong>Smart positioning:</strong> Automatically adjusts if dropdown would overflow viewport</li>
          </ul>
        </div>
      </section>

      {/* Disabled State */}
      <section style={{ marginBottom: "3rem" }}>
        <h2>Disabled State</h2>
        <p style={{ marginBottom: "1rem", color: "var(--color--text-secondary)" }}>
          Examples of disabled dropdown components.
        </p>
        
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "flex-start" }}>
          <Dropdown
            trigger={<Button variant="outlined" disabled>Disabled Dropdown</Button>}
            groups={basicGroups}
            onItemClick={handleItemClick}
            disabled={true}
          />
        </div>
      </section>
    </div>
  );
}; 