<template>
  <div>
    <v-toolbar
      color="primary"
      dark
      flat
    >
      <v-toolbar-title>{{ msg }}</v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <v-form @submit.prevent="onSubmit" v-model="validForm">
      <v-card-text>
        <v-text-field
          label="Tell me what are you feeling wrong today."
          single-line
          name="Search"
          prepend-icon="local_hospital"
          type="text"
          v-model="userInput.searchInput"
          :rules="[v => !!v || 'Input is required']"
        />        
        <v-row>
          <v-col class="d-flex" cols="12" sm="6">
            <v-select
              :items="genderList"
              v-model="userInput.gender"
              label="Your gender"
              :rules="[v => !!v || 'Input is required']"
            ></v-select>
          </v-col>
          <v-col class="d-flex" cols="12" sm="6">
            <v-text-field
              v-model="userInput.age"
              label="Your Age"
              max="100"
              min="1"
              step="1"
              type="number"
            ></v-text-field>
          </v-col>
        </v-row>
        <h4>You can also choose from the list below:</h4>
        <v-btn
          class="btn-symptoms"
          v-for="(symptom, i) in exampleSymptons"
          :key="i" @click="onClickAddSymptons(symptom)"
        >
          {{ symptom }}
        </v-btn>
        <v-spacer />
        <v-btn type="submit" :disabled="!validForm" color="primary">Next</v-btn>
      </v-card-text>
    </v-form>
  </div>
</template>

<script lang="ts">

import { Vue, Component, Prop } from 'vue-property-decorator';
import { getSearchResults } from '../api';


@Component
export default class Search extends Vue {
  @Prop() msg !: string;
  @Prop() userInput !: any;
  @Prop() suggestions !: any[];
  @Prop() loadingSuggestions !: boolean;

  genderList = ['Male', 'Female']
  validForm = true;

  exampleSymptons: string[] = [
    'Fever', 'Cough', 'Hard to breath', 'Chest pain', 'Headache', 'Dry nose', 'Itchy skin', 'Nervousness', 'Feeling tired',
    'Sensetive to cold temperature', 'Hard to sleep', 'Blur Vision', 'Hearing voices arguing',
  ];

  onClickAddSymptons(symptom: string) {
    this.userInput.searchInput = `${this.userInput.searchInput} ${symptom}`;
  }

  async onSubmit() {
    this.$emit('update:loadingSuggestions', true)
    const res = await getSearchResults({
      text: this.userInput.searchInput
    })
    this.$emit('update:suggestions', res.mentions)
    this.$emit('update:loadingSuggestions', false)
  }
}

</script>

<style scoped lang="scss">

.btn-symptoms{
  margin: 5px
}

</style>
