<template>
  <div class="grey darken-1 empty-layout">
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import messages from "@/utils/messages";

export default {
  computed: {
    error() {
      return this.$store.getters.error;
    },
  },
  watch: {
    error(fbError) {
      this.$error(messages[fbError.code] || "Что-то пошло не так");
      console.log(fbError);
    },
  },
};
</script>