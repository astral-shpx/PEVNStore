import { defineStore } from "pinia";
import { ref, onMounted } from "vue";
import axios from "axios";

export default defineStore("user-store", () => {
  const username = ref("");
  const email = ref("");
  const password = ref("");
  const message = ref("");

  const user = ref(null);

  const signUp = async () => {
    try {
      const resp = await axios.post("/api/auth/signup", {
        username: username.value,
        email: email.value,
        password: password.value,
      });
      console.log("Sign up successful:", resp.data);
      user.value = resp.data.user.username;
      message.value = "Sign up successful.";
    } catch (error: any) {
      console.error("Failed to sign up:", error);
      message.value = `Failed to sign up. Please try again. Error: ${error.response.data.message}`;
    }
  };

  const logOut = async () => {
    try {
      const resp = await axios.post("/api/auth/logout");
      console.log("Log out successful:", resp.data);
      user.value = null;
      message.value = "Log out successful.";
    } catch (error: any) {
      console.error("Failed to log out:", error);
      message.value = `Failed to log out. Please try again. Error: ${error.response.data.message}`;
    }
  };

  const logIn = async (uname: string, pass: string) => {
    try {
      const resp = await axios.post("/api/auth/login/password", {
        username: uname,
        password: pass,
      });
      console.log("Log in successful:", resp.data);
      user.value = resp.data.user.username;
      message.value = "Log in successful.";
    } catch (error: any) {
      console.error("Failed to log in:", error);
      message.value = `Failed to log in. Please try again. Error: ${error.response.data.message}`;
    }
  };

  onMounted(async () => {
    try {
      const resp = await axios.get("/api/auth/sessionStatus");
      user.value = resp.data.session.passport.user;
      // console.log(resp.data.session);
    } catch (error: any) {
      console.error("Failed call to /api/auth/sessionStatus:", error);
    }
  });

  return {
    username,
    password,
    email,
    message,
    user,
    signUp,
    logOut,
    logIn,
  };
});
