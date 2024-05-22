<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";

// Define form data
const username = ref("");
const email = ref("");
const password = ref("");
const message = ref("");
const user = ref({});

const signUp = async () => {
  try {
    const resp = await axios.post("/api/auth/signup", {
      username: username.value,
      email: email.value,
      password: password.value,
    });
    console.log("Sign up successful:", resp.data);
    localStorage.setItem("user", JSON.stringify(resp.data));
    // message.value = `Sign up successful. ${resp.data.message}`;
    message.value = "Sign up successful.";
  } catch (error: any) {
    console.error("Failed to sign up:", error);
    message.value = `Failed to sign up. Please try again. Error: ${error.response.data.message}`;
  }
};

onMounted(() => {
  const savedUser = localStorage.getItem("user");
  if (savedUser) {
    user.value = JSON.parse(savedUser);
  } else {
    // user.value = { username: "Guest" };
  }
});
</script>

<template>
  <h1>Account</h1>

  <div>Sign up</div>
  <form @submit.prevent="signUp">
    <div class="mb-2">
      <label for="username">Username:</label>
      <input
        class="text-black"
        type="text"
        id="username"
        v-model="username"
        required
      />
    </div>
    <div class="mb-2">
      <label for="email">Email:</label>
      <input
        class="text-black"
        type="email"
        id="email"
        v-model="email"
        required
      />
    </div>
    <div class="mb-2">
      <label for="password">Password:</label>
      <input
        class="text-black"
        type="password"
        id="password"
        v-model="password"
        required
      />
    </div>
    <button
      class="outline-dashed rounded-sm dark:hover:bg-slate-700 hover:bg-slate-400"
      type="submit"
    >
      Sign Up
    </button>
  </form>

  <p v-if="message">{{ message }}</p>

  <p>Logged in as {{ user }}</p>
</template>
