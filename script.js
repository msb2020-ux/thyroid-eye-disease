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

// FORM SUBMIT
function submitSaleForm(e) {
  e.preventDefault();
  const userAnswer = parseInt(document.getElementById('captchaAnswer').value);
  document.getElementById('formSuccess').style.display = 'none';
  document.getElementById('formError').style.display = 'none';
  if (userAnswer !== captchaAnswer) {
    document.getElementById('formError').style.display = 'block';
    generateCaptcha();
    return;
  }
  // Success
  document.getElementById('formSuccess').style.display = 'block';
  document.getElementById('saleForm').reset();
  generateCaptcha();
  setTimeout(closePopup, 3000);
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
