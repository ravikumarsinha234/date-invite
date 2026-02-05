const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const buttons = document.querySelector('.buttons');
const thankyou = document.getElementById('thankyou');

let timeout;

// No button flees from mouse
noBtn.addEventListener('mouseenter', () => {
    const rect = buttons.getBoundingClientRect();
    const maxX = window.innerWidth - noBtn.offsetWidth;
    const maxY = window.innerHeight - noBtn.offsetHeight;
    noBtn.style.position = 'fixed';
    noBtn.style.left = Math.random() * maxX + 'px';
    noBtn.style.top = Math.random() * maxY + 'px';
});

// Yes triggers thank you
yesBtn.addEventListener('click', showThankYou);

function showThankYou() {
    buttons.style.display = 'none';
    thankyou.classList.remove('hidden');
    clearTimeout(timeout);
}

// Auto-show after 5s
timeout = setTimeout(showThankYou, 5000);
