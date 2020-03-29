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

    <router-view id="main"/>

    <v-card-text>
      <v-form>
        <v-text-field
          label="Tell me what are you feeling wrong today."
          name="search"
          prepend-icon="local_hospital"
          type="text"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn color="primary">Login</v-btn>
    </v-card-actions>
  </div>
</template>

<script lang="ts">

import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class Search extends Vue {
  @Prop() msg !: string;
}

</script>

<style scoped lang="scss">

</style>
