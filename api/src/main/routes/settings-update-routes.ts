import { Router } from 'express'
import { Settingscontroller } from '../../presentation/controllers/SettingsController'

const settingscontroller = new Settingscontroller()
export default (router: Router) => {
  router.put('/settings/:username', settingscontroller.update)
}
