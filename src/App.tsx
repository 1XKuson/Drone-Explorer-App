import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import ViewConfig from "./pages/ViewConfig";
import TempForm from "./pages/TempForm";
import ViewLogs from "./pages/ViewLogs";
import "./App.css";
import Header from "./components/Header";


const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/config" element={<ViewConfig />} />
        <Route path="/temp-form" element={<TempForm />} />
        <Route path="/logs" element={<ViewLogs />} />
      </Routes>
    </Router>
  );
};

export default App;
