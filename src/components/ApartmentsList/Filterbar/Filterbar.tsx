import { useEffect, useState } from "react";
import { Option } from "../../../type/Option";

import SearchIcon from "../../../icons/SearchIcon";
import { starsSelections } from "./StarSelections";

import "./Filterbar.scss";

import { IoMdClose } from "react-icons/io";
import CustomSelect from "../../../utils/CustomDropdown/CustomSelect";
interface IFilterbarProps {
  className: string;
  onCloseFilterBar: () => void;
}

const Filterbar = ({ className, onCloseFilterBar }: IFilterbarProps) => {
  const [selectedStars, setSelectedStars] = useState<Option>(
    starsSelections[0]
  );
  const [selectedProvince, setSelectedProvince] = useState<Option>({
    label: "All",
    value: 0,
  });
  const [selectedDistrict, setSelectedDistrict] = useState<Option>({
    label: "All",
    value: 0,
  });

  const [provinces, setProvinces] = useState<Option[]>([
    { label: "All", value: 0 },
  ]);
  const [districts, setDistricts] = useState<Option[]>([
    { label: "All", value: 0 },
  ]);

  const handleStarSelection = (option: Option) => {
    setSelectedStars(option);
  };

  const handleProvinceSelection = (option: Option) => {
    setSelectedProvince(option);
  };
  const handleDistrictSelection = (option: Option) => {
    setSelectedDistrict(option);
  };

  // fetch province
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://provinces.open-api.vn/api/p");
        const provinceData = await res.json();

        // Transform response to match select options format
        const provinces = provinceData.map(
          (province: { name: any; code: any }) => ({
            label: province.name,
            value: province.code,
          })
        );

        setProvinces((prevState) => [...prevState, ...provinces]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // fetch district base on the province
  // console.log(selectedProvince);
  useEffect(() => {
    const handleProvinceSelect = async () => {
      if (selectedProvince.value !== 0) {
        try {
          const url = `https://provinces.open-api.vn/api/p/${selectedProvince.value}?depth=2`;
          const res = await fetch(url);
          const province = await res.json();

          // Extract districts array
          const fetchedDistrictsData = province.districts;

          const districts = fetchedDistrictsData.map(
            (district: { name: any; code: any }) => ({
              label: district.name,
              value: district.code,
            })
          );

          setDistricts(() => [
            {
              label: "All",
              value: 0,
            },
            ...districts,
          ]);
        } catch (error) {
          console.log(error);
        }
      }
    };
    handleProvinceSelect();
  }, [selectedProvince]);

  return (
    <div className={`filterbar ${className}`}>
      <IoMdClose
        onClick={onCloseFilterBar}
        className="filterbar__close-filterbar-icon"
      />
      <div className="filterbar__section">
        <p className="field-label">Find your apartment</p>
        <div className="search-field">
          <input type="text" placeholder="What are you looking for?" />
          <SearchIcon className="search-icon" width="30" height="30" />
        </div>
      </div>
      <div className="filterbar__section">
        <p className="field-label">Property Type</p>
        <div className="checkboxes-list">
          <p className="checkbox-label-container">
            <input type="checkbox" name="all" id="all" />
            <label htmlFor="all">all</label>
          </p>
          <p className="checkbox-label-container">
            <input type="checkbox" name="houses" id="houses" />
            <label htmlFor="houses">houses</label>
          </p>
          <p className="checkbox-label-container">
            <input type="checkbox" name="apartments" id="apartments" />
            <label htmlFor="apartments">apartments</label>
          </p>
          <p className="checkbox-label-container">
            <input type="checkbox" name="office" id="office" />
            <label htmlFor="office">office</label>
          </p>
        </div>
      </div>

      <div className="filterbar__section">
        <p className="field-label">Find by Price</p>
        <div className="price-range-container">
          <div className="price-range-item">
            <p className="from-label">From</p>
            <input type="number" placeholder="Min" />
          </div>
          <div className="price-range-item">
            <p className="to-label">To</p>
            <input type="number" placeholder="Max" />
          </div>
        </div>
      </div>

      <div className="filterbar__section">
        <p className="field-label">Amenities</p>
        <div className="checkboxes-list">
          <p className="checkbox-label-container">
            <input type="checkbox" name="" id="" />
            <label htmlFor="">all</label>
          </p>
          <p className="checkbox-label-container">
            <input type="checkbox" name="" id="" />
            <label htmlFor="">houses</label>
          </p>
          <p className="checkbox-label-container">
            <input type="checkbox" name="" id="" />
            <label htmlFor="">apartments</label>
          </p>
          <p className="checkbox-label-container">
            <input type="checkbox" name="" id="" />
            <label htmlFor="">office</label>
          </p>
        </div>
      </div>

      {/* custom select box for stars selection */}
      <div className="filterbar__section">
        <p className="field-label">Filter by Stars</p>
        <CustomSelect
          className="select-box"
          onSelect={handleStarSelection}
          options={starsSelections}
          selected={starsSelections[0]}
        />
      </div>

      {/* custom select box for city selection */}
      <div className="filterbar__section">
        <p className="field-label">Filter by City</p>
        <CustomSelect
          className="select-box"
          onSelect={handleProvinceSelection}
          options={provinces}
          selected={provinces[0]}
        />
      </div>

      {/* custom select box for District selection */}
      <div className="filterbar__section">
        <p className="field-label">Filter by District</p>

        <CustomSelect
          className="select-box"
          onSelect={handleDistrictSelection}
          options={districts}
          selected={districts[0]}
        />
      </div>

      <button className="filterbar__search-btn">Search</button>
      <span className="clear-all-filter">Clear all filter</span>
    </div>
  );
};

export default Filterbar;
