import '/scripts/hooks/verifyCompletedSetupHook.js';

import Spinner from '/scripts/classes/Spinner.js';
import Loader from '/scripts/classes/Loader.js';

//const nameInput = document.getElementById('name');
const usernameInput = document.getElementById('username');

const form = document.querySelector('[data-id="form"]');

function formFields(target) {
  return {
    name: target.name.value.trim(),
    username: target.username.value.trim().toLowerCase(),
  };
}

async function checkSignCompleteSetup() {
  const response = await fetch('/api/users/sign-in/completed', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    method: 'GET',
  });

  const { finishedAt } = await response.json();

  return { finishedAt };
}

async function checkUserNameExists(username) {
  const response = await fetch('/api/users/available', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username }),
  });

  const { available } = await response.json();

  return available;
}

async function setup({ name, username }) {
  const response = await fetch('/api/users/setup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, username }),
  });

  const isCompletedSetup = response.status === 204;

  return { isCompletedSetup };
}

// form events
form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const fields = formFields(event.target);

  Spinner.show();

  const available = await checkUserNameExists(fields.username);

  if (!available) {
    alert('Nome de usuário indisponível. Tente novamente!');
    usernameInput.value = '';
    Spinner.close();
    return;
  }

  const { isCompletedSetup } = await setup(fields);

  Spinner.close();

  if (isCompletedSetup) {
    localStorage.setItem('finish', 1);

    return location.assign('/dashboard');
  }

  alert('Houve um erro durante o processo. Tente novamente!');
});

window.addEventListener('load', async () => {
  const { finishedAt } = await checkSignCompleteSetup();

  if (finishedAt) {
    localStorage.setItem('finish', '1');

    return location.assign('/dashboard');
  }

  localStorage.setItem('finish', 0);

  Loader.stop();
});
