<i18n>
{
  "en": {
    "use_train": "View trains",
    "use_bus": "View busses",
    "use_metro": "View metro"
  },
  "da": {
    "use_train": "Se toge",
    "use_bus": "Se busser",
    "use_metro": "Se metro"
  }
}
</i18n>

<template>
  <div class="switches">
    <b-field>
      <span v-text="$t('use_train')"></span>
      <b-switch v-model="useTog" size="is-small" @input="switches"></b-switch>
    </b-field>
    <b-field>
      <span v-text="$t('use_bus')"></span>
      <b-switch v-model="useBus" size="is-small" @input="switches"></b-switch>
    </b-field>
    <b-field>
      <span v-text="$t('use_metro')"></span>
      <b-switch v-model="useMetro" size="is-small" @input="switches"></b-switch>
    </b-field>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import Board from '~/components/Board.vue'
import { switches } from '~/types'

@Component({
  components: {
    Board,
  },
})
export default class BoardSwitches extends Vue {
  useTog = true
  useBus = true
  useMetro = true

  switches() {
    const emits: switches = {
      useTog: this.useTog,
      useBus: this.useBus,
      useMetro: this.useMetro,
    }
    this.$emit('update', emits)
  }
}
</script>

<style scoped lang="scss">
.switches {
  display: flex;
  text-align: right;
  justify-content: flex-end;
}
</style>
