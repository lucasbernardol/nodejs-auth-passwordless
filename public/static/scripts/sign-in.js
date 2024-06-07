import Spinner from '/scripts/classes/Spinner.js';

const form = document.querySelector('[data-id="form"]');

const emailField = (target) => target.email.value.trim().toLowerCase();

async function signIn({ email }) {
  const response = await fetch('/api/sessions/sign-in', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ email }),
  });

  const isAuthenticated = response.status === 202; // no content

  return { isAuthenticated };
}

async function handleFormSubmit(event) {
  event.preventDefault();

  const { target } = event;

  const email = emailField(target);

  Spinner.show();

  try {
    const { isAuthenticated } = await signIn({ email });

    Spinner.close();

    if (isAuthenticated) {
      return location.assign(`/resend-email/?email=${email}`);
    }
  } catch (error) {
    console.error(error);
  }
}

form.addEventListener('submit', handleFormSubmit);
