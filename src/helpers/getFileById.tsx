import { useAppSelector } from "hooks/redux";
import { useEffect, useState } from "react";
import { iFile } from "types/files";

function GetFileById(fileId: string) {
  const files = useAppSelector((state) => state.files.files);
  const [file, setFile] = useState<iFile | null>(null);

  useEffect(() => {
    const currentFile = files.filter((file) => file._id === fileId)[0];
    setFile(currentFile);
  }, []);

  return file;
}

export default GetFileById;
