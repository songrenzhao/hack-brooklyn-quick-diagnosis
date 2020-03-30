<template>
  <div>
    <v-form @submit.prevent="onSubmit" v-model="validForm">
      <h4 class="center">List of symptoms that matches your descripiton are shown belown, toggle the ones that match you condition:</h4>
      <v-row class="switches" justify="space-around">
        <v-switch v-for="(suggestion, i) in suggestions" :key="i" v-model="selected" :label="suggestion.common_name" :value="suggestion"></v-switch>
      </v-row>
      <v-row v-if="isEmergent">
        <v-alert class="center" type="error">
          You might be in a serious condition, please find a doctor for help!!!!!!
        </v-alert>
      </v-row>
      <v-row class="switches" justify="space-around">
        <v-btn @click="updateSuggestions">Select details</v-btn>
        <v-btn @click="getDiagnosis">Go to Diagnosis</v-btn>
      </v-row>
    </v-form>
  </div>
</template>

<script lang="ts">

import { Vue, Component, Prop } from 'vue-property-decorator'
import { getMoreSuggestions, getTriage, getDiagnosis } from '../api';

@Component
export default class Suggestion extends Vue{
  @Prop() loadingSuggestions !: boolean;
  @Prop() suggestions !: any[];
  @Prop() userInput;

  selected = []
  suggestCount = 0
  isEmergent = false

  async updateSuggestions() {
    this.$emit('update:loadingSuggestions', true)
    const payload = {
      sex: this.userInput.gender.toLowerCase(),
      age: this.userInput.age,
      evidence: this.selected.map(s => ({
        "id" : s.id,
        "choice_id" : s.choice_id || 'present'
      }))
    }
    const res = await getMoreSuggestions(payload)
    const triage = await getTriage(payload)
    if(triage.triage_level === "emergency"){
      this.isEmergent = true
    } else {
      res.length > 0 && this.$emit('update:suggestions', res)
    }
    this.suggestCount ++
    this.selected = []
  }

  async getDiagnosis() {
    this.$emit('update:loadingSuggestions', true)
    const payload = {
      sex: this.userInput.gender.toLowerCase(),
      age: this.userInput.age,
      evidence: this.selected.map(s => ({
        "id" : s.id,
        "choice_id" : s.choice_id || 'present'
      }))
    }
    const res = await getDiagnosis(payload)
    this.$emit('update:diagnosis', res)
  }
}

</script>

<style lang="scss">

.center{
  text-align: center;
  margin: auto
}

.switches {
  padding: 0 30px
}

</style>