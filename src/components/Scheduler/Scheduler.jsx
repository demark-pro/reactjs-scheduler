import { format } from "date-fns";
import { createRef, useEffect, useState } from "react";
import { createArrayOfDays } from "./helpers";

import styles from "./Scheduler.module.css";

const Col = ({ children, className, ...props }) => (
  <div className={`${styles.template_col} ${className}`} {...props}>
    {children}
  </div>
);

export default function Scheduler({
  startDate,
  endDate,
  groups,
  items,
  colWidth = 50,
  colHeight = 50,
  groupsColWidth = 100,
}) {
  const containerRef = createRef(null);

  const [days, setDays] = useState(null);

  useEffect(() => {
    if (!startDate && !endDate) return;

    setDays(createArrayOfDays(startDate, endDate));
  }, [startDate, endDate]);

  // header
  const renderHeader = () => {
    const finishDays = [];

    for (const day of days) {
      finishDays.push(
        <Col
          className={styles.header_day}
          style={{ height: colHeight, width: colWidth }}
        >
          <span>{format(day.date, "d")}</span>
          <p>{format(day.date, "MMM")}</p>
        </Col>
      );
    }

    return finishDays;
  };

  // groups
  const renderGroups = () => {
    if (!groups) return;

    const finishGroups = [];

    for (const group of groups) {
      finishGroups.push(
        <Col className={styles.group} style={{ height: colHeight }}>
          <p>{group.title}</p>
        </Col>
      );
    }
    return finishGroups;
  };

  // cols
  const renderCols = () => {
    const finishDays = [];

    for (const day of days) {
      finishDays.push(
        <Col
          className={styles.cols_day}
          style={{ height: colHeight, width: colWidth }}
        />
      );
    }

    return finishDays;
  };

  if (!days) return <p>Loading ...</p>;

  return (
    <div ref={containerRef} className={styles.container}>
      <div className={styles.leftside}>
        <Col style={{ width: groupsColWidth, height: colHeight }}>Month</Col>
        <div className={styles.groups}>{renderGroups()}</div>
      </div>

      <div className={styles.rightside}>
        <div className={styles.header}>{renderHeader()}</div>
        <div className={styles.rows}>
          {groups.map((group) => (
            <div className={styles.row}>{renderCols(group)}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
