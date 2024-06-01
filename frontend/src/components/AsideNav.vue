<script setup lang="ts"></script>

<template>
  <aside class="h-full">
    <RouterLink
      :to="`/account`"
      class="flex justify-between items-center cursor-pointer hover:underline h-10 border-2 p-2 rounded-md mb-2"
    >
      <span>Account</span><span>🔗</span>
    </RouterLink>
    <RouterLink
      :to="`/cart`"
      class="flex justify-between items-center cursor-pointer hover:underline h-10 border-2 p-2 rounded-md mb-2"
    >
      <span>Cart</span><span>🔗</span>
    </RouterLink>
    <RouterLink
      :to="`/favourites`"
      class="flex justify-between items-center cursor-pointer hover:underline h-10 border-2 p-2 rounded-md mb-2"
    >
      <span>Favouries</span><span>🔗</span>
    </RouterLink>
  </aside>
</template>
