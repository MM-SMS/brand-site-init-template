import { createSubscribeFormConfig } from 'subscribe-form-config/server'
import { BRAND } from '@/lib/constants'

export const {
  getSubscribeFormConfig,
  getSubscribeFormConfigFresh,
  getSubscribeFormConfigResultFresh,
  getDefaultSubscribeFormConfig,
  formConfigGetHandler,
} = createSubscribeFormConfig({
  getBrand: () => ({
    name: BRAND.name,
    domain: BRAND.domain,
    legalEntity: BRAND.legalEntity,
  }),
})
