import { httpService } from "./httpService";
const url = "http://localhost:3100/users";

export async function login(data) {
  return await httpService("post", `${url}/login`, data);
}

export async function signup(data) {
  return await httpService("post", `${url}/signup`, data);
}

export async function sendEmailVerification(email) {
  return await httpService("get", `${url}/emailer/${email}`);
}

export async function verifyAccount(data) {
  return await httpService("post", `${url}/verify-account`, data);
}
