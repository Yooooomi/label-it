
async function makeRequest(url, options) {
  const res = await fetch(`http://localhost:8081${url}`, {
    credentials: 'include',
    headers: {
      'content-type': 'application/json',
    },
    ...options,
  });
  if (!(res.status >= 200 && res.status < 300)) {
    const err = new Error(`Request failed with code ${res.status}`);
    Object.assign(err, { response: res, status: res.status });
    throw err;
  }
  if (res.headers.get('content-type') && res.headers.get('content-type').indexOf('application/json') !== -1) {
    return res.json();
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

function put(url, body) {
  return makeRequest(url, {
    method: 'PUT',
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
  logout: () => post('/logout'),
  register: (username, password) => post('/register', { username, password }),
  createLabel: (name, color, time) => post('/label', { name, color, time }),
  deleteLabel: (labelId) => delet(`/label/${labelId}`),
  archiveLabel: (labelId, archive) => put(`/label/${labelId}/archive`, {
    archive,
  }),
  createPin: (labelId, date) => post('/pin', { labelId, date }),
  deletePin: (pinId) => delet(`/pin/${pinId}`),
  getGlobalSettings: () => get('/global_settings'),
  setGlobalSettings: (newRegisters) => put('/global_settings', {
    newRegisters,
  }),
  setSettings: () => put('/settings'),
};
