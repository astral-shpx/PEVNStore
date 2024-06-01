<script setup lang="ts">
import Toaster from "../components/Toaster.vue";
import useUserStore from "../piniaStores/useUserStore";
import Product from "../components/Product.vue";
import useFavouritesStore from "../piniaStores/useFavouritesStore";
import AsideNav from "../components/AsideNav.vue";

const userStore = useUserStore();
const favouritesStore = useFavouritesStore();

const removeFavourite = (id: number) => {
  favouritesStore.removeFavourite(id);
};
</script>

<template>
  <h1 class="mb-4 flex justify-center">Favourites</h1>

  <div class="flex justify-center h-full w-full mb-4">
    <div class="flex md:hidden justify-start flex-col h-full w-1/2">
      <AsideNav />
    </div>
  </div>

  <div class="flex justify-center">
    <div class="hidden md:flex justify-start w-1/6 flex-col h-52">
      <AsideNav />
    </div>
    <div class="flex flex-col justify-center md:w-1/2 w-full p-2">
      <div class="flex flex-wrap justify-center" v-if="!userStore.user">
        You must be logged in to view favourites
      </div>
      <div class="flex flex-wrap justify-center" v-else>
        <div
          v-show="
            favouritesStore.favourites.map((f) => f.product)?.length === 0
          "
        >
          You have no favourites
        </div>
        <div
          class="flex flex-col w-1/2 md:w-1/4"
          v-for="favourite in favouritesStore.favourites.map((f) => f.product)"
        >
          <div
            class="flex flex-col justify-between mb-4 mx-2 cursor-pointer hover:shadow-lg bg-gray-300 rounded dark:bg-gray-700 h-full max-h-96 p-2"
          >
            <Product :product="favourite" />

            <div class="flex justify-center">
              <button
                @click="removeFavourite(favourite.id)"
                class="flex justify-center outline-dashed rounded-sm dark:hover:bg-slate-500 hover:bg-slate-400 w-full"
              >
                remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Toaster />
</template>
