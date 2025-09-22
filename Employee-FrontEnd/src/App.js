import { BrowserRouter as Router, Routes, Route ,Navigate} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import EditEmployee from "./components/EditEmployee";
import AddEmployee from "./components/AddEmployee";
import EmployeeProfile from "./components/EmployeeProfile";
import AnalyticsDashboard from "./components/AnalyticsDashboard";

function App() {
    const role = localStorage.getItem("role");
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login/:role" element={<Login />} />
         <Route
          path="/dashboard"
          element={
            role ? <Dashboard role={role} /> : <Navigate to="/login" />
          }
        />
        <Route path="/employees/:id/edit" element={<EditEmployee />} />
        <Route path="/employees/add" element={<AddEmployee/>}/>
        <Route path="/employees/:id" element={<EmployeeProfile/>}/>
        <Route path="/analytics" element={<AnalyticsDashboard/>}/>
      </Routes>
    </Router>
  );
}

export default App;