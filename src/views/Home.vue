<template>
  <div>
    <span class="text-5xl font-bold">
      <p>
        It is
        <abbr
          title="Click to copy to clipboard"
          @click="copyToClipboard('#user-time')"
          class="cursor-pointer"
          id="user-time"
          >{{ data.userTime }}</abbr
        >
        {{ data.userTimeEmoji }}
      </p>
      <p>
        You are in
        <abbr
          title="Click to copy to clipboard"
          @click="copyToClipboard('#user-timezone')"
          class="cursor-pointer"
          id="user-timezone"
          >{{ data.userTZ }}</abbr
        >
        timezone
      </p>
    </span>
    <div v-if="data.alertVisible">
      <Alert :title="data.alertTitle" />
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import Alert from "../components/Alert.vue";

const datetime = getDateTime();
const data = reactive({
  alertVisible: false,
  alertTitle: null,
  userTime: datetime[0],
  userTimeEmoji: datetime[1] ? "☀️" : "🌑",
  userTZ: Intl.DateTimeFormat().resolvedOptions().timeZone,
});

function _valueWithPad(value) {
  return `${value}`.padStart(2, "0");
}
function getDateTime() {
  // Thanks Thunder
  const now = new Date(),
    hNum = now.getHours(),
    h = _valueWithPad(hNum);
  return [
    `${h}:${_valueWithPad(now.getMinutes())}:${_valueWithPad(
      now.getSeconds()
    )} (${_valueWithPad(now.getFullYear())}/${_valueWithPad(
      now.getMonth() + 1
    )}/${_valueWithPad(now.getDate())})`,
    hNum > 7 && hNum < 20,
  ];
}

function copyToClipboard(element) {
  data.alertVisible = true;
  data.alertTitle = "Copied to clipboard! 🎉";
  const query = document.querySelector(element);
  navigator.clipboard.writeText(query.textContent);
  setTimeout(() => {
    data.alertVisible = false;
  }, 3000);
}

function updateTime() {
  const datetime = getDateTime();
  data.userTime = datetime[0];
  data.userTimeEmoji = datetime[1] ? "☀️" : "🌑";
  data.userTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;
}

data.alertVisible = true;
data.alertTitle = "Click on underlined text to copy it to your clipboard! 👀";
setTimeout(() => {
  data.alertVisible = false;
}, 3000);

setInterval(function () {
  updateTime();
}, 1000);
</script>
