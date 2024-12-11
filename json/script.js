const container = document.querySelector('.container');

const list = fetch('https://jsonplaceholder.typicode.com/posts')
            .then(res => res.json())
            .then(data => {
                data.forEach(item => {
                    const head = item.title;
                    const body = item.body;
                    const id = item.id;
                    const postList = ` <li>
                    <h3 class="title">${head}</h3>
                    <p class="info-body">${body}</p>
                    <p class="content-id">id : ${id}</p>
                    </li>`
                    container.innerHTML += postList;
                });
            })

            function creEL () {
                const itemList = document.createElement('div');
                itemList.classList.add('card');

                itemList.appendChild('container')
            }