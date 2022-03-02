document.addEventListener('DOMContentLoaded', () => {
    const input = document.querySelector('[data-js-input]');
    const btn = document.querySelector('[data-js-btn]');

    window.App = {
        dataItems: []
    }

    btn.addEventListener('click', (event) => {
        event.preventDefault();
        const searchValue = input.value.trim().toLowerCase();

        axios.get('db.json')
            .then(response => {
                window.App.dataItems = response.data.items
                const resultItemsData = window.App.dataItems.filter(({ title }) => {
                    const hasMatchesInTitle = title.uz.toLowerCase().includes(searchValue) || title.en.toLowerCase().includes(searchValue) || title.ru.toLowerCase().includes(searchValue);

                    return hasMatchesInTitle;
                });

                let structureItemData = '';
                resultItemsData.forEach(resultItemData => {
                    const { title, description, image } = resultItemData;

                    structureItemData += `
                    <li id="item">
                        <div id="box">
                            <div class="result__content">
                                <h2 id="result__title">
                                    ${title.uz}
                                </h2>
                                <p id="result__text">
                                    ${description.uz}
                                </p>
                                <h2 id="result__title">
                                    ${title.en}
                                </h2>
                                <p id="result__text">
                                    ${description.en}
                                </p>
                                <h2 id="result__title">
                                    ${title.ru}
                                </h2>
                                <p id="result__text">
                                    ${description.ru}
                                </p>
                            </div>
                            <div class="result__img">
                                <img src="${image.src}" alt="img">
                            </div>
                        </div>
                    </li>`;
                });

                document.querySelector('[data-js-result-list]').innerHTML = structureItemData;
            })
            .catch(err => console.error(err));
    });
});