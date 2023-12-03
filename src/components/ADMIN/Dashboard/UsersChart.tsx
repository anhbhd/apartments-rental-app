import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { User } from "../../../Type/User";
import {
  getCurrentMonth,
  getMonthFromTimestamp,
} from "../../../utils/ultil-month";
import { MonthInYear } from "../../../common/constants/MonthInYear";

ChartJS.register(ArcElement, Tooltip, Legend);

interface IUsersChart {
  usersList: User[];
}

const UsersChart: React.FC<IUsersChart> = ({ usersList }) => {
  const [labels, setLabels] = useState<string[]>([]);
  const [arrayOfNumberUsersInMonths, setArrayOfNumberUsersInMonths] = useState<
    number[]
  >([]);

  const countUserEachMonth = (month: number): number => {
    return usersList.reduce((sum, currentUser) => {
      if (getMonthFromTimestamp(currentUser.createdDate) === month) {
        return sum + 1;
      }
      return sum;
    }, 0);
  };

  useEffect(() => {
    // this one will return the current month in this year
    const currentMonth = getCurrentMonth();
    const startMonth = currentMonth - 5;

    const arrayOfMonthsInString: string[] = [];
    const arrayOfNumberUsersInMonths: number[] = [];
    for (let i = startMonth; i <= currentMonth; i++) {
      arrayOfNumberUsersInMonths.push(countUserEachMonth(i));
      arrayOfMonthsInString.push(MonthInYear[i]);
    }
    setArrayOfNumberUsersInMonths(arrayOfNumberUsersInMonths);
    setLabels(arrayOfMonthsInString);
  }, []);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "# of User",
        data: arrayOfNumberUsersInMonths,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div>
      <Doughnut data={data} />
    </div>
  );
};

export default UsersChart;
