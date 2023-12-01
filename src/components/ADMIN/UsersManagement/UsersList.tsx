import { InputRef, Table, Tag } from "antd";
import type { ColumnType, ColumnsType } from "antd/es/table";
import { FirebaseDate } from "../../../type/Apartment";
import { secondsToDateTime } from "../../../utils/SecondToDate";
import { FilterConfirmProps, SortOrder } from "antd/es/table/interface";
import { useEffect, useRef, useState } from "react";
import { getDataCollection } from "../../../services/getDataCollection";
import { updateDocument } from "../../../services/updateDocument";
import PopupConfirm from "./PopupConfirm";
import { toast } from "react-toastify";
import { Button, Input, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

export interface UserRow {
  id: string;
  fullName: string;
  email: string;
  createdDate: FirebaseDate;
  isAdmin: boolean;
  active: boolean;
}
type DataIndex = keyof UserRow;
const UsersList = () => {
  const [userRows, setUsersRows] = useState<UserRow[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };
  const fetchUsers = async () => {
    setIsLoading(true);
    const [users] = await getDataCollection("users");
    setUsersRows(users as UserRow[]);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleActiveOrDeactivateUser = async (user: UserRow) => {
    try {
      if (user.isAdmin) {
        throw new Error("You cannot deactivate an Administrator");
      }
      await updateDocument("users", user.id, {
        active: !user.active,
      });

      const updatedUserRows = userRows.map((u) =>
        u.id === user.id ? { ...u, active: !u.active } : u
      );
      toast.success("Success", {
        position: "top-right",
        autoClose: 2000,
      });

      setUsersRows(updatedUserRows);
    } catch (err: any) {
      toast.error(err.message, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };
  // search in columns
  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<UserRow> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      (record[dataIndex] + "")
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns: ColumnsType<UserRow> = [
    {
      title: "ID",
      dataIndex: "id",
      width: "22%",

      render: (_: any, record: UserRow) => <span>{record.id}</span>,
    },
    {
      title: "Full name",
      dataIndex: "fullName",
      ...getColumnSearchProps("fullName"),

      render: (_: any, record: UserRow) => (
        <span className={record.fullName ? "" : "text-red-700 font-bold"}>
          {record.fullName || "N/A"}
        </span>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      ...getColumnSearchProps("email"),

      render: (_: any, record: UserRow) => <span>{record.email}</span>,
    },
    {
      title: "Created Date",
      dataIndex: "createdDate",
      render: (_: any, record: UserRow) => (
        <span>{secondsToDateTime(record.createdDate.seconds)}</span>
      ),
      width: "15%",
      defaultSortOrder: "descend" as SortOrder,
      sorter: (a: UserRow, b: UserRow) =>
        a.createdDate.seconds - b.createdDate.seconds,
    },
    {
      title: "Role",
      dataIndex: "isAdmin",
      width: "10%",
      render: (_: any, record: UserRow) =>
        record.isAdmin ? (
          <Tag bordered={false} color="error">
            Admin
          </Tag>
        ) : (
          <Tag bordered={false} color="processing">
            User
          </Tag>
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
      width: "15%",
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
    <Table
      columns={columns}
      dataSource={userRows}
      scroll={{ y: 400 }}
      pagination={false}
      bordered
      rowKey="id"
      loading={isLoading}
    />
  );
};
export default UsersList;
