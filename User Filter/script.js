const result = document.getElementById('result')
const filter = document.getElementById('filter')

listItem = [];

getData()


filter.addEventListener('input', (e) => filterData(e.target.value))

async function getData() {
    const res = await fetch('https://randomuser.me/api?results=50')

    const { results } = await res.json()
    
    results.forEach(user => {
        const li = document.createElement('li')
        listItem.push(li)
        result.appendChild(li)
        console.log(results)

        li.innerHTML = `
            <li>
              <img src="${user.picture.large}" alt="${user.name.first}">
            <div class="user-info">
                <h4>${user.name.first} ${user.name.last}</h4>
                <p>${user.location.city}, ${user.location.country}</p>
                <p class="email">${user.email}</p>
            </div>
          </li>
        `
    });
}

function filterData(searchTerm) {
    listItem.forEach(item => {
        if(item.innerText.toLowerCase().includes(searchTerm.toLowerCase())) {
            item.classList.remove('hide')
        } else {
            item.classList.add('hide')
        }
    })
}