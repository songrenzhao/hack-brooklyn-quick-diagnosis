<template>
  <Search msg="Welcome to diagnosis website!"/>
</template>

<script lang="ts">

import Search from '@/components/Search.vue';
import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: {
    Search,
  },
})
export default class Home extends Vue {

}

</script>
