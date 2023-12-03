import React, { useEffect, useRef, useState } from "react";

import {
  Timestamp,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../config/firebase_config";
import { RentalApplication } from "../../../Type/RentalApplication";
import { mapCollectionToArrayObject } from "../../../utils/Mapper";
import { Apartment, FirebaseDate } from "../../../Type/Apartment";
import Table, { ColumnsType } from "antd/es/table";
import { secondsToDateTime } from "../../../utils/SecondToDate";

import { getDataCollection } from "../../../services/getDataCollection";
import { User } from "../../../Type/User";
import {
  ColumnType,
  FilterConfirmProps,
  SortOrder,
} from "antd/es/table/interface";
import DetailedRentalApplication from "./DetailedRentalApplication";
import { updateDocument } from "../../../services/updateDocument";
import { RentAppStatus } from "../../../common/constants/RentalAppStatus";
import { Button, Input, InputRef, Space, Tag } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { getDocument } from "../../../services/getDocument";
import { toast } from "react-toastify";

interface IRentalAppsListProps {
  category: string;
}

export interface RentalAppRow {
  id: string;
  createdDate: FirebaseDate;
  apartmentId: string;
  tenantId: string;
  customerName: string;
  depositMoneyAtRentalTime: number;
  pricePerMoAtRentalTime: number;
  note: string;
  status: string;
  startDate: FirebaseDate;
  endDate: FirebaseDate;
}
type DataIndex = keyof RentalAppRow;

const RentalAppsList: React.FC<IRentalAppsListProps> = ({ category }) => {
  const [rentalApplications, setRentalApplications] = useState<
    RentalApplication[]
  >([]);
  const [usersInfo, setUsersInfo] = useState<User[]>([]);
  const [apartmentsInfo, setApartmentsInfo] = useState<Apartment[]>([]);
  const [rentalApplicationRows, setRentalApplicationRows] = useState<
    RentalAppRow[]
  >([]);
  const [isLoading, setLoading] = useState<boolean>(false);

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
    try {
      let [usersList] = await getDataCollection("users");
      setUsersInfo(usersList as User[]);
    } catch (err: any) {
      console.error(err.message);
    }
  };
  const fetchApartmentsInfo = async () => {
    try {
      let [apartmentsList] = await getDataCollection("apartments");
      setApartmentsInfo(apartmentsList as Apartment[]);
    } catch (err: any) {
      console.error(err.message);
    }
  };
  const fetchRentalApplication = async () => {
    try {
      setLoading(true);
      const rentalApplicationsCollectionRef = collection(
        db,
        "rentalApplications"
      );
      const q = query(
        rentalApplicationsCollectionRef,
        where("status", "==", category)
      );

      let rentalsList = await getDocs(q);
      setRentalApplications(mapCollectionToArrayObject(rentalsList));
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUsers();
    fetchApartmentsInfo();
  }, []);

  useEffect(() => {
    fetchRentalApplication();
  }, [category]);

  // todo data to render
  useEffect(() => {
    const rentalRowsData = rentalApplications.map((item) => {
      return {
        ...item,
        customerName: usersInfo.find((user) => {
          return user.id === item.tenantId;
        })?.fullName,
        depositMoney: apartmentsInfo.find((apartment) => {
          return apartment.id === item.apartmentId;
        })?.depositMoney,
      };
    });
    setRentalApplicationRows(rentalRowsData as RentalAppRow[]);
  }, [apartmentsInfo, rentalApplications, usersInfo]);

  const handleStatusRentalApp = async (
    id: string,
    apartmentId: string,
    status: RentAppStatus
  ) => {
    if (status) {
      // check if admin want to confirm that user renting the apartment
      // then move all the applications in the pending / processing list be

      if (status === RentAppStatus.RENTING) {
        await updateDocument("rentalApplications", id, {
          status,
          contractSigned: true,
        });

        await updateDocument("apartments", apartmentId, {
          rented: true,
        });

        // Set status of other rental applications with the same apartmentId to "Canceled"
        const rentalApplicationsColRef = collection(db, "rentalApplications");
        const q = query(
          rentalApplicationsColRef,
          where("status", "in", [
            RentAppStatus.PENDING,
            RentAppStatus.PROCESSING,
          ]),
          where("apartmentId", "==", apartmentId)
        );

        const querySnapshot = await getDocs(q);

        const updatePromises = querySnapshot.docs.map(async (doc) => {
          const appId = doc.id;
          await updateDocument("rentalApplications", appId, {
            status: RentAppStatus.CANCELED,
            note: "Your rental application has been canceled because someone else rented the house before you",
          });
        });

        await Promise.all(updatePromises);
        toast.success("Change to RENTING successfully!", {
          position: "bottom-right",
          style: {
            fontSize: "15px",
          },
        });
      } else if (status === RentAppStatus.PROCESSING) {
        //check if there's any rental application for this apartment is already place in the processing section
        const rentalApplicationsColRef = collection(db, "rentalApplications");
        const q = query(
          rentalApplicationsColRef,
          where("status", "in", [RentAppStatus.PROCESSING]),
          where("apartmentId", "==", apartmentId)
        );
        const querySnapshot = await getDocs(q);
        if (querySnapshot.docs.at(0)) {
          toast.error(
            'There is currently a request to rent this apartment in the "PROCESSING" section. You can only process 1 rental application for 1 apartment at a time',
            {
              position: "bottom-right",
              style: {
                fontSize: "15px",
              },
            }
          );
          return;
        } else {
          await updateDocument("rentalApplications", id, {
            status: RentAppStatus.PROCESSING,
          });
          toast.success("Change to PROCESSING successfully!", {
            position: "bottom-right",
            style: {
              fontSize: "15px",
            },
          });
        }
      }
      // move this one out of current list by delete it from the current list
      let newRentalRowsData = rentalApplicationRows.filter(
        (rentalApp) => rentalApp.id !== id
      );
      setRentalApplicationRows(newRentalRowsData);
    }
  };

  // function to extend rental period for the rental application was expired
  const handleExtendRentalPeriod = async (id: string, apartmentId: string) => {
    let newRentalRowsData = rentalApplicationRows.filter(
      (rentalApp) => rentalApp.id !== id
    );
    setRentalApplicationRows(newRentalRowsData);

    const apartmentData: Apartment = await getDocument(
      "apartments",
      apartmentId
    );
    const contractDurationInYears = apartmentData.contractDuration;
    const currentTimestamp = Timestamp.now();
    const newEndDate = Timestamp.fromMillis(
      currentTimestamp.toMillis() +
        contractDurationInYears * 365 * 24 * 60 * 60 * 1000
    );
    await updateDocument("rentalApplications", id, {
      status: RentAppStatus.RENTING,
      endDate: newEndDate,
    });
    toast.success("Extend rental period successfully!", {
      position: "bottom-right",
      autoClose: 1500,
    });
  };

  // function to cancel an rental application from pending list or processing list
  // because user and admin cannot find an agreement when exchange through the call
  const handleCancelPendingOrProcessing = async (rentalAppId: string) => {
    let newRentalRowsData = rentalApplicationRows.filter(
      (rentalApp) => rentalApp.id !== rentalAppId
    );
    setRentalApplicationRows(newRentalRowsData);
    await updateDocument("rentalApplications", rentalAppId, {
      status: RentAppStatus.CANCELED,
      endDate: Timestamp.now(),
    });
    toast.success("Move to cancel list successfully!", {
      position: "bottom-right",
      autoClose: 1500,
    });
  };

  // function to cancel the application from renting or expired list because
  // the user stop the contract or do not want to extend the rental period
  const handleCancelRentingOrExpired = async (
    rentalAppId: string,
    apartmentId: string
  ) => {
    let newRentalRowsData = rentalApplicationRows.filter(
      (rentalApp) => rentalApp.id !== rentalAppId
    );
    setRentalApplicationRows(newRentalRowsData);
    await updateDocument("rentalApplications", rentalAppId, {
      status: RentAppStatus.CANCELED,
      endDate: Timestamp.now(),
    });
    await updateDocument("apartments", apartmentId, {
      rented: false,
    });
    toast.success("Cancel contract successfully!", {
      position: "bottom-right",
      autoClose: 1500,
    });
  };

  // search in columns
  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<RentalAppRow> => ({
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
  const columns: ColumnsType<RentalAppRow> = [
    {
      title: "Created Date",
      dataIndex: "createdDate",

      render: (_: any, record: RentalAppRow) => (
        <span>{secondsToDateTime(record.createdDate.seconds)}</span>
      ),
      defaultSortOrder: "descend" as SortOrder,
      sorter: (a: RentalAppRow, b: RentalAppRow) =>
        a.createdDate.seconds - b.createdDate.seconds,
    },
    {
      title: "ID",
      dataIndex: "id",
      ...getColumnSearchProps("id"),
    },
    {
      title: "Apartment ID",
      dataIndex: "apartmentId",
    },
    {
      title: "Customer",
      dataIndex: "customerName",
      ...getColumnSearchProps("customerName"),
    },
    {
      title: "Deposit money",
      dataIndex: "depositMoney",
      render: (_: any, record: RentalAppRow) => (
        <Tag color="cyan">${record.depositMoneyAtRentalTime}</Tag>
      ),

      sorter: (a: RentalAppRow, b: RentalAppRow) =>
        a.depositMoneyAtRentalTime - b.depositMoneyAtRentalTime,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_: any, record: RentalAppRow) => {
        return (
          <DetailedRentalApplication
            handleCancelRentingOrExpired={handleCancelRentingOrExpired}
            onExtendRentalPeriod={handleExtendRentalPeriod}
            onChangeStatusRentalApp={handleStatusRentalApp}
            rentalApp={record}
            onCancelPendingOrProcessing={handleCancelPendingOrProcessing}
          />
        );
      },
    },
  ];

  return (
    <div className="px-4 mb-20">
      <Table
        bordered
        columns={columns}
        scroll={{ y: 350 }}
        pagination={false}
        dataSource={rentalApplicationRows}
        loading={isLoading}
        rowKey="id"
      />
    </div>
  );
};

export default RentalAppsList;
