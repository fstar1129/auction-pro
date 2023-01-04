import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../../../app/store-hooks";
import FilterButton from "../../Partials/FilterButton";
import {
  selectMarketplace,
  setFiltersAmount,
  setOrderFilters,
} from "../../../../state/marketplace/marketplaceSlice";

const URL = `${process.env.NEXT_PUBLIC_IMMUTABLE_X_URL}/v1/collections/${process.env.NEXT_PUBLIC_IMX_ASSETS_COLLECTION}/filters`;

const AssetsFilters: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const marketplace = useAppSelector(selectMarketplace);

  const [filters, setFilters] = useState({});
  const [filtersData, setFiltersData] = useState([]);
  const [filterCategory, setFilterCategory] = useState("");
  const [filterAmount, setFilterAmount] = useState(0);

  const [sidebar, setSidebar] = useState<boolean>(false);

  const [toggleCategory, setToggleCategory] = useState<any>(false);

  const [list, setList] = useState([]);

  const handleSidebar = (): void => setSidebar(!sidebar);

  useEffect(() => {
    try {
      const fetchFilters = async () => {
        const { data } = await axios.get(URL);
        setFiltersData(data);
      };
      fetchFilters();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleChange = (e) => {
    if (e.target.checked) {
      Object.assign(filters, {
        [filterCategory]: [e.target.value.slice(0, -1)].concat(
          filters[filterCategory]
        ),
      });
      Object.assign(filters, {
        [filterCategory]: filters[filterCategory]?.filter(
          (item) => item !== undefined
        ),
      });
      dispatch(setOrderFilters(JSON.stringify(filters)));
      setFilterAmount((prev) => prev + 1);
    }
    if (!e.target.checked) {
      Object.assign(filters, {
        [filterCategory]: filters[filterCategory]?.filter(
          (item) => item !== e.target.value.slice(0, -1)
        ),
      });
      if (filters[filterCategory]?.length === 0) {
        delete filters[filterCategory];
      }
      dispatch(setOrderFilters(JSON.stringify(filters)));
      setFilterAmount((prev) => prev - 1);
    }
  };

  useEffect(() => {
    dispatch(setFiltersAmount(filterAmount));
  }, [filterAmount]);

  const toggles = (index) => {
    if (toggleCategory === index) {
      return setToggleCategory(null);
    }
    setToggleCategory(index);
  };

  const handleCheckboxes = (e) => {
    e.target.checked
      ? setList([...list, e.target.value])
      : setList([...list].filter((o) => o !== e.target.value));
  };

  const clear = () => {
    setFilters({});
    setList([]);
    dispatch(setOrderFilters({}));
    dispatch(setFiltersAmount(0));
    setFilterAmount(0);
  };

  return (
    <div>
      <div
        className={`flex gap-5 ease duration-300 dmd:mr-[0px] dsm:flex-wrap justify-center items-center ${
          sidebar ? "mr-[300px]" : ""
        }`}
      >
        <FilterButton handleSidebar={handleSidebar} clicked={sidebar} />
      </div>
      <div
        className={`fixed bottom-0 w-[325px] h-[10%] ease duration-300 z-[11] flex px-5 mr-[17px] bg-elementor-text-2 items-center border-t-2 border-[rgba(255,255,255,0.1)] ${
          sidebar ? "-right-[17px]" : "right-[-1000px]"
        }`}
      >
        <div className="flex justify-between items-center w-full">
          <button
            onClick={clear}
            className={`text-elementor-text-3 font-display text-4xl ease duration-300 cursor-pointer  ${
              marketplace.marketplaceFilters.filtersAmount === 0
                ? "text-opacity-30 cursor-not-allowed disabled"
                : "text-opacity-100 hover:text-white"
            }`}
            disabled={
              marketplace.marketplaceFilters.filtersAmount === 0 ? true : false
            }
          >
            Clear All
          </button>
          <div>
            <button
              onClick={handleSidebar}
              className="w-[40px] h-[40px] rounded-full  flex justify-center items-center mb-1"
            >
              <img
                src={"exchange_and_buy/x_neutral.png"}
                className="w-[34px] h-auto cursor-pointer"
                onMouseEnter={({ currentTarget }) =>
                  currentTarget?.setAttribute(
                    "src",
                    "exchange_and_buy/x_active.png"
                  )
                }
                onMouseLeave={({ currentTarget }) =>
                  currentTarget?.setAttribute(
                    "src",
                    "exchange_and_buy/x_neutral.png"
                  )
                }
              />
            </button>
          </div>
        </div>
      </div>
      <div
        className={`fixed top-0 bg-elementor-text-2 ease duration-300 overflow-y-scroll scrollbar-hide z-[5] flex justify-start flex-col pt-8 h-[90.5%] ${
          sidebar ? "w-[325px] h-full right-0" : "right-[-1000px]"
        }`}
      >
        {filtersData.map((filter, index) => {
          return (
            <div key={index}>
              <ul onClick={() => setFilterCategory(filter.key)}>
                <li>
                  <div
                    className="cursor-pointer"
                    onClick={() => toggles(index)}
                  >
                    <div className="flex flex-row-reverse items-center justify-between px-7 border-b-2 border-[rgba(255,255,255,0.1)]">
                      <div className="flex flex-row-reverse justify-between items-center gap-5">
                        {toggleCategory === index ? (
                          <img
                            className="w-[10px] h-[10px]"
                            src={"filter_icons/arrowup.svg"}
                          />
                        ) : (
                          <img
                            className="w-[10px] h-[10px]"
                            src={"filter_icons/arrowdown.svg"}
                          />
                        )}
                        <div
                          className={`flex justify-center items-center w-[40px] h-[40px] ease duration-100 rounded-md bg-transparent border-4 border-elementor-text-1 ${
                            filters[filter?.key]?.length === 0 ||
                            filters[filter?.key]?.length === undefined
                              ? "opacity-0"
                              : "opacity-100"
                          }`}
                        >
                          <p
                            className={
                              "text-elementor-text-1 font-display text-[1.4rem] cursor-pointer py-3"
                            }
                          >
                            {filters[filter?.key]?.length !== 0 &&
                              filters[filter?.key]?.length}
                          </p>
                        </div>
                      </div>
                      <h6 className="text-elementor-text-1 font-display text-[1.25rem] py-3 ease duration-300 hover:text-white">
                        {filter.key.charAt(0).toUpperCase() +
                          filter.key.replace("_", " ").slice(1)}
                      </h6>
                    </div>
                  </div>
                  {toggleCategory === index ? (
                    <div
                      className={`py-1 ${
                        index != 7
                          ? "border-b-2 border-[rgba(255,255,255,0.1)]"
                          : ""
                      }`}
                    >
                      {filter.value.sort().map((val, index) => {
                        return (
                          <div
                            key={index}
                            className="pl-10 py-[1px] flex items-center gap-3"
                          >
                            <input
                              type="checkbox"
                              value={(val += toggleCategory)}
                              checked={list.includes(val)}
                              className="cursor-pointer accent-elementor-text-1 bg-elementor-text-3"
                              onChange={(e) => {
                                handleChange(e);
                                handleCheckboxes(e);
                              }}
                              id={`checkbox_${val}`}
                            />
                            <label
                              htmlFor={`checkbox_${val}`}
                              className="text-elementor-text-3 font-display text-[1.2rem] cursor-pointer"
                            >
                              {val.slice(0, -1)}
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  ) : null}
                </li>
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AssetsFilters;
