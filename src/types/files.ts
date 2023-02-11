export interface iFile {
  name: string;
  size?: number;
  type: string;
  path: string;
  user: string;
  date: string;
  childs?: string[] | [];
  parent?: string | null;
  _id: string;
  __v?: number;
}

export interface iUploadingFile extends iFile {
  progress?: number;
}

export type iFormatFile = Omit<iFile,  "user" | "_id">;
