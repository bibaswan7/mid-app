<<<<<<< HEAD
import logo from "./logo.svg";
import "./App.css";
import Register from "./components/StudentsRegister";
import ExpenseTracker from "./components/ExpenseTracker";
import CashflowTracker from "./components/CashflowTracker";
import "react-toastify/dist/ReactToastify.css";

=======
import logo from './logo.svg';
import './App.css';
import Register from './components/StudentsRegister';
import ExpenseTracker from './components/ExpenseTracker';
import CashflowTracker from './components/CashflowTracker';
import ProductsList from './components/ProductsList';
import BillingList from './components/BillingList';
import { useState } from 'react';
>>>>>>> 18230c4459f1e4b63cfb3267623e60b9aa9a7a7a
function App() {
  const [listedProducts, setListedProducts] = useState([]);
  return (
    <div className="App">
      {/* <Register /> */}
      {/* <ExpenseTracker /> */}
      {/* <CashflowTracker /> */}
      <ProductsList products={listedProducts} setProducts={setListedProducts} />
      <BillingList listedProducts={listedProducts} />
    </div>
  );
}

export default App;
