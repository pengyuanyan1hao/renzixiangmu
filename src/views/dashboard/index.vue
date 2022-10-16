<template>
  <div class="dashboard-container">
    <Uploadimg @on-success="dianji" />

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    dianji(val) {
      console.log('123', val)
    }
  }
}

</script>

<style lang="scss">

</style>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

</style>
