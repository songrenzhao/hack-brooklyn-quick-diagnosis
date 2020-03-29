<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <v-app id="">
      <v-content>
        <v-container
          class="fill-height"
          id="main-container"
          fluid
        >
          <v-row
            align="center"
            justify="center"
          >
            <v-col>
              <v-card class="elevation-12">
                <router-view id=""/>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>

</script>

<style lang="scss">
  #main-container {
    max-width: 960px;
    margin: auto;
  }
</style>
