import { differenceInDays, differenceInHours, format } from "date-fns";
import { createRef, useEffect, useState } from "react";
import { createArrayOfDays, createArrayOfItemsRows } from "./helpers";

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
  colHeight = 55,
  handleDayClick,
  handleGroupClick,
  handleItemClick,
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
        <Col
          className={styles.group}
          style={{ height: colHeight }}
          onClick={() => onGroupClick(group)}
        >
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
          onClick={() => onDayClick(day)}
        />
      );
    }

    return finishDays;
  };

  // items
  const renderItems = (group) => {
    const currentItems = items.filter((item) => item.groupId === group.id);
    const arrayOfItemRows = createArrayOfItemsRows(currentItems, endDate);

    const finishItems = [];
    const itemHeight = 18;

    for (let row = 0; row < arrayOfItemRows.length; row++) {
      // Вложенный цикл(((
      for (const item of arrayOfItemRows[row]) {
        const daysLeft = differenceInHours(item.startDate, startDate) / 24;
        const daysOfItem = differenceInHours(item.endDate, item.startDate) / 24;

        finishItems.push(
          <div
            className={styles.item}
            style={{
              top: row * itemHeight + 1,
              left: daysLeft * colWidth,
              height: itemHeight - 1,
              width: `${daysOfItem * colWidth}px`,
            }}
            onClick={() => onItemClick(item)}
          >
            <div className={styles.item_content}>{item.title}</div>
          </div>
        );
      }
    }

    return finishItems;
  };

  const onDayClick = (day) => {
    if (handleDayClick) handleDayClick(day);
  };

  const onGroupClick = (group) => {
    if (handleGroupClick) handleGroupClick(groups);
  };

  const onItemClick = (item) => {
    if (handleItemClick) handleItemClick(item);
  };

  if (!days) return <p>Loading ...</p>;

  return (
    <div ref={containerRef} className={styles.container}>
      <div className={styles.leftside}>
        <Col className={styles.group} style={{ height: colHeight }}>
          Month
        </Col>
        <div className={styles.groups}>{renderGroups()}</div>
      </div>

      <div className={styles.rightside}>
        <div className={styles.header}>{renderHeader()}</div>
        <div className={styles.rows}>
          {groups.map((group, key) => (
            <div className={styles.row} key={`group_${key}`}>
              {renderCols(group)}
              {renderItems(group)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
