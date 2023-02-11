export interface iUser {
  id: string;
  email: string;
  diskSpace: number;
  usedSpace: number;
  avatar?: string;
}

export interface iLoginUser {
  email: string;
  password: string;
  name: string;
  file: any
}
