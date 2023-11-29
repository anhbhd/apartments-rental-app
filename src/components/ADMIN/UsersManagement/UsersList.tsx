import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { FirebaseDate } from "../../../type/Apartment";
import { secondsToDateTime } from "../../../utils/SecondToDate";
import { SortOrder } from "antd/es/table/interface";
import { useEffect, useState } from "react";
import { getDataCollection } from "../../../services/getDataCollection";
import Search, { SearchProps } from "antd/es/input/Search";
import { updateDocument } from "../../../services/updateDocument";
import PopupConfirm from "./PopupConfirm";
import { toast } from "react-toastify";

export interface UserRow {
  id: string;
  fullName: string;
  email: string;
  createdDate: FirebaseDate;
  isAdmin: boolean;
  active: boolean;
}

const UsersList = () => {
  const [userRows, setUsersRows] = useState<UserRow[]>([]);
  const [displayedRows, setDisplayedRows] = useState<UserRow[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fetchUsers = async () => {
    setIsLoading(true);
    const [users] = await getDataCollection("users");
    setUsersRows(users as UserRow[]);
    setDisplayedRows(users as UserRow[]);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  const onSearch: SearchProps["onSearch"] = (value, _e) => {
    if (!value) {
      setDisplayedRows(userRows);
      return;
    }
    setDisplayedRows(
      userRows.filter(
        (user) =>
          user.fullName &&
          user.fullName.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleActiveOrDeactivateUser = async (user: UserRow) => {
    try {
      if (user.isAdmin) {
        throw new Error("You cannot deactivate an Administrator");
      }
      await updateDocument("users", user.id, {
        active: !user.active,
      });

      const updatedUserRows = displayedRows.map((u) =>
        u.id === user.id ? { ...u, active: !u.active } : u
      );
      toast.success("Success", {
        position: "top-right",
        autoClose: 2000,
      });

      setDisplayedRows(updatedUserRows);
    } catch (err: any) {
      toast.error(err.message, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  const columns: ColumnsType<UserRow> = [
    {
      title: "ID",
      dataIndex: "id",
      render: (_: any, record: UserRow) => <span>{record.id}</span>,
    },
    {
      title: "Full name",
      dataIndex: "fullName",

      render: (_: any, record: UserRow) => (
        <span className={record.fullName ? "" : "text-red-700 font-bold"}>
          {record.fullName || "N/A"}
        </span>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",

      render: (_: any, record: UserRow) => <span>{record.email}</span>,
    },
    {
      title: "Created Date",
      dataIndex: "createdDate",
      render: (_: any, record: UserRow) => (
        <span>
          {secondsToDateTime(record.createdDate.seconds).toUTCString()}
        </span>
      ),
      defaultSortOrder: "descend" as SortOrder,
      sorter: (a: UserRow, b: UserRow) =>
        a.createdDate.seconds - b.createdDate.seconds,
    },
    {
      title: "Role",
      dataIndex: "isAdmin",

      render: (_: any, record: UserRow) => (
        <span className="rounded-lg py-1 px-4">
          {record.isAdmin ? "Admin" : "User"}
        </span>
      ),
      filters: [
        {
          text: "Admin",
          value: true,
        },
        {
          text: "User",
          value: false,
        },
      ],
      onFilter: (value: any, record: UserRow) => {
        return record.isAdmin === value;
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",

      render: (_: any, record: UserRow) =>
        record.active ? (
          <PopupConfirm
            onActivateOrDeActivate={() => handleActiveOrDeactivateUser(record)}
            title={"Do you really want to deactivate this account"}
            danger={true}
            content={"This action will deactivate this user"}
            buttonName={"Deactivate"}
            buttonType={"dashed"}
          />
        ) : (
          <PopupConfirm
            onActivateOrDeActivate={() => handleActiveOrDeactivateUser(record)}
            title={"Do you really want to active this account"}
            danger={false}
            content={"This action will let this user be active again"}
            buttonName={"Active"}
            buttonType={"primary"}
          />
        ),
    },
  ];
  return (
    <>
      <p className="max-w-lg mb-5">
        <Search
          placeholder="input search text"
          onSearch={onSearch}
          enterButton
          bordered
        />
      </p>
      <Table
        columns={columns}
        dataSource={displayedRows}
        scroll={{ y: 350 }}
        pagination={false}
        bordered
        rowKey="id"
        loading={isLoading}
      />
    </>
  );
};
export default UsersList;
