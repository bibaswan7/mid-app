import logo from './logo.svg';
import './App.css';
import Register from './components/StudentsRegister';
import ExpenseTracker from './components/ExpenseTracker';
import CashflowTracker from './components/CashflowTracker';

function App() {
  return (
    <div className="App">
      {/* <Register /> */}
      {/* <ExpenseTracker /> */}
      <CashflowTracker />
    </div>
  );
}

export default App;
