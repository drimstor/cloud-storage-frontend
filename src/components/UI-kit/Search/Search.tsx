import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import React, { useState } from "react";
import { getFiles, searchFile, setSortFiles } from "redux/slices/fileSlice";
import { setShowLoader } from "redux/slices/messageSlice";
import s from "./Search.module.scss";

function Search() {
  const dispatch = useAppDispatch();
  const files = useAppSelector((state) => state.files.files);
  const control = useAppSelector((state) => state.control);
  const [searchName, setSearchName] = useState("");
  const [searchTimeout, setSearchTimeout] = useState<false | NodeJS.Timeout>(
    false
  );

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(event.target.value);
    dispatch(setShowLoader(true));

    if (!!searchTimeout) {
      clearTimeout(searchTimeout);
    }

    if (!!event.target.value) {
      setSearchTimeout(
        setTimeout(
          (value) => dispatch(searchFile(value)),
          300,
          event.target.value
        )
      );
    } else {
      dispatch(getFiles(control.currentDir));
      !!files.length && dispatch(setSortFiles(control.sort));
    }
  };

  return (
    <div className={s.searchBox}>
      <input
        type="text"
        className={s.search}
        placeholder="Search"
        onChange={onChangeHandler}
        value={searchName}
      />
      <FontAwesomeIcon icon={faMagnifyingGlass} />
    </div>
  );
}

export default Search;
