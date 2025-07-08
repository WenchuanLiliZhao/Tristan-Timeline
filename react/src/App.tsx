import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DemoPages } from "./pages";
import { DebugPages } from "./pages/debug-pages";
import "tristan-ui/style.css"

function App() {

  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <Routes>
        <Route path="/" element={DebugPages.Timeline.content} />
        <Route path="/issues-table" element={DebugPages.IssuesTable.content} />
        <Route path="*" element={DemoPages.NotFound.content} />

        {Object.values(DemoPages).map((page) => (
          <Route key={page.path} path={`/${page.path}`} element={page.content} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
