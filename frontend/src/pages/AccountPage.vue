<script setup lang="ts">
import { reactive } from "vue";
import useUserStore from "../piniaStores/useUserStore";

const userStore = useUserStore();

const login_credentials = reactive({ username: "", password: "" });

const signUp = async () => {
  await userStore.signUp();
};

const logIn = async () => {
  await userStore.logIn(login_credentials.username, login_credentials.password);
};
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
        v-model="userStore.username"
        required
      />
    </div>
    <div class="mb-2">
      <label for="email">Email:</label>
      <input
        class="text-black"
        type="email"
        id="email"
        v-model="userStore.email"
        required
      />
    </div>
    <div class="mb-2">
      <label for="password">Password:</label>
      <input
        class="text-black"
        type="password"
        id="password"
        v-model="userStore.password"
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

  <p v-if="userStore.message">{{ userStore.message }}</p>

  <div v-if="userStore.user">
    <p>Logged in as {{ userStore.user }}</p>

    <button
      @click="userStore.logOut"
      class="outline-dashed rounded-sm dark:hover:bg-slate-700 hover:bg-slate-400"
    >
      Log out
    </button>
  </div>

  <form @submit.prevent="logIn">
    <div class="mb-2">
      <label for="username">Username:</label>
      <input
        class="text-black"
        type="text"
        id="username"
        v-model="login_credentials.username"
        required
      />
    </div>
    <div class="mb-2">
      <label for="password">Password:</label>
      <input
        class="text-black"
        type="password"
        id="password"
        v-model="login_credentials.password"
        required
      />
    </div>
    <button
      class="outline-dashed rounded-sm dark:hover:bg-slate-700 hover:bg-slate-400"
      type="submit"
    >
      Log in
    </button>
  </form>
</template>
