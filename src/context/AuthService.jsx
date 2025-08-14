export function authenticate(username, password) {
  if (username === 'admin' && password === 'admin123') {
    return { username, role: 'admin' };
  }
  
  if (username && password) {
    return { username, role: 'cliente' };
  }
  
  return null;
}