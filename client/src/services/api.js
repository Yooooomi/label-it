
async function makeRequest(url, options) {
   const res = await fetch('http://localhost:8081' + url, {
    credentials: 'include',
    headers: {
      'content-type': 'application/json',
    },
    ...options,
  });
  if (!(res.status >= 200 && res.status < 300)) {
    throw new Error(res.status);
  }
  if (res.headers.get('content-type') && res.headers.get('content-type').indexOf('application/json') !== -1) {
    return await res.json();
  }
  return null;
}

function get(url) {
  return makeRequest(url, {
    method: 'GET',
  });
}

function post(url, body) {
  return makeRequest(url, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

function patch(url, body) {
  return makeRequest(url, {
    method: 'PATCH',
    body: JSON.stringify(body),
  });
}

function delet(url, body) {
  return makeRequest(url, {
    method: 'DELETE',
    body: JSON.stringify(body),
  });
}

export default {
  me: () => get('/me'),
  login: (username, password) => post('/login', { username, password }),
  register: (username, password) => post('/register', { username, password }),
  createLabel: (name, color, time) => post('/label', { name, color, time }),
  deleteLabel: (labelId) => delet(`/label/${labelId}`),
  createPin: (labelId, date) => post('/pin', { labelId, date }),
  deletePin: (pinId) => delet(`/pin/${pinId}`),
};
