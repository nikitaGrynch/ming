import {
  AuthUserResponseType,
  EditUserType,
  RegisterUserType,
  UserType,
} from "@customTypes/authTypes";
import axios from "axios";

const REGISTER_USER_URL =
  "https://shelterbackapi.azurewebsites.net/Account/RegisterUser";

const LOGIN_USER_URL = (email: string, password: string) =>
  `https://shelterbackapi.azurewebsites.net/Account/AuthenticateUser?userEmail=${email}&userPassword=${password}`;

const GET_USER_BY_ID_URL = (id: string) =>
  `https://shelterbackapi.azurewebsites.net/Account/GetUserById/${id}`;

const EDIT_USER_URL = (id: string) =>
  `https://shelterbackapi.azurewebsites.net/Account/EditUser/${id}`;

export const loginUser = async (
  email: string,
  password: string
): Promise<AuthUserResponseType | null> => {
  try {
    const response = await axios.post(LOGIN_USER_URL(email, password));
    const token = response.data.token;
    const user: UserType = {
      id: response.data.user.id,
      email: response.data.user.email,
      name: response.data.user.name,
      role: response.data.user.role,
      phone: response.data.user.phone,
      avatar: response.data.user.avatar,
      city: response.data.user.city,
    };
    return { token, user };
  } catch {}
  return null;
};

export const registerUser = async (
  user: RegisterUserType
): Promise<AuthUserResponseType | null> => {
  try {
    const registerRes = await axios.post(REGISTER_USER_URL, user);
    if (registerRes.status === 200) {
      const loginRes = await loginUser(user.email, user.password);
      if (loginRes) {
        return loginRes;
      }
    }
  } catch {}
  return null;
};

export const getUserById = async (id: string): Promise<UserType | null> => {
  try {
    const response = await axios.get(GET_USER_BY_ID_URL(id));
    const user: UserType = {
      id: response.data.id,
      email: response.data.email,
      name: response.data.name,
      role: response.data.role,
      phone: response.data.phone,
      avatar: response.data.avatar,
      city: response.data.city,
    };
    return user;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const editUser = async (
  id: string,
  userData: EditUserType
): Promise<boolean> => {
  try {
    const response = await axios.patch(EDIT_USER_URL(id), userData);
    if (response.status === 200) {
      return true;
    }
  } catch (e) {
    console.log(e);
  }
  return false;
};
