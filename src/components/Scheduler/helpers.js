import { addDays, differenceInDays } from "date-fns";

export const createArrayOfDays = (startDate, endDate) => {
  return [...Array(differenceInDays(endDate, startDate))].map((_, index) => {
    const date = addDays(startDate, index);

    return {
      date,
    };
  });
};

export const createArrayOfItemsRows = (
  items,
  endDate,
  rows = [],
  rowIndex = 0
) => {
  const sortedItems =
    rowIndex > 0 ? items : items.sort((a, b) => a.startDate - b.startDate);

  const curRows = [...rows];
  const cloneItems = sortedItems;

  let count = 0;
  while (count < sortedItems.length) {
    if (!curRows[rowIndex]) {
      curRows.push([sortedItems[0]]);
      cloneItems.splice(0, 1);
    } else {
      const endOfLastItem =
        curRows[rowIndex][curRows[rowIndex].length - 1].endDate;

      if (endOfLastItem < endDate) {
        const nextItem = cloneItems.find((el) => el.startDate >= endOfLastItem);

        if (nextItem) {
          curRows[rowIndex].push(nextItem);
          const itemIndex = cloneItems.findIndex(
            (el) => el.uid === nextItem.uid
          );
          cloneItems.splice(itemIndex, 1);
        }
      } else break;
    }
    count = count + 1;
  }

  return cloneItems.length
    ? createArrayOfItemsRows(cloneItems, endDate, curRows, rowIndex + 1)
    : curRows;
};
