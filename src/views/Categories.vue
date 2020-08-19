<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <loader v-if="loading" />
      <div class="row" v-else>
        <CategoryCreate @created="addNewCategory" />
        <p class="center" v-if="!categories.length">Не создано ни одной категории</p>
        <CategoryEdit
          v-else
          :categories="categories"
          @updated="updateCategories"
          :key="categories.length + updateCount"
        />
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from "@/components/CategoryCreate";
import CategoryEdit from "@/components/CategoryEdit";

export default {
  name: "categories",
  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0,
  }),
  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories"); // возвращаем отформатированный массив из category.js
    this.loading = false;
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category);
    },
    updateCategories(category) {
      // изменяем категорию в массиве на фронте
      const idx = this.categories.findIndex((c) => c.id === category.id); // находим категориюя по индексу
      this.categories[idx].title = category.title; // меняем title
      this.categories[idx].limit = category.limit; // меняем limit
      this.updateCount++; // для перерислвывания компонента при изменении массива (:key)
    },
  },
  components: {
    CategoryCreate,
    CategoryEdit,
  },
};
</script>