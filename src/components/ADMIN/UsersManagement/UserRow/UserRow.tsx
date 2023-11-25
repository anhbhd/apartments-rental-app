import React from "react";

const UserRow = () => {
  return (
    <tr>
      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
        <p className="whitespace-no-wrap">3</p>
      </td>
      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
        <div className="flex items-center">
          <div className="h-10 w-10 flex-shrink-0">
            <img
              className="h-full w-full rounded-full"
              src="/images/-ytzjgg6lxK1ICPcNfXho.png"
              alt=""
            />
          </div>
          <div className="ml-3">
            <p className="whitespace-no-wrap">Besique Monroe</p>
          </div>
        </div>
      </td>
      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
        <p className="whitespace-no-wrap">Administrator</p>
      </td>
      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
        <p className="whitespace-no-wrap">Sep 28, 2022</p>
      </td>
      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
        <span className="rounded-full bg-green-200 px-3 py-1 text-xs font-semibold text-green-900">
          Active
        </span>
      </td>
    </tr>
  );
};

export default UserRow;
