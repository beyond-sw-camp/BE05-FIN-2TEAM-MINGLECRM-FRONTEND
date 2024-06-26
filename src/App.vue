<template>
  <router-view />
</template>

<script setup>
import { useTokenStore } from "src/stores/token-store";
defineOptions({
  name: "App",
});
onMounted(() => {
  const store = useTokenStore();
  store.loadToken();
});
</script>
