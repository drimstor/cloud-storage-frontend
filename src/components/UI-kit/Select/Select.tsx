import { faSortDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import useClickOutside from "hooks/useClickOutside";
import { useRef, useState } from "react";
import { setSortName } from "redux/slices/controlSlice";
import s from "./Select.module.scss";

interface iSelect {
  ul: string[];
  title?: string;
}

function Select({ ul, title }: iSelect) {
  const dispatch = useAppDispatch();
  const [isOpen, setisOpen] = useState(false);
  const sort = useAppSelector((state) => state.control.sort);
  const listRef = useRef<HTMLDivElement>(null);

  const handleClickItem = (item: string) => {
    dispatch(setSortName(item.toLowerCase()));
    setisOpen(false);
  };

  useClickOutside(listRef, () => setisOpen(false));

  return (
    <div className={s.wrapper}>
      <span>{title}</span>
      <div
        ref={listRef}
        className={clsx(s.input, isOpen && s.shadow)}
        onClick={() => setisOpen(!isOpen)}
      >
        <p>{sort.name}</p>
        <FontAwesomeIcon
          icon={faSortDown}
          className={clsx(isOpen && s.rotateIcon)}
        />
      </div>

      <ul className={clsx(s.select, isOpen && s.show)}>
        {ul.map((li, index) => (
          <li
            key={index}
            className={s.item}
            onClick={() => handleClickItem(li)}
          >
            {li}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Select;
