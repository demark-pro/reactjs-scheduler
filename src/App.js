import { addDays, format, parse } from "date-fns";
import { useState } from "react";
import "./App.css";
import Scheduler from "./components/Scheduler/Scheduler";

import data from "./data.json";

const dateFormat = "yyyy-MM-dd";

function App() {
  const [schedulerProps, setShedulerProps] = useState({
    startDate: new Date().getTime(),
    endDate: addDays(new Date(), 30).getTime(),
    groups: data.groups,
    items: data.items,
  });

  const changeTab = (key, event) => {
    let value = event.target.value;

    if (key === "startDate" || key === "endDate") {
      value = parse(event.target.value, dateFormat, new Date()).getTime();
    }

    setShedulerProps({ ...schedulerProps, [key]: value });
  };

  return (
    <div className="App">
      <h1>Scheduler</h1>
      <form>
        <label name="startDate">
          start date
          <input
            type="date"
            name="startDate"
            value={format(schedulerProps.startDate, dateFormat)}
            onChange={(e) => changeTab("startDate", e)}
          />
        </label>
        <label name="startDate">
          end date
          <input
            type="date"
            name="endDate"
            value={format(schedulerProps.endDate, dateFormat)}
            onChange={(e) => changeTab("endDate", e)}
          />
        </label>
      </form>
      <Scheduler
        handleDayClick={(day) => console.log(day)}
        handleItemClick={(item) => console.log(item)}
        handleGroupClick={(group) => console.log(group)}
        {...schedulerProps}
      />
    </div>
  );
}

export default App;
