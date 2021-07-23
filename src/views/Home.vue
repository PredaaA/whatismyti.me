<template>
  <div class="flex justify-center">
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
    <div id="thetoast"></div>
  </div>
</template>

<script setup>
import { reactive } from "vue";

const datetime = getDateTime();
const data = reactive({
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

function showToast(text) {
  var toast = document.getElementById("thetoast");
  toast.className = "show";
  toast.innerHTML = text;
  setTimeout(function () {
    toast.className = toast.className.replace("show", "");
  }, 3000);
}

function copyToClipboard(element) {
  const query = document.querySelector(element);
  navigator.clipboard.writeText(query.textContent);
  showToast("Copied to clipboard! 🎉");
}

function updateTime() {
  const datetime = getDateTime();
  data.userTime = datetime[0];
  data.userTimeEmoji = datetime[1] ? "☀️" : "🌑";
  data.userTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;
}

// showToast("Click on underlined text to copy it to your clipboard! 👀");

setInterval(function () {
  updateTime();
}, 1000);
</script>

<style lang="scss" scoped>
/* *yawns at being css noobie* */
/* https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_snackbar */
#thetoast {
  visibility: hidden;
  width: 300px;
  position: absolute;
  bottom: 30px;
  text-align: center;
  border-radius: 4px;
  background-color: #161616;
  color: #fff;
  font-size: 20px;
  padding: 16px;
  -webkit-box-shadow: 0px 0px 24px -1px #181818;
  -moz-box-shadow: 0px 0px 24px -1px #181818;
  box-shadow: 0px 0px 24px -1px #181818;
}

#thetoast.show {
  visibility: visible;
  -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
  animation: fadein 0.5s, fadeout 0.5s 2.5s;
}

@-webkit-keyframes fadein {
  from {
    bottom: 0;
    opacity: 0;
  }

  to {
    bottom: 30px;
    opacity: 1;
  }
}

@keyframes fadein {
  from {
    bottom: 0;
    opacity: 0;
  }

  to {
    bottom: 30px;
    opacity: 1;
  }
}

@-webkit-keyframes fadeout {
  from {
    bottom: 30px;
    opacity: 1;
  }

  to {
    bottom: 0;
    opacity: 0;
  }
}

@keyframes fadeout {
  from {
    bottom: 30px;
    opacity: 1;
  }

  to {
    bottom: 0;
    opacity: 0;
  }
}
</style>
