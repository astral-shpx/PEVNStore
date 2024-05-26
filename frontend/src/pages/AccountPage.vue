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
  <div class="flex justify-center">
    <div class="flex flex-col px-2 md:w-1/2 justify-center items-center">
      <h1>Account</h1>

      <!-- forms -->
      <!-- sign up form -->
      <h3>Sign up</h3>
      <form @submit.prevent="signUp" class="mb-4">
        <div class="m-2 flex justify-between">
          <label class="mx-2" for="username">Username</label>
          <input
            class="text-black rounded-md border-2 border-slate-500"
            type="text"
            id="username"
            v-model="userStore.username"
            required
          />
        </div>
        <div class="m-2 flex justify-between">
          <label class="mx-2" for="email">Email</label>
          <input
            class="text-black rounded-md border-2 border-slate-500"
            type="email"
            id="email"
            v-model="userStore.email"
            required
          />
        </div>
        <div class="m-2 flex justify-between">
          <label class="mx-2" for="password">Password</label>
          <input
            class="text-black rounded-md border-2 border-slate-500"
            type="password"
            id="password"
            v-model="userStore.password"
            required
          />
        </div>
        <div class="mt-4 flex justify-center w-full">
          <button
            class="outline-dashed rounded-sm dark:hover:bg-slate-700 hover:bg-slate-400 w-2/3"
            type="submit"
          >
            Sign Up
          </button>
        </div>
      </form>

      <!-- user info -->
      <p v-if="userStore.message">{{ userStore.message }}</p>

      <!-- log out button -->
      <div v-if="userStore.user">
        <p>Logged in as {{ userStore.user }}</p>

        <button
          @click="userStore.logOut"
          class="outline-dashed rounded-sm dark:hover:bg-slate-700 hover:bg-slate-400"
        >
          Log out
        </button>
      </div>

      <!-- log in form -->
      <h3>Log in</h3>
      <form @submit.prevent="logIn">
        <div class="m-2 flex justify-between">
          <label class="mx-2" for="username">Username</label>
          <input
            class="text-black rounded-md border-2 border-slate-500"
            type="text"
            id="username"
            v-model="login_credentials.username"
            required
          />
        </div>
        <div class="m-2 flex justify-between">
          <label class="mx-2" for="password">Password</label>
          <input
            class="text-black rounded-md border-2 border-slate-500"
            type="password"
            id="password"
            v-model="login_credentials.password"
            required
          />
        </div>
        <div class="mt-4 flex justify-center w-full">
          <button
            class="outline-dashed rounded-sm dark:hover:bg-slate-700 hover:bg-slate-400 w-2/3"
            type="submit"
          >
            Log in
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
