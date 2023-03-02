interface Link {
  title: string;
  ref: string;
}

export interface UserInfo {
  password?: string;
  links?: Link[];
}
