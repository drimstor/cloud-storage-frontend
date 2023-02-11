import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlay,
  faFileLines,
  faImage,
} from "@fortawesome/free-regular-svg-icons";
import s from "./Sidebar.module.scss";
import ProgressCircle from "./ProgressCircle";

function SidebarInfo() {
  const [dataObject, setDataObject] = useState({
    percent1: 0,
    percent2: 0,
    percent3: 0,
  });

  const data = {
    percent1: 85,
    percent2: 60,
    percent3: 35,
  };

  const dataArray = [
    {
      icon: faCirclePlay,
      text: "Media",
      value: dataObject.percent1,
    },
    {
      icon: faImage,
      text: "Pictures",
      value: dataObject.percent2,
    },
    {
      icon: faFileLines,
      text: "Docs",
      value: dataObject.percent3,
    },
  ];

  useEffect(() => {
    const handleSetDataObject = () => {
      setDataObject(data);
    };

    const timer = setTimeout(handleSetDataObject, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={s.infoBox}>
      <div className={s.infoLoadCircle}>
        <ProgressCircle data={dataObject} />
      </div>

      <div className={s.infoData}>
        {dataArray.map((data, index) => (
          <div className={s.infoDataItem} key={index}>
            <FontAwesomeIcon icon={data.icon} />
            <span>{data.text}</span>
            <div className={s.progressBar}>
              <div
                className={s.progressLine}
                style={{ width: `${data.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SidebarInfo;
