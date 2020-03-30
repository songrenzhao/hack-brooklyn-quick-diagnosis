<template>
  <div>
    <Search
      msg="Welcome to diagnosis website!"
      :userInput.sync="userInput"
      :suggestions.sync="suggestions"
      :loadingSuggestions.sync="loadingSuggestions"
    />
    <h3 class="loading center" v-if="loadingSuggestions"> Loading ... </h3>
    <Suggestion 
      v-if="suggestions.length > 0"
      :userInput="userInput"
      :suggestions.sync="suggestions"
      :diagnosis.sync="diagnosis" 
      :loadingSuggestions="loadingSuggestions"
    />
    <Diagnosis 
      v-if="Object.keys(diagnosis).length > 0"
      :userInput="userInput"
      :diagnosis.sync="diagnosis"
      :suggestions.sync="suggestions"
      :loadingSuggestions="loadingSuggestions"
    />
  </div>
</template>

<script lang="ts">

import Search from '@/components/Search.vue';
import Suggestion from '@/components/Suggestion.vue';
import Diagnosis from '@/components/Diagnosis.vue';

import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: {
    Search,
    Suggestion,
    Diagnosis
  },
})
export default class Home extends Vue {

  userInput = {
    searchInput: '',
    gender: ['Male', 'Female'],
    age: 25,  
  }

  loadingSuggestions = false
  suggestions = []
  diagnosis = {}

}

</script>
