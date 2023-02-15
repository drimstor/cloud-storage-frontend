import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlay,
  faFileLines,
  faImage,
} from "@fortawesome/free-regular-svg-icons";
import s from "./Sidebar.module.scss";
import ProgressCircle from "./ProgressCircle";
import { calculateFiles } from "redux/slices/fileSlice";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { sortOneObject } from "helpers/sortOneObject";
import { sortObject } from "helpers/sortObject";

function SidebarInfo() {
  const dispatch = useAppDispatch();
  const storageSize = useAppSelector((state) => state.files.storageSize);
  const files = useAppSelector((state) => state.files.files);
  const user = useAppSelector((state) => state.user.profile);

  const [dataObject, setDataObject] = useState({
    file: 0,
    media: 0,
    picture: 0,
  });

  const dataArray = [
    {
      icon: faCirclePlay,
      text: "Media",
      value: dataObject.media,
    },
    {
      icon: faImage,
      text: "Pictures",
      value: dataObject.picture,
    },
    {
      icon: faFileLines,
      text: "Docs",
      value: dataObject.file,
    },
  ];

  sortObject(dataArray, "value", 0);

  useEffect(() => {
    const handleSetDataObject = () => {
      setDataObject({
        file: storageSize.file / (user?.diskSpace! / 100),
        media: storageSize.media / (user?.diskSpace! / 100),
        picture: storageSize.picture / (user?.diskSpace! / 100),
      });
    };
    const timer = setTimeout(handleSetDataObject, 1500);
    return () => clearTimeout(timer);
  }, [storageSize]);

  useEffect(() => {
    dispatch(calculateFiles());
  }, [files]);

  const sumValue: any = Object.values(dataObject).reduce(
    (acc: any, number: any) => acc + number,
    0
  );

  return (
    <div className={s.infoBox}>
      <div className={s.infoLoadCircle}>
        <ProgressCircle
          data={sortOneObject(dataObject, 0)}
          sumValue={sumValue}
        />
      </div>

      <div className={s.infoData}>
        {dataArray.map((data, index) => (
          <div className={s.infoDataItem} key={index}>
            <FontAwesomeIcon icon={data.icon} />
            <span>{data.text}</span>
            <div className={s.progressBar}>
              <div
                className={s.progressLine}
                style={{
                  width: `${sumValue < 33 ? data.value * 3 : data.value}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SidebarInfo;
