const config = window.MONTHSARY_CONFIG;
const el = id => document.getElementById(id);
const normalize = value => value.trim().replace(/\s+/g, ' ').toLowerCase();
let photoIndex = 0, slideshow = null;
function stopSlideshow() { clearInterval(slideshow); slideshow = null; el('play-slideshow').textContent = 'Play slideshow'; }
function show(id) {
  stopSlideshow();
  document.querySelectorAll('.screen').forEach(screen => screen.hidden = screen.id !== id);
  window.scrollTo({ top: 0, behavior: 'auto' });
  const chapters = ['password-screen','welcome','quiz','chat','celebration','memories','letter','verse','finale'];
  const step = chapters.indexOf(id);
  el('chapter-label').textContent = step === 0 ? 'YOUR SURPRISE AWAITS' : `OUR STORY · ${step} / 8`;
  el('progress-fill').style.width = `${step / 8 * 100}%`;
  const heading = el(id).querySelector('h1,h2'); heading.tabIndex = -1; heading.focus({ preventScroll: true });
}
el('start').onclick = () => show('quiz');
document.querySelectorAll('[data-next]').forEach(button => button.onclick = () => show(button.dataset.next));
el('quiz-form').onsubmit = event => {
  event.preventDefault();
  const errors = [];
  if (normalize(el('full-name').value) !== normalize(config.fullName)) errors.push('full name');
  if (el('birthday').value !== config.birthday) errors.push('birthday');
  if (!config.favoriteColors.some(color => normalize(color) === normalize(el('color').value))) errors.push('favorite color');
  el('quiz-error').textContent = errors.length ? 'Try again, Baby! You entered it wrong.' : '';
  if (!errors.length) show('chat');
};
el('password-hint').textContent = config.passwordHint;
el('password-form').onsubmit = event => {
  event.preventDefault();
  if (el('password').value.trim() === config.monthsaryPassword) { el('password-error').textContent = ''; show('welcome'); }
  else el('password-error').textContent = 'Try again, Baby! Remember the day I said yes to you.';
};
el('toggle-password').onclick = () => {
  const visible = el('password').type === 'password';
  el('password').type = visible ? 'text' : 'password';
  el('toggle-password').textContent = visible ? 'Hide password' : 'Show password';
};
el('chat-image').onerror = () => { el('chat-image').hidden = true; el('chat-placeholder').hidden = false; };
el('chat-image').src = config.chatImage;

config.message.split(/\n\s*\n/).forEach(text => { const p = document.createElement('p'); p.textContent = text; el('letter-content').appendChild(p); });

function renderPhoto() {
  const photo = config.photos[photoIndex];
  el('memory-image').hidden = !photo; el('photo-placeholder').hidden = !!photo;
  el('memory-caption').textContent = photo ? photo.caption : 'Your memories belong here.';
  el('photo-count').textContent = photo ? `${photoIndex + 1} / ${config.photos.length}` : '0 / 0';
  if (photo) { el('memory-image').alt = photo.caption; el('memory-image').src = photo.src; }
  ['previous-photo', 'next-photo', 'play-slideshow'].forEach(id => el(id).disabled = config.photos.length < 2);
}
el('memory-image').onerror = () => { el('memory-image').hidden = true; el('photo-placeholder').hidden = false; };
function movePhoto(step) { if (config.photos.length) { photoIndex = (photoIndex + step + config.photos.length) % config.photos.length; renderPhoto(); } }
el('previous-photo').onclick = () => movePhoto(-1);
el('next-photo').onclick = () => movePhoto(1);
el('play-slideshow').onclick = () => { if (slideshow) stopSlideshow(); else { slideshow = setInterval(() => movePhoto(1), 3500); el('play-slideshow').textContent = 'Pause slideshow'; } };
el('restart').onclick = () => { el('quiz-form').reset(); el('password-form').reset(); el('password').type = 'password'; el('toggle-password').textContent = 'Show password'; el('quiz-error').textContent = ''; el('password-error').textContent = ''; photoIndex = 0; renderPhoto(); show('password-screen'); };
renderPhoto();

// Number keypad supports mouse, touch, and keyboard focus with Enter/Space.
document.querySelectorAll('[data-digit]').forEach(button => button.onclick = () => {
  if (el('password').value.length < 32) el('password').value += button.dataset.digit;
  el('password-error').textContent = '';
});
el('clear-password').onclick = () => { el('password').value = ''; el('password-error').textContent = ''; };
el('delete-digit').onclick = () => { el('password').value = el('password').value.slice(0, -1); };

show('password-screen');
