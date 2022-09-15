import { addDays } from "date-fns";
import "./App.css";
import Scheduler from "./components/Scheduler/Scheduler";

function App() {
  return (
    <div className="App">
      <Scheduler startDate={new Date()} endDate={addDays(new Date(), 30)} />
    </div>
  );
}

export default App;
