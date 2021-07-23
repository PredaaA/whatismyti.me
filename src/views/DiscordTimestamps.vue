<template>
  <div class="space-y-7">
    <div>
      <p class="text-5xl font-bold">Discord Timestamp Picker</p>
    </div>
    <div>
      <p>
        <abbr title="Click to copy to clipboard" class="cursor-pointer">
          <code
            class="text-2xl bg-gray-600 p-1.5 rounded-md"
            @click="copyToClipboard($event.target.textContent)"
          >
            &lt;t:{{ Math.round(data.selectedTime / 1000) }}:{{
              data.selectedStyle
            }}&gt;
          </code>
        </abbr>
      </p>
      <p class="text-2xl">{{ data.discordRendered }}</p>
    </div>
    <div class="flex flex-col w-60 max-w-sm mx-auto bg-gray-700 p-4 rounded">
      <label for="datetime-select">Datetime</label>
      <input
        class="mt-2 text-black bg-gray-300"
        id="datetime-select"
        type="datetime-local"
        step="1"
        name="pickedTime"
        @input="updatePickedTime($event.target.value)"
      />
      <label for="style-select">Style</label>
      <select
        id="style-select"
        class="text-black bg-gray-300"
        @input="updatePickedStyle($event.target.value)"
      >
        <option value="t">t</option>
        <option value="T">T</option>
        <option value="d">d</option>
        <option value="D">D</option>
        <option value="f" selected>f</option>
        <option value="F">F</option>
        <option value="R">R</option>
      </select>
    </div>
    <div v-if="data.alertVisible">
      <Alert title="Copied to clipboard! 🎉" />
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import Alert from "../components/Alert.vue";
import { DateTime } from "luxon";

const data = reactive({
  alertVisible: false,
  selectedTime: new Date().getTime(),
  selectedStyle: "f",
  discordRendered: DateTime.now().toFormat("dd LLLL yyyy HH:mm"),
});

function updatePickedTime(pickedTime) {
  data.selectedTime = new Date(pickedTime).getTime();
  updatePickedStyle(data.selectedStyle);
}

function updatePickedStyle(pickedStyle) {
  data.selectedStyle = pickedStyle;
  const datetime = DateTime.fromJSDate(new Date(data.selectedTime));
  switch (data.selectedStyle) {
    case "t":
      data.discordRendered = datetime.toFormat("HH:mm");
      break;
    case "T":
      data.discordRendered = datetime.toFormat("HH:mm:ss");
      break;
    case "d":
      data.discordRendered = datetime.toFormat("dd/LL/yyyy");
      break;
    case "D":
      data.discordRendered = datetime.toFormat("dd LLLL yyyy");
      break;
    case "f":
      data.discordRendered = datetime.toFormat("dd LLLL yyyy HH:mm");
      break;
    case "F":
      data.discordRendered = datetime.toFormat("cccc, dd LLLL yyyy HH:mm");
      break;
    case "R":
      data.discordRendered = datetime.toRelative();
      break;
    default:
      data.discordRendered = datetime.toFormat("dd LLLL yyyy HH:mm");
  }
}

function copyToClipboard(content) {
  data.alertVisible = true;
  navigator.clipboard.writeText(content);
  setTimeout(() => {
    data.alertVisible = false;
  }, 3000);
}
</script>
