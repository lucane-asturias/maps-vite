<template>
  <div class="searchbar-container">
    <input 
      class="form-control"
      type="text"
      placeholder="Buscar lugares..." 
      v-model="searchTerm"
    />

    <SearchResults />  

  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import SearchResults from '@/components/SearchResults.vue'
  import { usePlaces } from '@/composables'

  const debounceTimeout = ref()
  const debounce = ref('')

  const { searchPlacesByTerm } = usePlaces()
  
  const searchTerm = computed({
    get() {
      return debounce.value
    },
    set(searchTermValue: string) {

      if (debounceTimeout.value) clearTimeout(debounceTimeout.value)

      debounceTimeout.value = setTimeout(() => {
        debounce.value = searchTermValue
        searchPlacesByTerm(searchTermValue)
      }, 1000)
    }
  })
</script>

<style lang="css" scoped>
.searchbar-container {
  position: fixed;
  top: 30px;
  left: 30px;
  background-color: white;
  z-index: 999;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, .2);
  width: 250px;
  border-radius: 5px !important;
  overflow: hidden;
  padding: 5px;
}
</style>
