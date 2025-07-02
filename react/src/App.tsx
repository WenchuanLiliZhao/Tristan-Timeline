import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DemoPages } from "./pages";

function App() {

  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <Routes>
        <Route path="/" element={DemoPages.Home.content} />
        <Route path="*" element={DemoPages.NotFound.content} />

        {Object.values(DemoPages).map((page) => (
          <Route key={page.path} path={`/${page.path}`} element={page.content} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
