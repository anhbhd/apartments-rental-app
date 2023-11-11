import { useState } from "react";
import { Selection } from "../../../type/Selection";

import SearchIcon from "../../../icons/SearchIcon";
import { starsSelections } from "./StarSelections";

import { citiesSelections } from "./CitySelection";
import "./Filterbar.scss";
const Filterbar = () => {
  const [selectedStars, setSelectedStars] = useState<Selection>(
    starsSelections[0]
  );
  const [selectedCity, setSelectedCity] = useState<Selection>(
    starsSelections[0]
  );
  const [starsSeletectBoxIsOpen, setStarsSeletecBoxtIsOpen] =
    useState<boolean>(false);

  const [citiesSeletectBoxIsOpen, setCitiesSeletecBoxtIsOpen] =
    useState<boolean>(false);

  const handleStarSelection = (option: Selection) => {
    setSelectedStars(option);
    setStarsSeletecBoxtIsOpen(!starsSeletectBoxIsOpen);
  };
  const handleCitySelection = (option: Selection) => {
    setSelectedCity(option);
    setCitiesSeletecBoxtIsOpen(!citiesSeletectBoxIsOpen);
  };

  return (
    <div className="filterbar">
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
        <p className="field-label">Fill by Stars</p>
        <div
          className="selected-stars"
          onClick={() => setStarsSeletecBoxtIsOpen(!starsSeletectBoxIsOpen)}
        >
          {selectedStars.text}
        </div>

        <span className="selectbox-container selectbox-stars-container">
          {starsSeletectBoxIsOpen && (
            <ul className="selectbox-ul selectbox-stars">
              {starsSelections.map((item) => (
                <li key={item.value} onClick={() => handleStarSelection(item)}>
                  {item.text}
                </li>
              ))}
            </ul>
          )}
        </span>
      </div>

      {/* custom select box for city selection */}
      <div className="filterbar__section">
        <p className="field-label">Fill by City</p>
        <div
          className="selected-city"
          onClick={() => setCitiesSeletecBoxtIsOpen(!citiesSeletectBoxIsOpen)}
        >
          {selectedCity.text}
        </div>

        <span className="selectbox-container ">
          {citiesSeletectBoxIsOpen && (
            <ul className="selectbox-ul selectbox-cities">
              {citiesSelections.map((item) => (
                <li key={item.value} onClick={() => handleCitySelection(item)}>
                  {item.text}
                </li>
              ))}
            </ul>
          )}
        </span>
      </div>

      {/* custom select box for District selection */}
      <div className="filterbar__section">
        <p className="field-label">Fill by District</p>
        <div
          className="selected-city"
          onClick={() => setCitiesSeletecBoxtIsOpen(!citiesSeletectBoxIsOpen)}
        >
          {selectedCity.text}
        </div>

        <span className="selectbox-container ">
          {citiesSeletectBoxIsOpen && (
            <ul className="selectbox-ul selectbox-cities">
              {citiesSelections.map((item) => (
                <li key={item.value} onClick={() => handleCitySelection(item)}>
                  {item.text}
                </li>
              ))}
            </ul>
          )}
        </span>
      </div>

      <button className="filterbar__search-btn">Search</button>
      <span className="clear-all-filter">Clear all filter</span>
    </div>
  );
};

export default Filterbar;
