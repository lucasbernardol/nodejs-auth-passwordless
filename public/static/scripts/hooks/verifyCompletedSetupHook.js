async function checkCompletedAuthSetup() {
  const response = await fetch('/api/users/sign-in/completed', {
    method: 'GET',
  });

  const { finishedAt } = await response.json();

  return { finishedAt };
}

async function storageEventListener(event) {
  const pathname = '/sign-in/complete';

  if (event.key === 'finish' && event.newValue === '1') {
    const { finishedAt } = await checkCompletedAuthSetup();

    if (!finishedAt) {
      localStorage.setItem('finish', 0);

      if (location.pathname !== pathname) {
        return location.assign(pathname);
      }
    }
  }
}

window.addEventListener('storage', storageEventListener);
