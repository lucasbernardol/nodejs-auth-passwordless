const form = document.querySelector('[data-id="form"]');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = event.target.email.value;

  try {
    const response = await fetch('/api/sessions/sign-in', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ email }),
    });

    if (response.status === 202) {
      alert('Verifque seu e-mail!');
    }
  } catch (error) {
    console.log(error);
    alert('error');
  }
});
