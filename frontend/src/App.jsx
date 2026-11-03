// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import UserDashboard from "./pages/UserDashboard";
// import AdminDashboard from "./pages/AdminDashboard";
// import AdminRoute from "./routes/AdminRoute";
// import Navbar from "./components/Navbar";
// import GetStarted from "./pages/GetStarted";

// function App() {
//   return (
//     <BrowserRouter>
//       <Navbar/>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />

//         <Route path="/user" element={<UserDashboard />} />
//         <Route path="/get-started" element={<GetStarted />} />

//         <Route
//           path="/admin"
//           element={
//             <AdminRoute>
//               <AdminDashboard />
//             </AdminRoute>
//           }
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;


import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./routes/AdminRoute";
import Navbar from "./components/Navbar";
import GetStarted from "./pages/GetStarted";
import DiseaseInformation from "./pages/DiseaseInformation";
import SourceViewer from "./pages/SourceViewer";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route
          path="/user"
          element={<UserDashboard />}
        />

        {/* Disease information inside the project */}
        <Route
          path="/disease/:disease"
          element={<DiseaseInformation />}
        />
        <Route path="/source-viewer" element={<SourceViewer />} />
        <Route
          path="/get-started"
          element={<GetStarted />}
        />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;