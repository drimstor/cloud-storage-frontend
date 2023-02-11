import clsx from "clsx";
import { FC } from "react";
import styles from "./Checkbox.module.scss";

interface iCheckbox {
  state: boolean;
  onChange: () => void;
}

const Checkbox: FC<iCheckbox> = ({ state, onChange }) => {
  return (
    <label className={styles.label}>
      <input type="checkbox" onChange={onChange} checked={state} />
      <svg
        className={clsx(styles.checkbox, state && styles.active)}
        aria-hidden="true"
        viewBox="-2 0 19 11"
        fill="none"
      >
        <path d="M1 4.5L5 9L14 1" strokeWidth="2" stroke="#fff" />
      </svg>
    </label>
  );
};

export default Checkbox;
