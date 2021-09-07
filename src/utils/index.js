(async function load() {
  const URL = '../initialState.json';

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
    const $area = document.querySelector('.area');
    const $directorioArea = document.querySelector('.directorio__area');
    const $tables = $directorioArea.querySelector('#tables');
    const data = await getData(URL);

    if (!$area.classList.contains('active')) {
      $area.classList.add('active');
    }

    const $areaSelect = $area.querySelector('select');
    if ($areaSelect.length > 1) {
      let i = $areaSelect.options.length;
      for (i; i >= 1; i--) {
        $areaSelect.remove(i);
      }
      $areaSelect.options[0].selected = true;
    }

    Object.keys(data).forEach(item => {
      const $option = document.createElement('option');
      $option.value = item;
      $option.text = item;
      $areaSelect.appendChild($option);
    });

    if ($tables.childElementCount > 0) {
      $tables.childNodes[1].remove();
    }

    $areaSelect.addEventListener('change', event => {
      const area = event.target.value;
      const HtmlString = template(area, data[area]);
      $tables.innerHTML = HtmlString;
    });
  });
})();
