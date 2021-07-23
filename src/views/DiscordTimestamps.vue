<template>
  <div>
    <p class="text-5xl font-bold">Discord Timestamp Picker</p>
  </div>
  <div>
    <p>
      <abbr title="Click to copy to clipboard" class="cursor-pointer">
        <code
          class="text-xl bg-gray-600 p-1.5 rounded-md"
          @click="copyToClipboard($event.target.textContent)"
        >
          &lt;t:{{ Math.round(data.selectedTime / 1000) }}:{{
            data.selectedStyle
          }}&gt;
        </code>
      </abbr>
    </p>
    <p>Click to copy to clipboard</p>
    <div class="flex flex-col w-60 max-w-sm mx-auto bg-gray-700 p-4 rounded-l">
      <input
        class="mt-2 text-black bg-gray-300"
        type="datetime-local"
        name="pickedTime"
        :value="new Date().toJSON().replace('Z', '')"
        @input="updatePickedTime($event.target.value)"
      />
      <input class="text-black bg-gray-300" type="text" v-model="data.selectedStyle" />
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
const data = reactive({
  selectedTime: new Date().getTime(),
  selectedStyle: "f",
});

function updatePickedTime(pickedTime) {
  data.selectedTime = new Date(pickedTime).getTime();
}

function copyToClipboard(content) {
  navigator.clipboard.writeText(content);
  alert("Copied to clipboard! 🎉");
}
</script>

<style lang="scss" scoped>
</style>
