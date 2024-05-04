<template>
  <Teleport to="body">
    <Transition name="toast">
      <div
        v-if="toastStore.toasts.length"
        class="fixed bottom-8 right-5 z-50 flex flex-col gap-4"
      >
        <TransitionGroup name="toast" tag="ul">
          <li
            v-for="toast in toastStore.toasts"
            :class="[
              'flex items-center gap-4 border p-5 rounded-md',
              toastClassMap[toast.status],
            ]"
            :key="toast.text"
          >
            <span class="text-sm font-semibold">
              {{ toast.text }}
            </span>
          </li>
        </TransitionGroup>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import useToasterStore from "../piniaStores/useToasterStore";

const toastClassMap = {
  warning: "bg-yellow-200 border-yellow-500 text-yellow-800",
  error: "bg-red-200 border-red-500 text-red-800",
  success: "bg-green-200 border-green-500 text-green-800",
};

const toastStore = useToasterStore();
</script>

<style>
.toast-enter-from,
.toast-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
.toast-enter-active,
.toast-leave-active {
  transition: all 0.25s ease;
}
</style>
