import { Plugin } from '@nuxt/types'
import { initialize } from '~/utils/auth.js'

const accessor: Plugin = ({ $auth }) => {
  initialize($auth)
}

export default accessor