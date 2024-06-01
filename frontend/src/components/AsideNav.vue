<script setup lang="ts"></script>

<template>
  <aside class="hidden md:flex justify-start w-1/6 flex-col h-52">
    <RouterLink
      :to="`/account`"
      class="flex justify-between items-center cursor-pointer hover:underline h-1/6"
    >
      <span>Account</span><span>🔗</span>
    </RouterLink>
    <RouterLink
      :to="`/cart`"
      class="flex justify-between items-center cursor-pointer hover:underline h-1/6"
    >
      <span>Cart</span><span>🔗</span>
    </RouterLink>
    <RouterLink
      :to="`/favourites`"
      class="flex justify-between items-center cursor-pointer hover:underline h-1/6"
    >
      <span>Favouries</span><span>🔗</span>
    </RouterLink>
  </aside>
</template>
