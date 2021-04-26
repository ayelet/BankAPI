import "./App.css";
import AccountsTable from "./components/AccountsTable/AccountsTable";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="App">
      <Navbar />
      <AccountsTable />
      <Footer />
    </div>
  );
}

export default App;
