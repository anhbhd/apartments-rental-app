import React from "react";
interface IDashboardCardProps {
  value: any;
  label: string;
  imgIcon: React.ReactNode;
}
const DashboardCard: React.FC<IDashboardCardProps> = ({
  value,
  label,
  imgIcon,
}) => {
  return (
    <div
      className="bg-white p-3 rounded-xl shadow-lg flex items-center justify-between "
      style={{
        boxShadow: `rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px`,
      }}
    >
      <div className="flex space-x-6 items-center">
        {imgIcon}
        <div>
          <p className="font-semibold text-base">{value}</p>
          <p className="font-semibold text-xs text-gray-400">{label}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
