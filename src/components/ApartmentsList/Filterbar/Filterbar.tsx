import { ChangeEvent, useEffect, useState } from "react";
import { Option } from "../../../Type/Option";

import SearchIcon from "../../../icons/SearchIcon";
import { starsSelections } from "./StarSelections";

import { IoMdClose } from "react-icons/io";
import CustomSelect from "../../../utils/CustomDropdown/CustomSelect";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebase_config";
import { Category } from "../../../Type/Category";
import { FilterbarType } from "../../../Type/Filterbar";
import "./Filterbar.scss";
interface IFilterbarProps {
  className: string;
  onCloseFilterBar: () => void;
  onClearFilter: () => void;
  onChangeFilter: React.Dispatch<React.SetStateAction<FilterbarType>>;
  onSearch: () => Promise<void>;
}

const Filterbar = ({
  className,
  onCloseFilterBar,
  onClearFilter,
  onChangeFilter,
  onSearch,
}: IFilterbarProps) => {
  const [selectedStars, setSelectedStars] = useState<Option>(
    starsSelections[0]
  );
  const [categories, setCategories] = useState<Category[]>([]);
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

  const [minPrice, setMinPrice] = useState<{
    value: string;
    displayValue: string;
  }>({ value: "", displayValue: "" });
  const [maxPrice, setMaxPrice] = useState<{
    value: string;
    displayValue: string;
  }>({ value: "", displayValue: "" });
  const [textSearch, setTextSearch] = useState<string>("");

  const [checkboxIdsChecked, setCheckboxIdsChecked] = useState<string[]>([]);
  const [canBeRented, setCanBeRented] = useState<string>();

  useEffect(() => {
    const fetchApartmentTypeForSelect = async () => {
      try {
        const categoriesCollectionRef = collection(db, "categories");
        const categoriesCollectionSnapshot = await getDocs(
          categoriesCollectionRef
        );
        const categoriesData: Category[] = [];
        categoriesCollectionSnapshot.docs.forEach((doc) => {
          categoriesData.push({ ...(doc.data() as Category), id: doc.id });
        });
        setCategories(categoriesData);
      } catch (err: any) {
        console.log(err);
      }
    };
    fetchApartmentTypeForSelect();
  }, []);

  // fetch province
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://provinces.open-api.vn/api/p");
        const provinceData = await res.json();

        // Transform response to match select options format
        const provinces = provinceData.map(
          (province: { name: string; code: number }) => ({
            label: province.name,
            value: province.code,
          })
        );

        setProvinces([{ label: "All", value: 0 }, ...provinces]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // fetch district base on the province
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
            (district: { name: string; code: number }) => ({
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
      } else {
        setDistricts([{ label: "All", value: 0 }]);
      }
      setSelectedDistrict({ label: "All", value: 0 });
    };
    handleProvinceSelect();
  }, [selectedProvince]);

  const handleStarSelection = (option: Option) => {
    setSelectedStars(option);

    onChangeFilter((prevFilter) => {
      return {
        ...prevFilter,
        stars: option.value as number,
      };
    });
  };

  const handleChangeMinValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    // Remove non-numeric characters
    const numericValue = parseFloat(inputValue.replace(/[^0-9.]/g, ""));

    // Check if numericValue is not NaN
    if (!isNaN(numericValue)) {
      // Format as a number for display
      const formattedAmount = numericValue.toLocaleString("en-US");

      setMinPrice({
        value: numericValue.toString(),
        displayValue: formattedAmount,
      });

      onChangeFilter((prevFilter) => {
        return {
          ...prevFilter,
          price: {
            ...prevFilter.price,
            from: {
              value: numericValue.toString(),
              displayValue: formattedAmount,
            },
          },
        };
      });
    } else {
      setMinPrice({
        value: "",
        displayValue: "",
      });

      onChangeFilter((prevFilter) => {
        return {
          ...prevFilter,
          price: {
            ...prevFilter.price,
            from: {
              value: "",
              displayValue: "",
            },
          },
        };
      });
    }
  };

  const handleChangeMaxValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    // console.log(event.target.value);
    // Remove non-numeric characters
    const numericValue = parseFloat(inputValue.replace(/[^0-9.]/g, ""));

    // Check if numericValue is not NaN
    if (!isNaN(numericValue)) {
      // Format as a number for display
      const formattedAmount = numericValue.toLocaleString("en-US");

      setMaxPrice({
        value: numericValue.toString(),
        displayValue: formattedAmount,
      });

      onChangeFilter((prevFilter) => {
        return {
          ...prevFilter,
          price: {
            ...prevFilter.price,
            to: {
              value: numericValue.toString(),
              displayValue: formattedAmount,
            },
          },
        };
      });
    } else {
      setMaxPrice({
        value: "",
        displayValue: "",
      });

      onChangeFilter((prevFilter) => {
        return {
          ...prevFilter,
          price: {
            ...prevFilter.price,
            to: {
              value: "",
              displayValue: "",
            },
          },
        };
      });
    }
  };

  const handleProvinceSelection = (option: Option) => {
    setSelectedProvince(option);
    onChangeFilter((prevFilter) => {
      return {
        ...prevFilter,
        districtCode: 0,
        cityCode: option.value as number,
      };
    });
  };

  const handleDistrictSelection = (option: Option) => {
    setSelectedDistrict(option);
    onChangeFilter((prevFilter) => {
      return {
        ...prevFilter,
        districtCode: option.value as number,
      };
    });
  };

  const handleOnChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (checkboxIdsChecked.includes(e.target.value)) {
      setCheckboxIdsChecked(
        checkboxIdsChecked.filter((item) => item !== e.target.value)
      );
    } else {
      setCheckboxIdsChecked([...checkboxIdsChecked, e.target.value]);
    }
    onChangeFilter((prevState) => {
      if (!prevState.categories.includes(e.target.value)) {
        return {
          ...prevState,
          categories: [...prevState.categories, e.target.value],
        };
      } else
        return {
          ...prevState,
          categories: prevState.categories.filter(
            (categoryId) => categoryId !== e.target.value
          ),
        };
    });
  };

  const handleChangeTextBoxSearch = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTextSearch(e.target.value);
    onChangeFilter((prevState) => {
      return {
        ...prevState,
        keyword: e.target.value,
      };
    });
  };

  const handleClearFilter = () => {
    onClearFilter();
    setSelectedStars(starsSelections[0]); // Reset selectedStars state
    setSelectedProvince({ label: "All", value: 0 }); // Reset selectedProvince state
    setSelectedDistrict({ label: "All", value: 0 }); // Reset selectedDistrict state
    setCanBeRented("");
    setMinPrice({ value: "", displayValue: "" });
    setMaxPrice({ value: "", displayValue: "" });
    setTextSearch("");
    setCheckboxIdsChecked([]);
  };

  function handleChangeCanbeRented(event: ChangeEvent<HTMLInputElement>): void {
    setCanBeRented((prev) =>
      prev === event.target.value ? "" : event.target.value
    );
    onChangeFilter((prev) => ({
      ...prev,
      canBeRented:
        prev.canBeRented === event.target.value ? "" : event.target.value,
    }));
  }

  return (
    <div className={`filterbar ${className}`}>
      <IoMdClose
        onClick={onCloseFilterBar}
        className="filterbar__close-filterbar-icon"
      />
      <div className="filterbar__section">
        <p className="field-label">Find your apartment</p>
        <div className="search-field">
          <input
            onChange={handleChangeTextBoxSearch}
            type="text"
            placeholder="What are you looking for?"
            value={textSearch}
          />
          <SearchIcon className="search-icon" width="30" height="30" />
        </div>
      </div>
      <div className="filterbar__section">
        <p className="field-label">Property Type</p>
        <div className="checkboxes-list">
          {categories.map((category) => (
            <p key={category.id} className="checkbox-label-container">
              <input
                onChange={handleOnChangeCheckbox}
                type="checkbox"
                value={category.id}
                name="categories"
                id={category.id}
                checked={checkboxIdsChecked.includes(category.id)}
              />
              <label htmlFor={category.id}>{category.name}</label>
            </p>
          ))}
        </div>
      </div>

      <div className="filterbar__section">
        <p className="field-label">Filter by status</p>
        <div className="checkboxes-list">
          <p className="checkbox-label-container">
            <input
              onChange={handleChangeCanbeRented}
              type="checkbox"
              value="canberented"
              name="canberented"
              id="canberented"
              checked={Boolean(canBeRented)}
            />
            <label htmlFor="canberented">Available for renting</label>
          </p>
        </div>
      </div>

      <div className="filterbar__section">
        <p className="field-label">Find by Price (In dollars)</p>
        <div className="price-range-container">
          <div className="price-range-item">
            <p className="from-label">Min price</p>
            <input
              type="text"
              onChange={handleChangeMinValue}
              value={`$ ${minPrice.displayValue}`}
              name="currency-field"
              id="currency-field"
              placeholder="$100"
              autoComplete="off"
            />
          </div>
          <div className="price-range-item">
            <p className="to-label">Max price</p>
            <input
              type="text"
              onChange={handleChangeMaxValue}
              value={`$ ${maxPrice.displayValue}`}
              name="currency-field"
              id="currency-field"
              autoComplete="off"
              placeholder="$1,000"
            />
          </div>
        </div>
      </div>

      {/* custom select box for stars selection */}
      <div className="filterbar__section">
        <p className="field-label">Filter by Stars</p>
        <CustomSelect
          className="select-box"
          onSelect={handleStarSelection}
          options={starsSelections}
          selected={selectedStars}
        />
      </div>

      {/* custom select box for city selection */}
      <div className="filterbar__section">
        <p className="field-label">Filter by City</p>
        <CustomSelect
          className="select-box"
          onSelect={handleProvinceSelection}
          options={provinces}
          selected={selectedProvince}
        />
      </div>

      {/* custom select box for District selection */}
      <div className="filterbar__section">
        <p className="field-label">Filter by District</p>

        <CustomSelect
          className="select-box"
          onSelect={handleDistrictSelection}
          options={districts}
          selected={selectedDistrict}
        />
      </div>

      <button className="filterbar__search-btn" onClick={onSearch}>
        Search
      </button>
      <span onClick={handleClearFilter} className="clear-all-filter">
        Clear all filter
      </span>
    </div>
  );
};

export default Filterbar;
