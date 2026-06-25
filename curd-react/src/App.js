import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import AddEmployee from "./add-employee";
import ViewEmployees from "./view-employees";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-employee" element={<AddEmployee />} />
        <Route path="/view-employees" element={<ViewEmployees />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;