import { Plugin } from '@nuxt/types'
import { initialize } from '~/utils/pendlertider'

const accessor: Plugin = ({ $pendlertiderApi }) => {
  initialize($pendlertiderApi)
}

export default accessor
