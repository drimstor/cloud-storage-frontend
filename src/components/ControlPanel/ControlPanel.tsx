import IconButton from "components/UI-kit/Buttons/IconButton";
import Select from "components/UI-kit/Select/Select";
import s from "./ControlPanel.module.scss";
import ToolTip from "components/UI-kit/Tooltip/ToolTip";
import Search from "components/UI-kit/Search/Search";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { setShowModal } from "redux/slices/messageSlice";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { numbersArr, selectArr } from "./ControlPanelConstants";
import {
  setActiveMultiSelect,
  setClearItemsMultiSelect,
  setCurrentDir,
  setPopFromStack,
  setSortOrder,
  setViewVariant,
} from "redux/slices/controlSlice";
import {
  faArrowDownShortWide,
  faArrowUpShortWide,
  faChevronLeft,
  faFolderPlus,
  faHouse,
  faListCheck,
  faListUl,
  faTableCellsLarge,
  faTrashCan,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";

function ControlPanel() {
  const dispatch = useAppDispatch();
  const control = useAppSelector((state) => state.control);
  const isOrder = control.sort.order === -1;
  const selectedItems = control.multiSelect.items.length;

  const backClickHandler = () => {
    dispatch(setPopFromStack(control.dirStack[control.dirStack.length - 1]));
    if (control.dirStack.length === 1) {
      dispatch(setCurrentDir(null));
    } else {
      dispatch(setCurrentDir(control.dirStack[control.dirStack.length - 2].id));
    }

    if (!!control.multiSelect.isActive) {
      dispatch(setClearItemsMultiSelect());
      dispatch(setActiveMultiSelect());
    }
  };

  const toggleMultiSelectHandler = () => {
    dispatch(setActiveMultiSelect());
    if (control.multiSelect.isActive) {
      dispatch(setClearItemsMultiSelect());
    }
  };

  const [selectedNumberIcon, setSelectedNumberIconIcon] = useState<any>(
    numbersArr[0]
  );
  const [selectedNumberIcon2, setSelectedNumberIconIcon2] = useState<any>(
    numbersArr[0]
  );

  useEffect(() => {
    const number = numbersArr.filter((number) =>
      number.iconName.includes(String(selectedItems))
    );
    if (selectedItems < 10) {
      setSelectedNumberIconIcon(number[0]);
    } else {
      const selectedNumber = String(selectedItems).split("");

      const selectedNumber1 = numbersArr.filter((number) =>
        number.iconName.includes(selectedNumber[0])
      );
      setSelectedNumberIconIcon(selectedNumber1[0]);

      const selectedNumber2 = numbersArr.filter((number) =>
        number.iconName.includes(selectedNumber[1])
      );
      setSelectedNumberIconIcon2(selectedNumber2[0]);
    }
  }, [control.multiSelect.items]);

  return (
    <div className={s.controlPanel}>
      <ToolTip title={control.currentDir === null ? "Home" : "Back"}>
        <IconButton
          icon={faHouse}
          secondIcon={faChevronLeft}
          state={control.currentDir === null}
          onClick={backClickHandler}
        />
      </ToolTip>
      <ToolTip title="Create folder">
        <IconButton
          icon={faFolderPlus}
          onClick={() => dispatch(setShowModal("createFolder"))}
        />
      </ToolTip>
      <ToolTip title="Upload file">
        <IconButton
          icon={faUpload}
          onClick={() => dispatch(setShowModal("uploadFile"))}
        />
      </ToolTip>

      <div className={clsx(selectedItems > 99 && s.multiSelectBox)}>
        <ToolTip title="Select">
          <IconButton
            icon={faListCheck}
            onClick={toggleMultiSelectHandler}
            secondIcon={selectedNumberIcon}
            thirdIcon={selectedItems > 9 ? selectedNumberIcon2 : ""}
            state={!control.multiSelect.isActive}
          />
        </ToolTip>
      </div>

      {!!selectedItems && (
        <ToolTip title="Delete">
          <IconButton
            icon={faTrashCan}
            onClick={() => dispatch(setShowModal("deleteFile"))}
          />
        </ToolTip>
      )}

      <Search />

      <Select title={"Sort by"} ul={selectArr} />

      <ToolTip title="Order">
        <IconButton
          icon={faArrowUpShortWide}
          secondIcon={faArrowDownShortWide}
          state={isOrder}
          onClick={() => dispatch(setSortOrder(isOrder ? 1 : -1))}
        />
      </ToolTip>
      <ToolTip title="Grid">
        <IconButton
          icon={faTableCellsLarge}
          onClick={() => dispatch(setViewVariant("grid"))}
        />
      </ToolTip>
      <ToolTip title="List">
        <IconButton
          icon={faListUl}
          onClick={() => dispatch(setViewVariant("list"))}
        />
      </ToolTip>
    </div>
  );
}

export default ControlPanel;
