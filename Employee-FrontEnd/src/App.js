import { BrowserRouter as Router, Routes, Route ,Navigate} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import EditEmployee from "./components/EditEmployee";
import AddEmployee from "./components/AddEmployee";
// import EmployeeProfile from "./components/EmployeeProfile";
import AnalyticsDashboard from "./components/AnalyticsDashboard";
import SignUp from "./components/SignUp";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} /> 
         <Route
          path="/dashboard"
          element={<Dashboard />}
          />
        <Route path="/employees/:id/edit" element={<EditEmployee />} />
        <Route path="/employees/add" element={<AddEmployee/>}/>
        {/* <Route path="/employees/:id" element={<EmployeeProfile/>}/> */}
        <Route path="/analytics" element={<AnalyticsDashboard/>}/>
        <Route path="/signup" element={<SignUp/>}/> 
      </Routes>
    </Router>
  );
}

export default App;