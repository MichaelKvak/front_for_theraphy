<template>
  <div>
    <div v-if="isLoading">Loading...</div>
    <div v-if="hasError">{{ errMsg }}</div>
    <div>
      <label>
        Title
        <input type="text" v-model="pillTitle" />
      </label>
      <br />
      <label>
        Description
        <input type="text" v-model="pillDescription" />
      </label>
      <br />
      <label>
        Tags
        <b-field label="Add some tags">
          <b-taginput
            v-model="pillTags"
            ellipsis
            icon="label"
            placeholder="Add a tag"
            aria-close-label="Delete this tag"
          >
          </b-taginput>
        </b-field>
        <p class="content"><b>Tags:</b> {{ pillTags }}</p>
      </label>
      <br />
      <label>
        Dates
        <b-field label="Select a date">
          <b-datepicker
            placeholder="Click to select..."
            v-model="pillDate"
            range
          >
          </b-datepicker>
        </b-field>
      </label>
      <div>
        <button @click="onSave" :disabled="!isDataValid">
          {{ saveBtnTitle }}
        </button>
      </div>
      <div v-if="errorMessage">{{ errorMessage }}</div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Create",

  data() {
    return {
      pillDate: [],
      pillTitle: null,
      pillDescription: null,
      pillTags: null,
    };
  },

  computed: {
    ...mapGetters("pills", ["isLoading", "hasError"]),
    isDataValid() {
      return (
        this.pillTitle && this.pillDescription && this.pillDate && this.pillTags
      );
    },
    isEditing() {
      return !!this.$route.params.id;
    },
    saveBtnTitle() {
      return this.isEditing ? "Save" : "Create";
    },
    errMsg() {
      if (Array.isArray(this.hasError))
        return this.hasError.map((item) => item.msg).join(", ");
      else return "Error";
    },
  },

  methods: {
    ...mapActions("pills", ["createPill", "getPillById", "updatePill"]),
    async onSave() {
      this.errorMessage = "";
      try {
        if (this.isEditing) {
          await this.updatePill({
            pillTitle: this.pillTitle,
            pillDescription: this.pillDescription,
            pillTags: this.pillTags,
            pillDate: this.pillDate,
          });
        } else {
          await this.createPill({
            pillTitle: this.pillTitle,
            pillDescription: this.pillDescription,
            pillTags: this.pillTags,
            pillDate: this.pillDate,
          });
        }
        this.$router.push({ name: "list" });
      } catch {
        this.errorMessage = "Saving error";
      }
    },
  },

  async mounted() {
    if (this.isEditing) {
      try {
        const editedObj = await this.getPillById(this.$route.params.id);
        this.pillTitle = editedObj.title;
        this.pillDescription = editedObj.description;
        this.pillTags = editedObj.tags;
        this.pillDate = editedObj.date;
      } catch {
        this.errorMessage = "Fetching edited object error";
      }
    }
  },
};
</script>

<style lang="scss" scoped></style>
