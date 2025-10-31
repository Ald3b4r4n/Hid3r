import { createElement } from '../utils/dom.js'
import Comic from './Comic.js'
import Tests from './Tests.js'
import Contacts from './Contacts.js'

export default function App() {
  const container = createElement('div', { class: 'space-y-6' })

  container.appendChild(Comic())
  container.appendChild(Tests())
  container.appendChild(Contacts())

  return container
}
