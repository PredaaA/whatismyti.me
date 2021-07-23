<template>
  <div class="space-y-7">
    <div>
      <p class="text-5xl font-bold">Discord Timestamp Picker</p>
    </div>
    <div>
      <p>
        <abbr title="Click to copy to clipboard" class="cursor-pointer">
          <code
            class="text-2xl bg-gray-400 dark:bg-gray-600 p-1.5 rounded-md"
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
    <div
      class="
        flex flex-col
        w-60
        max-w-sm
        mx-auto
        p-4
        rounded
        bg-gray-400
        dark:bg-gray-600
      "
    >
      <label for="datetime-select">Datetime</label>
      <input
        v-if="!isFirefox()"
        class="mt-2 text-black bg-gray-300"
        id="datetime-select"
        type="datetime-local"
        step="1"
        name="pickedTime"
        @input="updatePickedDateTime($event.target.value)"
      />
      <div v-else>
        <input
          class="mt-2 text-black bg-gray-300"
          id="datetime-select"
          type="date"
          step="1"
          name="pickedTime"
          @input="updatePickedDate($event.target.value)"
        />
        <input
          class="mt-2 text-black bg-gray-300"
          id="datetime-select"
          type="time"
          step="1"
          name="pickedTime"
          @input="updatePickedTime($event.target.value)"
        />
      </div>
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

function isFirefox() {
  return navigator.userAgent.indexOf("Firefox") > -1;
}

function updatePickedDateTime(pickedDateTime) {
  if (pickedDateTime) {
    data.selectedTime = new Date(pickedDateTime).getTime();
  } else {
    data.selectedTime = new Date().getTime();
  }
  updatePickedStyle(data.selectedStyle);
}

// Firefox doesn't support datetime-local, so it needs special stuff for it.
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/datetime-local
// https://bugzilla.mozilla.org/show_bug.cgi?id=888320
function updatePickedDate(pickedDate) {
  if (pickedDate) {
    data.selectedTime = new Date(pickedDate).getTime();
  } else {
    data.selectedTime = new Date().getTime();
  }
  updatePickedStyle(data.selectedStyle);
}
function updatePickedTime(pickedTime) {
  if (pickedTime) {
    const hours = pickedTime.slice(0, 2),
      minutes = pickedTime.slice(3, 5),
      seconds = pickedTime.slice(6, 8);
    data.selectedTime = new Date(data.selectedTime).setHours(
      hours,
      minutes,
      seconds
    );
  } else {
    data.selectedTime = new Date().getTime();
  }
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
