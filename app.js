// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyACnwWAYvHannBuvyArhD82euYxFNGBGJ4",
  authDomain: "hid3r-d8880.firebaseapp.com",
  projectId: "hid3r-d8880",
  storageBucket: "hid3r-d8880.appspot.com",
  messagingSenderId: "247272985755",
  appId: "1:247272985755:web:34670037eb56e9d0bb623e"
};

// Inicializa o Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Painéis do diálogo
let panel = 0;
const panels = [
    { img: 'imagens/richter.png', text: "Die monster, you don't belong in this world." },
    { img: 'imagens/dracula.png', text: "It was not by my hands that I am once again given flesh..." },
    { img: 'imagens/richter.png', text: "Tribute?! You steal men's souls and make them your slaves!" },
    { img: 'imagens/dracula.png', text: "Perhaps the same could be said of all religions..." },
    { img: 'imagens/richter.png', text: "Your words are as empty as your soul!" },
    { img: 'imagens/dracula_laugh.png', text: "What is a man?" }
];

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    loadContacts();
    initFlickerEffect();
});

function nextPanel() {
    panel++;
    if (panel < panels.length) {
        animatePanelChange();
    } else if (panel === panels.length) {
        showInputSection();
    }
}

function animatePanelChange() {
    const img = document.getElementById('comic-image');
    img.style.opacity = 0;
    
    setTimeout(() => {
        img.src = panels[panel].img;
        document.getElementById('speech-bubble').innerText = panels[panel].text;
        img.style.opacity = 1;
    }, 300);
}

function showInputSection() {
    document.getElementById('comic-container').style.display = 'none';
    document.getElementById('input-section').style.display = 'block';
    document.getElementById('userInput').focus();
}

function checkInput() {
    const userInput = document.getElementById('userInput').value.toLowerCase();
    const requiredWords = ['what', 'man', 'miserable', 'secrets'];
    
    if (requiredWords.every(word => userInput.includes(word))) {
        document.getElementById('input-section').style.display = 'none';
        document.getElementById('password-section').style.display = 'block';
        document.getElementById('passwordInput').focus();
    } else {
        alert('A resposta não contém as palavras sagradas! Tente novamente.');
        document.getElementById('userInput').value = '';
    }
}

function checkPassword() {
    const password = document.getElementById('passwordInput').value.trim().toLowerCase();
    
    if (password === 'alucard') {
        unlockCastle();
    } else {
        alert('Senha incorreta! A dica está na linhagem dos Belmont.');
        document.getElementById('passwordInput').value = '';
    }
}

function unlockCastle() {
    const castleImg = document.getElementById('castle-image');
    castleImg.src = 'imagens/portoes_abertos.jpg';
    
    setTimeout(() => {
        document.getElementById('password-section').style.opacity = 0;
        setTimeout(() => {
            document.getElementById('password-section').style.display = 'none';
            document.getElementById('app-section').style.display = 'block';
            loadContacts();
        }, 500);
    }, 1000);
}

// Sistema de Contatos com Firebase
let contacts = [];

async function loadContacts() {
    try {
        const snapshot = await db.collection("contacts").get();
        contacts = snapshot.docs.map(doc => doc.data());
        renderContacts();
    } catch (error) {
        console.error("Erro ao carregar contatos:", error);
        alert('Erro ao carregar contatos!');
    }
}

async function addContact() {
    const name = document.getElementById('contactName').value.trim();
    let number = document.getElementById('contactNumber').value.trim().replace(/\D/g, '');
    
    if (name && number.length >= 10) {
        const whatsappLink = `https://wa.me/55${number}`;
        
        try {
            await db.collection("contacts").add({
                name, 
                number,
                link: whatsappLink
            });
            
            loadContacts();
            clearContactFields();
        } catch (error) {
            console.error("Erro ao adicionar contato:", error);
            alert('Erro ao salvar contato!');
        }
    } else {
        alert('Preencha corretamente: Nome e Número (com DDD)');
    }
}

async function removeContact(index) {
    if (confirm('Banir este contato do castelo?')) {
        try {
            const snapshot = await db.collection("contacts").get();
            const docId = snapshot.docs[index].id;
            await db.collection("contacts").doc(docId).delete();
            loadContacts();
        } catch (error) {
            console.error("Erro ao remover contato:", error);
            alert('Erro ao remover contato!');
        }
    }
}

function renderContacts() {
    const list = document.getElementById('contactList');
    list.innerHTML = '';
    
    contacts.forEach((contact, index) => {
        const li = document.createElement('li');
        li.className = 'pixel-corners';
        li.innerHTML = `
            <span><strong>${contact.name}</strong> - ${formatPhone(contact.number)}</span>
            <div>
                <a href="${contact.link}" target="_blank" class="whatsapp-btn">WhatsApp</a>
                <button onclick="removeContact(${index})" class="remove-btn">X</button>
            </div>
        `;
        list.appendChild(li);
    });
}

function clearContactFields() {
    document.getElementById('contactName').value = '';
    document.getElementById('contactNumber').value = '';
}

function formatPhone(number) {
    return number.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
}

// Efeitos Visuais
function initFlickerEffect() {
    setInterval(() => {
        if (Math.random() > 0.7) {
            document.body.style.filter = `brightness(${0.8 + Math.random() * 0.4})`;
        }
    }, 3000);
}