import { createElement } from '../utils/dom.js'
import gsap from 'gsap'

export default function Tests() {
  const section = createElement('div', { id: 'tests-section', class: 'hidden space-y-4' })

  const title = createElement('h2', { class: 'text-gold text-2xl' }, 'Prova de Conhecimento')
  const input = createElement('input', { id: 'userInput', placeholder: 'Sua resposta...', class: 'w-full p-2 rounded bg-black/60 border border-gold text-parchment' })
  const btn = createElement('button', { class: 'px-4 py-2 bg-blood text-white rounded' }, 'Enviar')

  btn.addEventListener('click', () => checkInput())

  section.appendChild(title)
  section.appendChild(input)
  section.appendChild(btn)

  // password section
  const pwSection = createElement('div', { id: 'password-section', class: 'hidden space-y-3' })
  pwSection.innerHTML = `
    <h3 class="text-gold text-xl">Portões de Castlevania</h3>
    <img id="castle-image" src="/imagens/portoes_fechados.jpg" class="w-full rounded border-2 border-blood" draggable="false" />
    <input id="passwordInput" type="password" placeholder="Senha Secreta" class="w-full p-2 rounded bg-black/60 border border-gold text-parchment" />
    <button id="pw-btn" class="px-4 py-2 bg-blood text-white rounded">Entrar</button>
  `

  section.appendChild(pwSection)

  document.addEventListener('click', (e) => {
    if (e.target && e.target.id === 'pw-btn') checkPassword()
  })

  function checkInput() {
    const userInput = document.getElementById('userInput').value.toLowerCase().trim()
    const correctAnswer = import.meta.env.VITE_TEST_ANSWER?.toLowerCase() || 'richter wins'
    if (userInput === correctAnswer) {
      // esconder elementos da prova e abrir fase dos portões
      title.classList.add('hidden')
      input.classList.add('hidden')
      btn.classList.add('hidden')
      section.querySelector('#password-section').classList.remove('hidden')
    } else {
      alert('A resposta não contém as palavras sagradas!')
    }
  }

  function checkPassword() {
    const password = document.getElementById('passwordInput').value.trim().toLowerCase()
    const correctPassword = import.meta.env.VITE_PASSWORD?.toLowerCase() || 'alucard'
    const castle = document.getElementById('castle-image')
    if (password === correctPassword) {
      // crossfade para portões abertos
      gsap.to(castle, { opacity: 0.2, duration: 0.4, onComplete: () => {
        castle.src = '/imagens/portoes_abertos.jpg'
        gsap.to(castle, { opacity: 1, duration: 0.6 })
      }})
      // após 2.5 segundos, abrir o tomo de contatos
      setTimeout(() => {
        // fechar fase dos portões e da prova, abrir o tomo de contatos
        document.getElementById('password-section').classList.add('hidden')
        document.getElementById('tests-section').classList.add('hidden')
        const comic = document.querySelector('.comic')
        if (comic) comic.classList.add('hidden')
        const contacts = document.getElementById('contacts-section')
        contacts.classList.remove('hidden')
        contacts.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 2500)
    } else {
      alert('Senha incorreta!')
    }
  }

  return section
}
