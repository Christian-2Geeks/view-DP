(async function load() {
  const URL = 'https://christian-2geeks.github.io/view-DP/initialState.json';

  const getData = async url => {
    const response = await fetch(url);
    const data = await response.json();
    if (Object.keys(data).length > 0) {
      return data;
    }
    throw new Error('No se encontro ningun resultado');
  };

  const select = document.querySelector('#select');

  const template = (departamento, users) => {
    return `
      <div class="area__table">
        <h3>${departamento}</h3>
        <div>
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Coorporativo</th>
                <th>Local</th>
                <th>Extensión</th>
              </tr>
            </thead>
            <tbody>
            ${users
              .map(user => {
                return `
                <tr>
                  <td>${user.nombre}</td>
                  <td>${user.coorporativo}</td>
                  <td>${user.local}</td>
                  <td>${user.extension}</td>
                </tr>
              `;
              })
              .join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  };

  select.addEventListener('change', async event => {
    const $directorioArea = document.querySelector('.directorio__area');
    const $tables = $directorioArea.querySelector('#tables');
    const data = await getData(URL);
    let html = '';

    Object.values(data).forEach((item, i) => {
      if (item[i]) {
        const HTMLString = template(Object.keys(data)[i], item);
        html += HTMLString;
      }
    });
    $tables.innerHTML = html;
    if (!$directorioArea.classList.contains('active')) {
      $directorioArea.classList.add('active');
    }
  });
})();
