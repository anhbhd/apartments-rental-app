import React, { useEffect, useRef, useState } from "react";

import { SearchOutlined } from "@ant-design/icons";

import Highlighter from "react-highlight-words";
import type { InputRef } from "antd";
import { Button, Input, Space, Table } from "antd";
import type { ColumnType, ColumnsType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import { Category } from "../../../type/Category";
import { getDataCollection } from "../../../services/getDataCollection";
import AddNewCategory from "../../../components/ADMIN/CategoriesManagement/AddNewCategory";
import Actions from "../../../components/ADMIN/CategoriesManagement/Actions";

type DataIndex = keyof Category;

const CategoriesManagement = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const [categories, setCategories] = useState<Category[]>([]);

  const fetchCategories = async () => {
    const [categories] = await getDataCollection("categories");
    setCategories(categories as Category[]);
  };

  const handleDeleteCategory = (categoryId: string) => {
    setCategories(categories.filter((category) => category.id !== categoryId));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

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

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<Category> => ({
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
      record[dataIndex]
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

  const columns: ColumnsType<Category> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "30%",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Actions",
      dataIndex: "Actions",
      key: "Actions",
      width: "20%",
      render(value, record, index) {
        return (
          <Actions
            onDeleteCategory={handleDeleteCategory}
            onSetCategories={setCategories}
            categories={categories}
            category={record}
          />
        );
      },
    },
  ];

  return (
    <div className="max-w-screen-xl bg-white pr-20">
      <h2 className="mt-24 mb-10 ml-5 text-2xl flex justify-between font-bold text-gray-900">
        Categories Management
        <AddNewCategory
          onSetCategories={setCategories}
          categories={categories}
        />
      </h2>

      <Table
        columns={columns}
        bordered
        dataSource={categories}
        pagination={false}
        rowKey="id"
      />
    </div>
  );
};

export default CategoriesManagement;
