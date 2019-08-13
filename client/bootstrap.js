import { store } from '@things-factory/shell'
import attachmentBase from './reducers/main'

export default function bootstrap() {
  store.addReducers({
    attachmentBase
  })
}
