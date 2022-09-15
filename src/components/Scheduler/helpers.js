import { addDays, differenceInDays, getWeek, parse } from "date-fns";

export const createArrayOfDays = (startDate, endDate) => {
  return [...Array(differenceInDays(endDate, startDate))].map((_, index) => {
    const date = addDays(startDate, index);

    return {
      date,
    };
  });
};
