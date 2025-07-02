import React from "react";
import { Button } from "../../../design-system/ui-components/general";

export const Element: React.FC = () => {
  return (
    <div
      style={{
        padding: "2rem",
        maxWidth: "1200px",
        margin: "0 auto",
        color: "var(--color--text-prime)",
      }}
    >
      <div>
        <h2>Outlined</h2>
        <br />
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Button
            icon="add"
            decoIcon="arrow_drop_down"
            variant="outlined"
            size="medium"
            semantic="default"
            disabled={false}
            onClick={() => {}}
            type="button"
            className=""
            data-testid=""
          >
            Add
          </Button>

          <Button
            icon="add"
            decoIcon="arrow_drop_down"
            variant="outlined"
            size="medium"
            semantic="success"
            disabled={false}
            onClick={() => {}}
            type="button"
            className=""
            data-testid=""
          >
            Add
          </Button>

          <Button
            icon="add"
            decoIcon="arrow_drop_down"
            variant="outlined"
            size="medium"
            semantic="active"
            disabled={false}
            onClick={() => {}}
            type="button"
            className=""
            data-testid=""
          >
            Add
          </Button>

          <Button
            icon="add"
            decoIcon="arrow_drop_down"
            variant="outlined"
            size="medium"
            semantic="warning"
            disabled={false}
            onClick={() => {}}
            type="button"
            className=""
            data-testid=""
          >
            Add
          </Button>

          <Button
            icon="add"
            decoIcon="arrow_drop_down"
            variant="outlined"
            size="medium"
            semantic="error"
            disabled={false}
            onClick={() => {}}
            type="button"
            className=""
            data-testid=""
          >
            Add
          </Button>
        </div>
      </div>

      <div style={{ marginTop: "3rem" }}>
        <h2>Filled</h2>
        <br />
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Button
            icon="add"
            decoIcon="arrow_drop_down"
            variant="filled"
            size="medium"
            semantic="default"
            disabled={false}
            onClick={() => {}}
            type="button"
            className=""
            data-testid=""
          >
            Add
          </Button>

          <Button
            icon="add"
            decoIcon="arrow_drop_down"
            variant="filled"
            size="medium"
            semantic="success"
            disabled={false}
            onClick={() => {}}
            type="button"
            className=""
            data-testid=""
          >
            Add
          </Button>

          <Button
            icon="add"
            decoIcon="arrow_drop_down"
            variant="filled"
            size="medium"
            semantic="active"
            disabled={false}
            onClick={() => {}}
            type="button"
            className=""
            data-testid=""
          >
            Add
          </Button>

          <Button
            icon="add"
            decoIcon="arrow_drop_down"
            variant="filled"
            size="medium"
            semantic="warning"
            disabled={false}
            onClick={() => {}}
            type="button"
            className=""
            data-testid=""
          >
            Add
          </Button>

          <Button
            icon="add"
            decoIcon="arrow_drop_down"
            variant="filled"
            size="medium"
            semantic="error"
            disabled={false}
            onClick={() => {}}
            type="button"
            className=""
            data-testid=""
          >
            Add
          </Button>
        </div>
      </div>

      <div style={{ marginTop: "3rem" }}>
        <h2>Ghost</h2>
        <br />
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Button
            icon="add"
            decoIcon="arrow_drop_down"
            variant="ghost"
            size="medium"
            semantic="default"
            disabled={false}
            onClick={() => {}}
            type="button"
            className=""
            data-testid=""
          >
            Add
          </Button>

          <Button
            icon="add"
            decoIcon="arrow_drop_down"
            variant="ghost"
            size="medium"
            semantic="success"
            disabled={false}
            onClick={() => {}}
            type="button"
            className=""
            data-testid=""
          >
            Add
          </Button>

          <Button
            icon="add"
            decoIcon="arrow_drop_down"
            variant="ghost"
            size="medium"
            semantic="active"
            disabled={false}
            onClick={() => {}}
            type="button"
            className=""
            data-testid=""
          >
            Add
          </Button>

          <Button
            icon="add"
            decoIcon="arrow_drop_down"
            variant="ghost"
            size="medium"
            semantic="warning"
            disabled={false}
            onClick={() => {}}
            type="button"
            className=""
            data-testid=""
          >
            Add
          </Button>

          <Button
            icon="add"
            decoIcon="arrow_drop_down"
            variant="ghost"
            size="medium"
            semantic="error"
            disabled={false}
            onClick={() => {}}
            type="button"
            className=""
            data-testid=""
          >
            Add
          </Button>
        </div>
      </div>

      <div style={{ marginTop: "3rem" }}>
        <h2>Full Width Mode</h2>
        <p style={{ fontSize: "12px", color: "var(--color--text-secondary)" }}>
          Below buttons have <code>widthMode="full width"</code> so the label sticks
          to the left while the decorative icon stays on the far right.
        </p>
        <br />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            width: "240px", // limit container to show full-width behaviour
          }}
        >
          <Button
            icon="add"
            decoIcon="arrow_drop_down"
            variant="outlined"
            size="medium"
            semantic="default"
            widthMode="full width"
          >
            Default
          </Button>
          <Button
            icon="add"
            decoIcon="arrow_drop_down"
            variant="filled"
            size="medium"
            semantic="success"
            widthMode="full width"
          >
            Success
          </Button>
          <Button
            icon="add"
            decoIcon="arrow_drop_down"
            variant="ghost"
            size="medium"
            semantic="active"
            widthMode="full width"
          >
            Active
          </Button>
        </div>
      </div>
    </div>
  );
};
