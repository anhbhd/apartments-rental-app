import React from "react";
interface IDashboardCardProps {
  value: any;
  label: string;
  imgIcon: string;
}
const DashboardCard: React.FC<IDashboardCardProps> = ({
  value,
  label,
  imgIcon,
}) => {
  return (
    <div className="bg-white p-3 rounded-xl shadow-md flex items-center justify-between ">
      <div className="flex space-x-6 items-center">
        <img src={imgIcon} className="w-auto h-12" alt={imgIcon} />
        <div>
          <p className="font-semibold text-base">{value}</p>
          <p className="font-semibold text-xs text-gray-400">{label}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
