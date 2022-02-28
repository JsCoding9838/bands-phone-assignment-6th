const allPhones = () => {
    const searchValue = document.getElementById('search-box').value;
    // console.log(searchValue);
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`;
    // console.log(url);
    fetch(url)
    .then(res => res.json())
    .then(data => showPhones(data.data));
    document.getElementById('search-box').value = '';
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
                    <h5 class="fw-bold card-title">Name:<span> ${phone.phone_name}</span></h5>
                    <h5 class="fw-bold card-title">Brand: ${phone.brand}</h5>
                    <h5 class="fw-bold card-title">Slug: ${phone.slug}</h5>
                    <button type="button" onclick="phoneDetails('${phone.slug}')" class="btn btn-success btn-sm mb-2">See Details</button>
                </div>
            </div>
        `;
        phoneContainer.appendChild(div);
    });
    
}

const phoneDetails = (phoneName) => {
    // console.log(phoneName);
    const url = `https://openapi.programming-hero.com/api/phone/${phoneName}`;
    fetch(url)
    .then(res => res.json())
    .then(data => showPhoneDetails(data.data))
};

const showPhoneDetails = (phoneInfo) => {
    console.log(phoneInfo.slug);
    console.log(phoneInfo.mainFeatures.storage);
    console.log(phoneInfo.mainFeatures.sensors);

    document.getElementById('phone-details-container').innerHTML = `
        <div class="row">
            <h4>Phones Details</h4>
            <div class="col-md-6 mx-auto mb-3">
                <img src="${phoneInfo.image}" class="phn-details-img w-50 card-img-top img-fluid" alt="phone-image">
            </div>
            <div class="col-md-6 text-start p-4 align-items-center mt-4">
                <h6 class="fw-bold">Name: <span class="font-style">${phoneInfo.name}</span></h6>
                <h6 class="fw-bold">ReleaseDate: <span class="font-style">${phoneInfo.releaseDate}</span></h6>
                <h6 class="fw-bold">ChipSet: <span class="font-style">${phoneInfo.mainFeatures.chipSet}</span></h6>
                <h6 class="fw-bold">Storage: <span class="font-style">${phoneInfo.mainFeatures.storage}</span></h6>
                <h6 class="fw-bold">DisplaySize: <span class="font-style">${phoneInfo.mainFeatures.displaySize}</span></h6>
                <h6 class="fw-bold">Memory: <span class="font-style">${phoneInfo.mainFeatures.memory}</span></h6>
            </div>
        </div>
    `;
}
