<template>
  <div
    class="
      antialiased
      bg-gray-300
      text-gray-800
      dark:bg-gray-800
      dark:text-gray-300
      flex flex-col
      min-h-screen
    "
  >
    <main class="flex-grow mt-52 text-center">
      <router-view></router-view>
    </main>
    <footer><Footer /></footer>
  </div>
</template>

<script setup>
import Footer from "./components/Footer.vue";
</script>
