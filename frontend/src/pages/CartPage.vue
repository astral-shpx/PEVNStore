<script setup lang="ts">
import { onMounted } from "vue";
import useUserStore from "../piniaStores/useUserStore";
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useUserStore();

onMounted(() => {
  if (!userStore.user) {
    router.push("/account");
  } else {
  }
});
</script>

<template>
  <h1>Cart</h1>
</template>
