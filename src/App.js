import logo from './logo.svg';
import './App.css';
import Register from './components/StudentsRegister';
import ExpenseTracker from './components/ExpenseTracker';
import CashflowTracker from './components/CashflowTracker';
import ProductsList from './components/ProductsList';
import BillingList from './components/BillingList';
import { useState } from 'react';
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
