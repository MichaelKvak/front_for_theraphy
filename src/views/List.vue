<template>
  <div>
    <div v-if="isLoading">Loading...</div>
    <div v-if="hasError">Error</div>
    <div v-if="!isLoading && !hasError">
      <div>
        <label>
          Title
          <input type="text" v-model.lazy="searchTitleValue" />
        </label>
      </div>
      <div v-for="pill in getPillsList" :key="pill._id">
        <span>{{ pill.title }}</span>
        <span>{{ pill.description }}</span>
        <span>{{ pill.tags }}</span>
        <span>{{ pill.date }}</span>

        <button @click="onDelete(pill._id)">X</button>
        <button @click="onEdit(pill._id)">Edit</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "List",

  data() {
    return {
      searchTitleValue: null,
    };
  },

  computed: {
    ...mapGetters("pills", ["getPillsList", "isLoading", "hasError"]),
  },

  watch: {
    searchTitleValue(newValue) {
      if (newValue)
        this.loadPills({
          filter_property: "title",
          filter_value: newValue,
        });
      else this.loadPills();
    },
  },

  methods: {
    ...mapActions("pills", ["loadPills", "deletePills"]),
    onDelete(id) {
      this.deletePills(id);
    },
    onEdit(id) {
      this.$router.push({ name: "create", params: { id } });
    },
  },

  mounted() {
    this.loadPills();
  },
};
</script>

<style lang="scss" scoped></style>
