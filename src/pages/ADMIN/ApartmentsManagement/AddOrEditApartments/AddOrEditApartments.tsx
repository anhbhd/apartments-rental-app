import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const inputBoxBaseCss =
  "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light";
const labelCSSBase =
  "block mb-2 text-sm font-medium text-gray-900 dark:text-white";

const AddApartments = () => {
  const [value, setValue] = useState("");

  return (
    <div className="p-6 sm:ml-6 mt-24">
      <form className=" ml-64 ">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="mb-5">
            <label className={labelCSSBase}>Apartment name</label>
            <input
              type="text"
              className={inputBoxBaseCss}
              placeholder="Apartment name..."
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="countries" className={labelCSSBase}>
              Apartment type
            </label>
            <select id="countries" className={inputBoxBaseCss}>
              <option selected>Choose a type</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
            </select>
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Area (m2)
            </label>
            <input
              type="number"
              className={inputBoxBaseCss}
              placeholder="Apartment name..."
              required
            />
          </div>
          <div className="mb-5">
            <label className={labelCSSBase}>Front direction</label>
            <input
              type="text"
              placeholder="east,west,..."
              className={inputBoxBaseCss}
              required
            />
          </div>
          <div className="mb-5">
            <label className={labelCSSBase}>Built year</label>
            <input
              type="number"
              min={1990}
              placeholder="ex: 2015"
              className={inputBoxBaseCss}
              required
            />
          </div>
          <div className="mb-5">
            <label className={labelCSSBase}>Contract duration (years)</label>
            <input type="number" className={inputBoxBaseCss} required />
          </div>
          <div className="mb-5">
            <label className={labelCSSBase}>Deposit money (dollars)</label>
            <input type="number" className={inputBoxBaseCss} required />
          </div>
          <div className="mb-5">
            <label className={labelCSSBase}>Price/month (dollars)</label>
            <input type="number" className={inputBoxBaseCss} required />
          </div>
          <div className="mb-5">
            <label className={labelCSSBase}>Number of floors</label>
            <input type="number" className={inputBoxBaseCss} required />
          </div>
          <div className="mb-5">
            <label className={labelCSSBase}>Front width (m)</label>
            <input type="number" className={inputBoxBaseCss} required />
          </div>
          <div className="mb-5">
            <label className={labelCSSBase}>Apartment owner</label>
            <input
              type="text"
              className={inputBoxBaseCss}
              placeholder="Apartment owner"
              required
            />
          </div>
          <div className="mb-5">
            <label className={labelCSSBase}>Owner phone number</label>
            <input
              type="text"
              className={inputBoxBaseCss}
              placeholder="Phone number"
              required
            />
          </div>
          <div className="mb-5">
            <label className={labelCSSBase}>Number of baths</label>
            <input
              type="text"
              className={inputBoxBaseCss}
              placeholder="1"
              required
            />
          </div>
          <div className="mb-5">
            <label className={labelCSSBase}>Number of beds</label>
            <input
              type="text"
              className={inputBoxBaseCss}
              placeholder="1"
              required
            />
          </div>

          <div className="mb-5">
            <label htmlFor="countries" className={labelCSSBase}>
              Select a province
            </label>
            <select id="countries" className={inputBoxBaseCss}>
              <option selected>Choose a country</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
            </select>
          </div>
          <div className="mb-5">
            <label htmlFor="countries" className={labelCSSBase}>
              Select a district
            </label>
            <select id="countries" className={inputBoxBaseCss}>
              <option selected>Choose a country</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
            </select>
          </div>
          <div className="mb-5">
            <label className={labelCSSBase}>Detailed address</label>
            <input
              type="text"
              className={inputBoxBaseCss}
              placeholder="Hai Ba Trung, Ha Noi"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-1 mb-4">
          <label className={labelCSSBase}>Description</label>
          <ReactQuill theme="snow" value={value} onChange={setValue} />

          <label className="block mb-2 text-sm mt-20 font-medium text-gray-900 dark:text-white">
            Additional fees
          </label>
          <ReactQuill theme="snow" value={value} onChange={setValue} />

          <label className="block mb-2 text-sm mt-20 font-medium text-gray-900 dark:text-white">
            Rental terms
          </label>
          <ReactQuill theme="snow" value={value} onChange={setValue} />
        </div>

        <div className="grid grid-cols-5 mb-4">
          {/* where to add upload avatar preview and 5 images */}
          {/* divide the grid to 2/5 for avatar preview */}
          {/* divide the grid to 3/5 for 5 images preview */}
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-14 mb-10"
        >
          Register new account
        </button>
      </form>
    </div>
  );
};

export default AddApartments;
