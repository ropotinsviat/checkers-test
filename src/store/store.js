import { makeAutoObservable } from "mobx";
import axios from "axios";

const $api = axios.create({
  withCredentials: true,
  baseURL: "https://checkers-server.onrender.com/api",
});

export default class Store {
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setLoading(bool) {
    this.isLoading = bool;
  }

  async login(name, password) {
    this.setLoading(true);
    try {
      const response = await $api.post("/login", { name, password });
      console.log(response);
      localStorage.setItem("token", response.data);
      window.location.reload();
    } catch (e) {
      setTimeout(() => {
        alert(e.response?.data?.message || "Couldn't connect to server");
      }, 100);
    }
    this.setLoading(false);
  }

  async registration(email, name, password) {
    this.setLoading(true);
    try {
      const response = await $api.post("/registration", {
        name,
        email,
        password,
      });
      console.log(response);
      localStorage.setItem("token", response.data);
      window.location.reload();
    } catch (e) {
      setTimeout(() => {
        alert(e.response?.data?.message || "Couldn't connect to server");
      }, 100);
    }
    this.setLoading(false);
  }

  logout() {
    localStorage.removeItem("token");
    window.location.reload();
  }
}
