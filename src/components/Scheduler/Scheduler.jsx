import { format } from "date-fns";
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

  const renderHeader = () => {
    const finishDays = [];

    for (const day of days) {
      finishDays.push(
        <div className={styles.header_day}>
          <span>{format(day.date, "dd")}</span>
          <p>{format(day.date, "MMM")}</p>
        </div>
      );
    }

    return finishDays;
  };

  const renderGroups = () => {
    return <></>;
  };

  const renderCols = () => {
    return <></>;
  };

  if (!days) return <p>Loading ...</p>;

  return (
    <div ref={containerRef} className={styles.container}>
      <div className={styles.header}>{renderHeader()}</div>
      <div className={styles.groups}>{renderGroups()}</div>
      <div className={styles.cols}>{renderCols()}</div>
    </div>
  );
}
