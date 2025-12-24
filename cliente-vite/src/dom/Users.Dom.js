export function renderUsers(users) {
  const lista = document.getElementById('listaUsuarios');
  lista.innerHTML = '';

  users.forEach(user => {
    const li = document.createElement('li');
    li.textContent = `${user.name} (${user.email})`;
    lista.appendChild(li);
  });
}