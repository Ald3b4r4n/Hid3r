import './styles.css'
import App from './ui/App.js'

const root = document.getElementById('app')
root.appendChild(App())

// Dev safety: unregister any old service workers that may hijack localhost
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations()
    .then(regs => regs.forEach(r => r.unregister()))
    .catch(() => {})
  // optional: clear old caches from previous static build
  if (window.caches && location.hostname === 'localhost') {
    caches.keys().then(keys => keys.forEach(k => caches.delete(k))).catch(() => {})
  }
}

// Bloquear arraste em qualquer imagem
document.addEventListener('dragstart', (e) => {
  if (e.target && e.target.tagName === 'IMG') e.preventDefault()
})
