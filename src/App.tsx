import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import PostDetail from "./components/PostDetail";
import { Login } from "./components/Login";
import Profile from "./components/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/post/:postId"
          element={<PostDetail />}
        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/register"
          element={<Login registerFlag={true} />}
        />
        <Route
          path="/profile"
          element={<Profile />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
