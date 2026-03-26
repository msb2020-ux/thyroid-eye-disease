// POPUP
function openPopup() {
  document.getElementById('salePopup').classList.add('active');
  generateCaptcha();
}
function closePopup() {
  document.getElementById('salePopup').classList.remove('active');
  document.getElementById('formSuccess').style.display = 'none';
  document.getElementById('formError').style.display = 'none';
  document.getElementById('saleForm').reset();
}
document.getElementById('salePopup').addEventListener('click', function(e) {
  if (e.target === this) closePopup();
});

// CAPTCHA
let captchaAnswer = 0;
function generateCaptcha() {
  const a = Math.floor(Math.random() * 10) + 1;
  const b = Math.floor(Math.random() * 10) + 1;
  captchaAnswer = a + b;
  document.getElementById('captchaQ').textContent = a + ' + ' + b;
  document.getElementById('captchaAnswer').value = '';
}

// FORM SUBMIT — wired to Formspree
async function submitSaleForm(e) {
  e.preventDefault();
  const userAnswer = parseInt(document.getElementById('captchaAnswer').value);
  document.getElementById('formSuccess').style.display = 'none';
  document.getElementById('formError').style.display = 'none';

  if (userAnswer !== captchaAnswer) {
    document.getElementById('formError').textContent = '❌ Incorrect answer. Please try again.';
    document.getElementById('formError').style.display = 'block';
    generateCaptcha();
    return;
  }

  const name    = document.getElementById('popupName').value;
  const email   = document.getElementById('popupEmail').value;
  const phone   = document.getElementById('popupPhone').value;
  const message = document.getElementById('popupMessage').value;

  try {
    const response = await fetch('https://formspree.io/f/xaqlyrde', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ name, email, phone, message })
    });

    if (response.ok) {
      document.getElementById('formSuccess').style.display = 'block';
      document.getElementById('saleForm').reset();
      generateCaptcha();
      setTimeout(closePopup, 3000);
    } else {
      document.getElementById('formError').textContent = '❌ Something went wrong. Please try again.';
      document.getElementById('formError').style.display = 'block';
    }
  } catch (err) {
    document.getElementById('formError').textContent = '❌ Network error. Please try again.';
    document.getElementById('formError').style.display = 'block';
  }
}

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// AUTO-SHOW POPUP after 4 seconds
setTimeout(() => {
  if (!sessionStorage.getItem('popupSeen')) {
    openPopup();
    sessionStorage.setItem('popupSeen', '1');
  }
}, 4000);
