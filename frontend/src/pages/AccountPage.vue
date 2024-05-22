<script setup lang="ts">
import useUserStore from "../piniaStores/useUserStore";

const userStore = useUserStore();

const signUp = async () => {
  await userStore.signUp();
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
</template>
