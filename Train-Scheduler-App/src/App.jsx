import "./App.css";
import { Routes, Route } from "react-router-dom";
import PageNotFound from "./PageNotFound";
import Home from "./home/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
