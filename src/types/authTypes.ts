export type RegisterUserType = {
  email: string;
  password: string;
  name: string;
  role: Role;
};

export type UserType = {
  id: string;
  email: string;
  name: string;
  role: Role;
  phone: string | null;
  city: string | null;
  avatar: string | null;
};

export type EditUserType = {
  id: string;
  email: string;
  role: Role;
  name: string;
  phone: string | null;
  city: string | null;
};

export type AuthUserResponseType = {
  token: string;
  user: UserType;
};

export enum Role {
  client = "client",
  customer = "customer",
}
