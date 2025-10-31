import { createElement } from '../utils/dom.js'
import { initFirebase, getContacts, addContactToDb, removeContactFromDb } from '../services/firebase.js'

export default function Contacts() {
  const section = createElement('div', { id: 'contacts-section', class: 'hidden space-y-4' })
  section.innerHTML = `
    <h2 class="text-2xl text-gold">Hid3r - Tome dos Contatos</h2>
    <div class="space-y-2">
      <input id="contactName" placeholder="Nome" class="w-full p-2 rounded bg-black/60 border border-gold text-parchment" />
      <input id="contactNumber" placeholder="Número com DDD" class="w-full p-2 rounded bg-black/60 border border-gold text-parchment" />
      <button id="add-contact" class="px-4 py-2 bg-blood text-white rounded">Invocar Contato</button>
    </div>
    <ul id="contactList" class="space-y-2"></ul>
  `

  section.querySelector('#add-contact').addEventListener('click', async () => {
    const name = document.getElementById('contactName').value.trim()
    const number = document.getElementById('contactNumber').value.replace(/\D/g, '')
    if (!name || number.length < 10) return alert('Preencha corretamente: Nome e Número (com DDD)')
    try {
      await addContactToDb({ name, number })
      load()
    } catch (e) {
      console.warn('Could not add contact (DB might be unavailable):', e)
      alert('Não foi possível salvar no banco. Verifique a configuração do Firebase.')
    }
  })

  section.addEventListener('click', async (e) => {
    if (e.target && e.target.dataset && e.target.dataset.remove) {
      const idx = Number(e.target.dataset.remove)
      try {
        await removeContactFromDb(idx)
        load()
      } catch (e) {
        console.warn('Could not remove contact:', e)
        alert('Não foi possível remover o contato.')
      }
    }
  })

  // backup removido do frontend; arquivo está somente na raiz (gitignored)

  async function load() {
    try {
      const contacts = await getContacts()
      const list = section.querySelector('#contactList')
      list.innerHTML = ''
      contacts.forEach((c, i) => {
        const li = createElement('li', { class: 'flex justify-between items-center p-2 bg-black/40 rounded' })
        li.innerHTML = `<span><strong>${c.name}</strong> - ${formatPhone(c.number)}</span><div><a class="mr-2 px-2 py-1 bg-green-600 text-white rounded" href="https://wa.me/55${c.number}" target="_blank">WhatsApp</a><button data-remove="${i}" class="px-2 py-1 bg-red-600 text-white rounded">X</button></div>`
        list.appendChild(li)
      })
    } catch (e) {
      console.warn('Could not load contacts (DB might be unavailable):', e)
      // leave list empty
    }
  }

  function formatPhone(number) { return number.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3') }

  // init firebase (reads env variables or local backup) and then load
  (async () => {
    await initFirebase()
    await load()
  })()

  return section
}
