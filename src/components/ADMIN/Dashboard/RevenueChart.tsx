import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { RentalApplication } from "../../../Type/RentalApplication";
import { MonthInYear } from "../../../common/constants/MonthInYear";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Line Chart",
    },
  },
};

interface IRevenueProps {
  rentingRentalAppsThisYear: RentalApplication[];
}
const RevenueChart: React.FC<IRevenueProps> = ({
  rentingRentalAppsThisYear,
}) => {
  const [arrayOfTotalRevenueEachMonth, setArrayOfTotalRevenueEachMonth] =
    useState<number[]>([]);

  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const calculateArrayOfRevenues = () => {
    const arrayOfRevenues = Array.from({ length: currentMonth }, () => 0);

    for (let i = 0; i < currentMonth; i++) {
      let total = rentingRentalAppsThisYear.reduce(
        (prevValue, currentRentApp) => {
          let yearStart = new Date(
            currentRentApp.startDate.seconds * 1000
          ).getFullYear();
          let monthStart =
            new Date(currentRentApp.startDate.seconds * 1000).getMonth() + 1;
          let yearEnd = new Date(
            currentRentApp.endDate.seconds * 1000
          ).getFullYear();
          let monthEnd =
            new Date(currentRentApp.endDate.seconds * 1000).getMonth() + 1;

          if (
            (monthStart <= i + 1 &&
              yearStart <= currentYear &&
              monthEnd >= i + 1 &&
              yearEnd >= currentYear) ||
            (monthStart <= i + 1 &&
              yearStart <= currentYear &&
              monthEnd < i + 1 &&
              yearEnd >= currentYear)
          ) {
            // Add the money of the rental to the revenue for each valid month
            return prevValue + currentRentApp.pricePerMoAtRentalTime;
          }

          return prevValue;
        },
        0
      );
      arrayOfRevenues[i] = total;
    }

    setArrayOfTotalRevenueEachMonth(arrayOfRevenues);
  };

  useEffect(() => {
    calculateArrayOfRevenues();
  }, []);

  const labels = Array.from(
    { length: currentMonth },
    (_, index) => MonthInYear[index + 1]
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Revenue",
        data: arrayOfTotalRevenueEachMonth,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return <Line options={options} data={data} />;
};
export default RevenueChart;
