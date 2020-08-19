<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option v-for="cat in this.categories" :key="cat.id" :value="cat.id">{{ cat.title }}</option>
          </select>
          <label>Выберите категорию</label>
        </div>

        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="title"
            :class="{ invalid: $v.title.$dirty && !$v.title.required }"
          />
          <label for="name">Название</label>
          <span
            v-if="$v.title.$dirty && !$v.title.required"
            class="helper-text invalid"
          >Введите название</span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{ invalid: $v.limit.$dirty && !$v.limit.minValue }"
          />
          <label for="limit">Лимит</label>
          <span
            class="helper-text invalid"
            v-if="$v.limit.$dirty && !$v.limit.minValue"
          >Минимальнаz сумма {{ $v.limit.$params.minValue.min }}</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from "vuelidate/lib/validators";
export default {
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    select: null,
    title: "",
    limit: 100,
    current: null,
  }),
  validations: {
    title: { required },
    limit: { minValue: minValue(100) },
  },
  watch: {
    current(catId) {
      const { title, limit } = this.categories.find((c) => c.id === catId); // следим за модель в селекте и находим по id необходимую категорию
      this.title = title; // добавляем в инпут тайтл выбранной категории
      this.limit = limit; // добавляем в инпут лимит выбранной категории
    },
  },
  created() {
    const { id, title, limit } = this.categories[0];
    this.title = title;
    this.current = id;
    this.limit = limit;
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      const updateData = {
        id: this.current,
        title: this.title,
        limit: this.limit,
      };

      try {
        await this.$store.dispatch("updateCategories", updateData);
        this.$message("Категория успешно обновлена");
        this.$emit("updated", updateData); // передаем данные с измененной катгорией в родителя для изменения в массиве на фронте
      } catch (e) {}
    },
  },
  mounted() {
    M.FormSelect.init(this.$refs.select);
    M.updateTextFields();
  },
  beforeDestroy() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
};
</script>