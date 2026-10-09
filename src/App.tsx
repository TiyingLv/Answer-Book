import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Answer from "./pages/Answer";
import DeepDive from "./pages/DeepDive";
import Favorites from "./pages/Favorites";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/answer" element={<Answer />} />
        <Route path="/deepdive" element={<DeepDive />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}
