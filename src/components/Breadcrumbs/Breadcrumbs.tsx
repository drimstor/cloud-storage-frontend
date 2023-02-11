import { useAppSelector } from "hooks/redux";
import s from "../MainBox/MainBox.module.scss";
import Breadcrumb from "./Breadcrumb";

function Breadcrumbs() {
  const pathStack = useAppSelector((state) => state.control.dirStack);
  return (
    <div className={s.breadcrumbsBox}>
      <Breadcrumb
        dir={{
          name: "Home",
          id: null,
        }}
      />
      {pathStack &&
        pathStack.map((dir: any, index: number) => (
          <Breadcrumb dir={dir} key={index} />
        ))}
    </div>
  );
}

export default Breadcrumbs;
