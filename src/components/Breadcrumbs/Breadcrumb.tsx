import { faCloud } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import React, { MouseEvent } from "react";
import { Link } from "react-router-dom";
import {
  setActiveMultiSelect,
  setClearItemsMultiSelect,
  setCurrentDir,
  setNewStack,
} from "redux/slices/controlSlice";
import s from "../MainBox/MainBox.module.scss";

interface BreadcrumbProps {
  dir: {
    name: string;
    id: string | null;
  };
}

function Breadcrumb({ dir }: BreadcrumbProps) {
  const dispatch = useAppDispatch();
  const multiSelectIsActive = useAppSelector(
    (state) => state.control.multiSelect.isActive
  );

  const onClickHandler = (event: MouseEvent, id: string | null) => {
    event?.preventDefault();
    dispatch(setCurrentDir(id));
    dispatch(setNewStack(dir));

    if (!!multiSelectIsActive) {
      dispatch(setClearItemsMultiSelect());
      dispatch(setActiveMultiSelect());
    }
  };

  if (dir.name === "Home" && dir.id === null) {
    return (
      <Link
        to={dir.name}
        onClick={(event) => onClickHandler(event, dir.id)}
        className={s.homeIcon}
      >
        <FontAwesomeIcon icon={faCloud} />
      </Link>
    );
  }

  return (
    <Link to={dir.name} onClick={(event) => onClickHandler(event, dir.id)}>
      {dir.name}
    </Link>
  );
}

export default Breadcrumb;
