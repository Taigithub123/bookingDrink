import Axios from "axios";

const login = async (username, password) => {
  const { data } = await Axios.post("/api/auth/signin", { username, password });
  if (data.token) {
    localStorage.setItem("user", JSON.stringify(data));
  }

  return data;
};

const register = async (username, email, password, role) => {
  const { data } = await Axios.post("/api/auth/signup", {
    username,
    email,
    password,
    role,
  });
  return data;
};

const isAuth = () => {
  const user = localStorage.getItem("user");
  if (!user) return {};
  return JSON.parse(user);
};

export { login, register, isAuth };
