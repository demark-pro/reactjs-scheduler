import { createRef, useEffect, useState } from "react";
import { createArrayOfDays } from "./helpers";

import styles from "./Scheduler.module.css";

export default function Scheduler({ startDate, endDate }) {
  const containerRef = createRef(null);

  const [days, setDays] = useState(null);

  useEffect(() => {
    if (!startDate && !endDate) return;
    
    setDays(createArrayOfDays(startDate, endDate));
  }, [startDate, endDate]);

  const renderHeader = () => {};

  return (
    <div ref={containerRef} className={styles.container}>
      {renderHeader()}
    </div>
  );
}
