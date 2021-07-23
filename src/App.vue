<template>
  <div class="antialiased text-gray-300 flex flex-col min-h-screen bg-gray-800">
    <main class="flex-grow mt-52 text-center">
      <router-view></router-view>
    </main>
    <footer><Footer /></footer>
  </div>
</template>

<script setup>
import Footer from "./components/Footer.vue";
</script>
