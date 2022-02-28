const allPhones = () => {
    const searchValue = document.getElementById('search-box').value;
    // console.log(searchValue);
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`;
    // console.log(url);
    fetch(url)
    .then(res => res.json())
    .then(data => showPhones(data.data));
    // document.getElementById('search-box').value = '';
};

const showPhones = phones => {

    const phoneContainer = document.getElementById('phone-container');

    phones.forEach(phone => {
        // console.log(phone);
        const div = document.createElement('div');
        div.classList.add('col');

        div.innerHTML = `
            <div class="card h-100">
                <div class="mx-auto">
                    <img src="${phone.image}" class="card-img-top img-fluid" alt="...">
                </div>
                <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <h5 class="card-title">Card title</h5>
                    <h5 class="card-title">Card title</h5>
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">
                        This is a wider card with supporting text below as a natural lead-in to
                    </p>
                    <button type="button" class="btn btn-primary btn-lg mx-auto">Phone Details</button>
                </div>
            </div>
        `;
        phoneContainer.appendChild(div);
    });
    
}

