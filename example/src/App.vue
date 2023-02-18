<script setup lang="ts">
import { computed, getCurrentInstance, ref } from "vue";
import { RouterLink, RouterView, useRouter } from "vue-router";
const router = useRouter();
const instance = getCurrentInstance();
console.log(instance, instance?.proxy?.$history);

function replace(path: string) {
  router.replace(path);
}
function winHandler(method: any, step?: any) {
  (window.history as any)[method](step);
}
const historyLength = computed(() => {
  return instance?.proxy?.$history.stack.length;
});

const historyCurrent = computed(() => {
  return instance?.proxy?.$history.current;
});
console.log(router);
</script>

<template>
  <h1>mode: path</h1>
  <div>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
  </div>
  <h1>mode: object name</h1>
  <div>
    <RouterLink :to="{ name: 'home', replace: true }">Home</RouterLink>
    <RouterLink :to="{ name: 'about', replace: true }">About</RouterLink>
  </div>
  <h1>router methods</h1>
  <div>
    <button @click="replace('/')">replace home</button>
    <button @click="replace('about')">replace about</button>

    <button @click="router.go(1)">go 1</button>
    <button @click="router.go(-1)">go -1</button>
  </div>
  <h1>window.history methods</h1>
  <div>
    <button @click="winHandler('back')">back</button>
    <button @click="winHandler('forward')">forward</button>
    <button @click="winHandler('go', 1)">go 1</button>
    <button @click="winHandler('go', -1)">go -1</button>
  </div>
  <div>history length : {{ historyLength }} {{ $history.stack.length }}</div>
  <div>history current : {{ historyCurrent }} {{ $history.current }}</div>
  <main
    style="
      background: skyblue;
      width: 100vw;
      height: 40vh;
      text-align: center;
      line-height: 40vh;
      margin-top: 20px;
    "
  >
    <RouterView />
  </main>
</template>
