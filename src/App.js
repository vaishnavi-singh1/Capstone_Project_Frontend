import "./App.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage/HomePage";
import InventoryItemsDetails from "./pages/InventoryItemsDetails/InventoryItemsDetails";
import InventoryPage from "./pages/InventoryPage/InventoryPage";
import EditInventory from "./pages/EditInventory/EditInventory";
import EditGodown from "./pages/EditGodown/EditGodown";
import GodownDetails from "./pages/Godown-details/GodownDetails";
import NewGodown from "./components/NewGodown/NewGodown";
import NewItem from "./components/NewItem/NewItem";
import Inwards from "./pages/Inwards/Inwards";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <div className="app__container">
          <Routes>
            <Route path="/" element={<Navigate to="/godowns" />}></Route>
            <Route path="/godowns" element={<HomePage />}></Route>
            <Route path="/inventory" element={<InventoryPage />}></Route>
            <Route
              path="/inventory/:id"
              element={<InventoryItemsDetails />}
            ></Route>
            <Route path="/inventory/new" element={<NewItem />} />
            <Route
              path="/godowns/:godownID"
              element={<GodownDetails />}
            ></Route>
            <Route path="/godowns/new" element={<NewGodown />}></Route>
            <Route
              path="/godowns/edit-godown/:godownId"
              element={<EditGodown />}
            />{" "}
            <Route
              path="/inventory/edit-inventory/:inventoryId"
              element={<EditInventory />}
            />
            <Route
              path="/inwards"
              element={<Inwards />}
            />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
