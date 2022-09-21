import { addDays } from "date-fns";
import "./App.css";
import Scheduler from "./components/Scheduler/Scheduler";

import data from "./data.json";

function App() {
  return (
    <div className="App">
      <Scheduler
        startDate={new Date()}
        endDate={addDays(new Date(), 30)}
        groups={data.groups}
        items={data.items}
      />
    </div>
  );
}

export default App;
