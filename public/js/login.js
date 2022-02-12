const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log in.');
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (username && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to sign up.');
    }
  }
};

window.addEventListener('DOMContentLoaded', function () {
  const apikey = 'AXKRQb2VzQvmGCgSVGz2nz';
  const client = filestack.init(apikey);

  const onProgress = (evt) => {
    document.getElementById('progress').innerHTML = `${evt.totalPercent}%`;
  };

  document.querySelector('input').addEventListener('change', (event) => {
    const files = event.target.files[0];
    const token = {};
    const cancel = document.getElementById('cancel');
    const pause = document.getElementById('pause');
    const resume = document.getElementById('resume');

    [cancel, resume, pause].forEach((btn) => {
      const id = btn.id;
      btn.addEventListener('click', () => {
        token[id]();
      });
    });

    client.upload(files, { onProgress }, {}, token)
      .then(res => {
        console.log('success: ', res)
      })
      .catch(err => {
        console.log(err)
      });
  });
});

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
