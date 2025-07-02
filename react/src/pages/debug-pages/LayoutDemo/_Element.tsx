import { TopNav } from "../../../design-system/ui-components";
import { TristanLayout } from "../../../design-system/ui-components/layout";
import { colors } from "../../../styles";

const Main = () => {
  return (
    <div
      style={{
        padding: "20px",
        minHeight: "200vh", // 确保超出视图高度
      }}
    >
      <h1>Main Content Area</h1>
      <p>
        This is a long content area that extends beyond the viewport height to
        test scrolling functionality.
      </p>

      {/* 生成足够多的内容来填充高度 */}
      {Array.from({ length: 100 }, (_, i) => (
        <div key={i} style={{ marginBottom: "16px"}}>
          <h3>Section {i + 1}</h3>
          <p>
            This is section {i + 1} of the main content. This content is
            designed to be long enough to demonstrate the scrolling behavior of
            the TristanLayout component. Each section contains some sample text
            to fill up space and create a realistic scrolling experience.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
      ))}

      <div
        style={{
          marginTop: "40px",
          padding: "20px",
          backgroundColor: `var(${colors.background.secondary})`,
          borderRadius: "8px",
        }}
      >
        <h2>End of Content</h2>
        <p>
          You've reached the end of the scrollable content. This demonstrates
          that the layout's scrolling functionality is working correctly.
        </p>
      </div>
    </div>
  );
};

export const Element: React.FC = () => {
  return (
    <TristanLayout
      top={
        <TopNav
          left={[<div>Left nav items</div>]}
          right={[<div>Right nav items</div>]}
        />
      }
      left={
        <div
          style={{
            height: "100%",
            width: "200px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Left
        </div>
      }
      right={
        <div
          style={{
            height: "100%",
            width: "200px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Right
        </div>
      }
      main={<Main />}
    />
  );
};
