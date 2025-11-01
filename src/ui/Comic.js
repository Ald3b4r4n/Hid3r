import { createElement } from '../utils/dom.js'
import gsap from 'gsap'

const panels = [
  { img: 'imagens/richterdiemonster.png', text: "Richter Belmont:  Die, monster! You don't belong in this world!" },
  { img: 'imagens/dracula.png', text: "Dracula:  It was not by my hand that I'm once again given flesh. I was called here by humans who wish to pay me tribute." },
  { img: 'imagens/richtetribute.png', text: "Richter:  \"Tribute\"?! You steal men's souls and make them your slaves!" },
  { img: 'imagens/draculacontemplativo.png', text: 'Dracula:  Perhaps the same could be said of all religions.' },
  { img: 'imagens/richtercontemplativo.png', text: 'Richter:  Your words are as empty as your soul! Mankind ill needs a savior such as you! [Dracula drinks wine]' },
  { img: 'imagens/dracula_laugh.png', text: 'Dracula:  What is a man? [flings his wine glass aside] A miserable little pile of secrets! But enough talk; Have at you!' }
]

export default function Comic() {
  let idx = 0
  const wrapper = createElement('div', { class: 'comic bg-black/70 rounded p-4' })
  const img = createElement('img', { class: 'w-full rounded border-4 border-blood', draggable: 'false', src: 'imagens/dracula.png' })
  const bubble = createElement('div', { class: 'mt-3 bg-parchment text-black p-3 rounded' }, panels[0].text)

  wrapper.addEventListener('click', () => next())

  // helper: pre-carregar imagem e aplicar fallback se falhar
  const loadImage = (src) => new Promise((resolve) => {
    const test = new Image()
    test.onload = () => resolve(src)
    test.onerror = () => {
      console.warn('Falha ao carregar imagem:', src)
      resolve('imagens/dracula.png')
    }
    test.src = src
  })

  // carregar o primeiro painel de forma resiliente
  loadImage(panels[0].img).then((resolvedSrc) => {
    img.src = resolvedSrc
  })

  function next() {
    idx++
    if (idx < panels.length) {
      gsap.to(img, { opacity: 0, duration: 0.25, onComplete: () => {
        loadImage(panels[idx].img).then((resolvedSrc) => {
          img.src = resolvedSrc
          bubble.innerText = panels[idx].text
          gsap.to(img, { opacity: 1, duration: 0.25 })
        })
      }})
    } else {
      // reveal next sections
      document.querySelector('#tests-section').classList.remove('hidden')
      gsap.from('#tests-section', { y: 20, opacity: 0, duration: 0.5 })
      // hide comic once the test appears
      wrapper.classList.add('hidden')
    }
  }

  wrapper.appendChild(img)
  wrapper.appendChild(bubble)
  return wrapper
}
