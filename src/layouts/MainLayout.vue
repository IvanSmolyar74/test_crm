<template>
  <div>
    <loader v-if="loading" />
    <div class="app-main-layout" v-else>
      <Navbar @click="isOpen = !isOpen" />
      <Sidebar v-model="isOpen" />
      <main class="app-content" :class="{full: !isOpen}">
        <div class="app-page">
          <keep-alive>
            <router-view />
          </keep-alive>
        </div>
      </main>
      <div class="fixed-action-btn">
        <router-link class="btn-floating btn-large blue" to="/record">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/app/Navbar";
import Sidebar from "@/components/app/Sidebar";
export default {
  name: "main-layout",
  data: () => ({
    isOpen: true, // создаем флаг для изменения состояния Sidebar
    loading: true,
  }),
  async mounted() {
    // проверяем наличие state
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch("fetchInfo");
    }
    this.loading = false;
  },
  components: {
    Navbar,
    Sidebar,
  },
};
</script>