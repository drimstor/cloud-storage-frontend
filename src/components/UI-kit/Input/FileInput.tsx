import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { faCircleCheck, faCircleDown } from "@fortawesome/free-solid-svg-icons";

interface iFileInput {
  isCheckError?: boolean;
  checkValidate?: (key: string, error: string, value: string) => void;
}

function FileInput({ checkValidate, isCheckError }: iFileInput) {
  const [image, setImage] = React.useState<any>(null);

  //------------------- Validation ----------------------//

  useEffect(() => {
    if (isCheckError && checkValidate) {
      checkValidate("file", "", image ?? "");
    }
  }, [isCheckError]);

  return (
    <>
      <input
        type="file"
        id="file"
        accept=".jpg, .jpeg, .png, .webp, .gif, .svg, .ico, .tiff, .bmp"
        name="file"
        onChange={(e) => e.target.files && setImage(e.target.files[0])}
      />
      <label htmlFor="file">
        {!!image ? (
          <FontAwesomeIcon icon={faCircleCheck} />
        ) : (
          <FontAwesomeIcon icon={faCircleDown} />
        )}
        <span>{false ? "Avatar added" : "Add an avatar"}</span>
      </label>
    </>
  );
}

export default FileInput;
