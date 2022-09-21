import { format } from "date-fns";
import { createRef, useEffect, useState } from "react";
import { createArrayOfDays } from "./helpers";

import styles from "./Scheduler.module.css";

export default function Scheduler({
  startDate,
  endDate,
  groups,
  items,
  colWidth = 50,
  colHeight = 50,
}) {
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
        <div
          className={styles.header_day}
          style={{ height: colHeight, width: colWidth }}
        >
          <span>{format(day.date, "d")}</span>
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
    const finishDays = [];

    for (const day of days) {
      finishDays.push(
        <div
          className={styles.cols_day}
          style={{ height: colHeight, width: colWidth }}
        ></div>
      );
    }

    return finishDays;
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
