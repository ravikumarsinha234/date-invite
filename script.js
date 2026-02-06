const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const confirmBtn = document.getElementById('confirmBtn');
const backBtn = document.getElementById('backBtn');
const shareBtn = document.getElementById('shareBtn');
const confirmNoMsgBtn = document.getElementById('confirmNoMsgBtn');
const shareFinalBtn = document.getElementById('shareFinalBtn');
const question = document.getElementById('question');
const datePicker = document.getElementById('datePicker');
const messageSection = document.getElementById('messageSection');
const celebration = document.getElementById('celebration');
const dateDetails = document.getElementById('dateDetails');
const dateInput = document.getElementById('dateInput');
const customMsg = document.getElementById('customMsg');
const thankyou = document.getElementById('thankyou');

let selectedLocations = [];
let timeout;
let userDate = null;

// No button still flees (your original magic!)
function moveNoButton() {
    const rect = question.getBoundingClientRect();
    const maxX = window.innerWidth - noBtn.offsetWidth - 20;
    const maxY = window.innerHeight - noBtn.offsetHeight - 20;
    noBtn.style.position = 'fixed';
    noBtn.style.left = Math.random() * maxX + 'px';
    noBtn.style.top = Math.random() * maxY + 'px';
    noBtn.style.zIndex = '1000';
    noBtn.style.transition = 'none';
}

noBtn.addEventListener('mouseenter', moveNoButton);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveNoButton();
}, { passive: false });
noBtn.addEventListener('contextmenu', (e) => e.preventDefault());

// Yes button flow
yesBtn.addEventListener('click', goToDatePicker);
yesBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    goToDatePicker();
});

function goToDatePicker() {
    question.classList.add('hidden');
    datePicker.classList.remove('hidden');
    dateInput.focus();
    clearTimeout(timeout);
}

confirmBtn.addEventListener('click', goToMessageSection);
backBtn.addEventListener('click', () => {
    datePicker.classList.add('hidden');
    question.classList.remove('hidden');
});

function goToMessageSection() {
    if (!dateInput.value) {
        alert('Please pick a date first! 📅');
        return;
    }
    userDate = dateInput.value;
    selectedLocations = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);
    
    datePicker.classList.add('hidden');
    messageSection.classList.remove('hidden');
    customMsg.focus();
}

shareBtn.addEventListener('click', showCelebration);
confirmNoMsgBtn.addEventListener('click', showCelebration);
shareFinalBtn.addEventListener('click', shareMoment);

function showCelebration() {
    const message = customMsg.value || 'Can\'t wait for our date!';
    
    messageSection.classList.add('hidden');
    celebration.classList.remove('hidden');
    
    // Show date details
    if (userDate) {
        const date = new Date(userDate);
        dateDetails.innerHTML = `
            <p>📅 ${date.toLocaleDateString()} at ${date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
            ${selectedLocations.length ? `<p>🎯 ${selectedLocations.join(', ')}</p>` : ''}
            <p>💭 "${message}"</p>
        `;
        dateDetails.classList.remove('hidden');
    }
    
    // Confetti explosion!
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
    
    thankyou.textContent = 'It\'s a DATE! 💕';
}

// Share functionality
function shareMoment() {
    const dateText = userDate ? new Date(userDate).toLocaleDateString() : 'soon';
    const locationsText = selectedLocations.join(', ') || 'somewhere special';
    const messageText = customMsg.value || 'said YES to the best date ever!';
    
    const shareText = `I said YES! 🎉 Date on ${dateText} at ${locationsText}. ${messageText} 💕`;
    
    if (navigator.share) {
        navigator.share({
            title: 'I said YES to a date!',
            text: shareText,
            url: window.location.href
        });
    } else {
        navigator.clipboard.writeText(shareText).then(() => {
            alert('Copied to clipboard! Share away! 📋✨');
        });
    }
}

// Auto-yes after 8 seconds
timeout = setTimeout(() => {
    if (question.classList.contains('question-section') && !question.classList.contains('hidden')) {
        goToDatePicker();
    }
}, 8000);

// Set minimum date to tomorrow
dateInput.min = new Date(Date.now() + 24*60*60*1000).toISOString().slice(0,16);
