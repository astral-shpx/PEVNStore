import { reactive } from "vue";

export const store = reactive({
  searchQuery: "",
  typingSearchQuery: "",
  showAutocomplete: false,
  filters: { fromDate: "", toDate: "" },
});
