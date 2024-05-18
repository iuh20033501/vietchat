import http from "../utils/http";

export const loginAPI = (phone: string, password: string) =>
  http.post("/v1/auth/login", { phone, password });

// gửi yêu cầu quên mk
export const reqForgetPWAPI = (phone: string) =>
  http.post("/v1/auth/password/forgot", { phone });
// xác nhận otp
export const reqConfirmOTPAPI = (phone: string, otp: string) =>
  http.post("/v1/auth/password/reset/validate", { phone, otp });
//  đặt lại mk
export const reqResetPWAPI = (password: string, token: string) =>
  http.post("/v1/auth/password/reset", { password, token });

export const registerAPI = (
  firstName: string,
  lastName: string,
  gender: boolean,
  birthday: string,
  password: string,
  token: string
) => {
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    firstName,
    lastName,
    gender,
    birthday,
    password,
  });
  return http.post("/v1/auth/register", body, { headers });
};

export const getProfileAPI = (token: string) =>
  http.get("/v1/users/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
// export const registerAPI = (phone: string) =>http.post("/v1/verification/otp/sms/send", { phone});
