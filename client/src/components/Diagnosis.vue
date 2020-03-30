<template>
  <div>
    <v-form @submit.prevent="onSubmit" v-model="validForm">
      <h3 class="center">Your results are shown below, if you want more accurate result, answer the following question.</h3>
      <v-row justify="space-around">
        <v-col v-for="(condition, i) in diagnosis.conditions" :key="i" col="12" md="8">
          <v-alert class="center" dense type="warning" size="small">
            You may have {{ condition.name }}, the probability is {{ getProbabilityString(condition.probability)}}%
          </v-alert>
        </v-col>
      </v-row>
      <v-row>
        <h4 class="center">{{ diagnosis.question.text }}</h4>
      </v-row>
      <v-radio-group class="radio-group" v-for="(item, i) in diagnosis.question.items" :label="item.commonName || item.name" :key="i" v-model="choices[i]" row>
        <v-radio v-for="(choice, j) in item.choices" :key="j" :label="choice.label" :value="choice.id"></v-radio>
      </v-radio-group>
      <v-row justify="space-around">
        <v-btn class="center" @click="getDiagnosis()">Answer question</v-btn>
      </v-row>
    </v-form>
  </div>
</template>

<script lang="ts">

import { Vue, Component, Prop } from 'vue-property-decorator'
import { getMoreSuggestions, getTriage, getDiagnosis } from '../api';

@Component
export default class Diagnosis extends Vue{
  @Prop() diagnosis !: any;
  @Prop() userInput !: any;
  @Prop() suggestions !: any[];

  suggestCount = 0
  isEmergent = false
  choices = []

  getProbabilityString(prob: number): string {
    return (prob*100).toFixed(2);
  }

  async getDiagnosis(){
    this.$emit('update:loadingSuggestions', true)
        console.log(this.suggestions)

    const payload = {
      sex: this.userInput.gender.toLowerCase(),
      age: this.userInput.age,
      evidence: [
        ...this.suggestions.map(s => ({
          "id" : s.id,
          "choice_id" : s.choice_id || 'present'
        })),
        ...this.diagnosis.question.items.map((s, i) => ({
          "id" : s.id,
          "choice_id" : this.choices[i] || 'absent'
        }))
      ]
    }
    const res = await getDiagnosis(payload)
    this.$emit('update:loadingSuggestions', false)
    this.$emit('update:suggestions', [
      ...this.suggestions,
      ...this.diagnosis.question.items.map((s, i) => ({
        ...s,
        "choice_id" : this.choices[i] || 'absent'
      }))
    ])
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

.radio-group {
  display: inline-block
}

</style>