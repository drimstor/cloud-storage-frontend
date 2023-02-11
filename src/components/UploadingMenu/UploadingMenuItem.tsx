import changeFormatType from "helpers/changeFormatType";
import formatSize from "helpers/formatSize";
import { getTableFileIcon } from "helpers/getFileIcon";
import { iUploadingFile } from "types/files";
import s from "./UploadingMenu.module.scss";

function UploadingMenuItem({ file }: { file: iUploadingFile }) {
  return (
    <div className={s.uploadItem}>
      <img src={getTableFileIcon(changeFormatType(file.type))} alt="file" />
      <div className={s.infoBox}>
        <div className={s.titleBox}>
          <span className={s.uploadItemTitle}>{file.name}</span>
          <span className={s.uploadItemSpan}>
            {`(${formatSize(file.size)})`}
          </span>
        </div>
        <div className={s.progressBox}>
          <div className={s.progressBar}>
            <div
              className={s.progressLine}
              style={{ width: `${file.progress}%` }}
            />
          </div>
          <span className={s.percents}>{file.progress}%</span>
        </div>
      </div>
    </div>
  );
}

export default UploadingMenuItem;
