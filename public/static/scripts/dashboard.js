import Loader from '/scripts/classes/Loader.js';

const logoutButton = document.querySelector('[data-id="logout"]');

async function logout(event) {
  await fetch('/api/sessions/logout', { method: 'DELETE' });

  localStorage.removeItem('finish'); // server state

  return location.assign('/');
}

logoutButton.addEventListener('click', logout);

window.addEventListener('load', () => Loader.stop());
