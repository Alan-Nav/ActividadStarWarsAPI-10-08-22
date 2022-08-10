window.addEventListener("DOMContentLoaded", function () {
  const mainElement = document.querySelector("#main");

  const previousButton = document.querySelector("#prev");
  const nextButton = document.querySelector("#next");

  const pageElement = document.querySelector("#page");

  let pageNumber = 1;

  function loadPeople(url) {
    fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (resultsPage) {
        const html = resultsPage.results.map(function (result) {
          return `
          <article>
      <h2 id="name">${result.name}</h2>
      <table>
        <tr>
          <td>
            <strong>Estatura</strong>
          </td>
          <td>${result.height / 100} m</td>
        </tr>
        <tr>
          <td>
            <strong>Peso</strong>
          </td>
          <td>${result.mass} kg</td>
        </tr>
        <tr>
          <td>
            <strong>Género</strong>
          </td>
          <td>${result.gender}</td>
        </tr>
        <tr>
          <td>
            <strong>Año de nacimiento</strong>
          </td>
          <td>${result.birth_year}</td>
        </tr>
        <tr>
          <td>
            <strong>Color de piel</strong>
          </td>
          <td>${result.skin_color}</td>
        </tr>
        <tr>
          <td>
            <strong>Color de ojos</strong>
          </td>
          <td>${result.eye_color}</td>
        </tr>
        <tr>
          <td>
            <strong>Color de cabello</strong>
          </td>
          <td>${result.hair_color}</td>
        </tr>
      </table>
    </article>
          `;
        });
        mainElement.innerHTML = html.join("");

        pageElement.innerHTML = pageNumber;

        if (resultsPage.previous == null) {
          previousButton.disabled = true;
          previousButton.onclick = null;
        } else {
          previousButton.disabled = false;
          previousButton.onclick = function () {
            pageNumber--;
            loadPeople(resultsPage.previous);
          };
        }

        if (resultsPage.next == null) {
          nextButton.disabled = true;
          nextButton.onclick = null;
        } else {
          nextButton.disabled = false;
          nextButton.onclick = function () {
            pageNumber++;
            loadPeople(resultsPage.next);
          };
        }
      });
  }

  loadPeople("https://swapi.dev/api/people/");
});
