import { MemberMeResponse } from "@/types";
import { getHeader } from "@/utils/authorization";
import { axios } from "@/utils/axios";
import { saveToken } from "@/utils/token";

type SignupProp = {
  email: string;
  name: string;
  password: string;
  authority: "ROLE_USER" | "ROLE_ADMIN";
};

type SigninProp = {
  email: string;
  password: string;
};

export async function signup(user: SignupProp): Promise<MemberMeResponse> {
  return axios.post(`/auth/register`, user).then((res) => res.data);
}

export async function login(user: SigninProp) {
  return axios
    .post(`/auth/login`, user)
    .then((res) => res.data)
    .then((data) => {
      saveToken(data.accessToken);
    });
}

export async function logout() {
  return axios.get(`/member/logout`, { headers: getHeader() });
}

export async function getMe(): Promise<MemberMeResponse> {
  return axios
    .get(`/member/me`, { headers: getHeader() })
    .then((res) => res.data);
}
