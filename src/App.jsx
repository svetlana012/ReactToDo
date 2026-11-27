import { Routes, Route } from "react-router-dom";
import NotePage from "./pages/NotePage/NotePage.jsx";
import MainPage from "./pages/MainPage/MainPage.jsx";

import "./styles/global.scss";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/tasks/:id" element={<NotePage />} />
    </Routes>
  );
};

export default App;
