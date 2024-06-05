import '/scripts/hooks/verifyCompletedSetupHook.js';

window.addEventListener('load', async () => {
  if (!Number(localStorage.getItem('finish'))) {
    return location.assign('/sign-in/complete');
  }
});
