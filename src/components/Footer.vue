<template>
  <section
    class="
      bg-gray-700
      text-gray-300
      border-t-4 border-gray-800
      dark:border-gray-400
    "
  >
    <div
      class="
        max-w-screen-xl
        px-4
        py-5
        mx-auto
        space-y-6
        overflow-hidden
        sm:px-6
        lg:px-8
      "
    >
      <nav class="flex flex-wrap justify-center -mx-5 -my-5">
        <div class="px-5 py-2">
          <router-link to="/" class="text-base leading-6 hover:text-gray-800">
            Home
          </router-link>
        </div>
        <div class="px-5 py-2">
          <router-link
            to="/discordtimestamps"
            class="text-base leading-6 hover:text-gray-800"
          >
            Discord Timestamps
          </router-link>
        </div>

        <div class="px-5 py-2">
          <a
            href="https://github.com/PredaaA/whatismyti.me"
            rel="noopener"
            target="_blank"
            class="hover:text-gray-800"
          >
            <span class="sr-only">GitHub</span>
            <svg
              class="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fill-rule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </a>
        </div>
        <div class="px-5 py-2">
          <button
            id="switchTheme"
            class="flex justify-center items-center focus:outline-none"
            @click="switchTheme()"
          >
            <!-- SVGs from https://codebycorey.com/blog/dark-mode-toggle-using-tailwind-css -->
            <svg
              v-if="data.currentTheme === 'dark'"
              class="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
            <svg
              v-else
              class="w-6 h-6 text-yellow-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </button>
        </div>
      </nav>
      <p class="text-base leading-6 text-center">
        © 2021
        <a
          href="https://github.com/PredaaA"
          rel="noopener"
          target="_blank"
          class="hover:text-gray-800"
          >PredaaA</a
        >
      </p>
    </div>
  </section>
</template>

<script setup>
import { reactive } from "vue";

const data = reactive({
  currentTheme: "dark",
});

const theme = localStorage.getItem("theme");
if (theme === "dark" || theme === null) {
  document.documentElement.classList.add("dark");
}

function switchTheme() {
  const doc = document.documentElement;
  const theme = localStorage.getItem("theme");

  if (theme === "dark") {
    doc.classList.add("dark");
  }

  if (doc.classList.contains("dark")) {
    doc.classList.remove("dark");
    localStorage.setItem("theme", "light");
    data.currentTheme = "light";
  } else {
    doc.classList.add("dark");
    localStorage.setItem("theme", "dark");
    data.currentTheme = "dark";
  }
}
</script>
