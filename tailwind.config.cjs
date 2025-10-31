module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        blood: '#8b0000',
        parchment: '#f5e7c1',
        darkness: '#0a0a0a',
        gold: '#d4af37'
      },
      fontFamily: {
        medieval: ['MedievalSharp','cursive']
      }
    }
  },
  plugins: []
}
