// src/utils/authUtils.js
// Hàm validate email và xử lý đăng nhập

import { users } from "./mockUsers";

export const login = (email, password) => {
  return users.find(
    (user) => user.email === email && user.password === password
  );
};

export const logout = () => {
  localStorage.removeItem("currentUser");
  sessionStorage.removeItem("currentUser");
};
// export const logout = () => {
//   localStorage.removeItem('userToken');
//   localStorage.removeItem('userEmail');
//   localStorage.removeItem('userRole');
// };
