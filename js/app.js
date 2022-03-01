const spinner = condition => {
    document.getElementById('spinnerShow').style.display = condition;
};
const allPhones = () => {
    // show spinner
    spinner('block');
    const searchValue = document.getElementById('search-box').value;
   
    document.getElementById('search-box').value = '';
    
    if(!isNaN(searchValue)) {
        // please write somthing
        console.log('input clicked')

        document.getElementById('icorrectInput').style.display = 'block';
        document.getElementById('phone-details-container').textContent = '';
        document.getElementById('result-not-found').style.display = 'block';
        const phoneContainer = document.getElementById('phone-container');
        phoneContainer.textContent = '';
        
    }
    else {
        // get data
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`;
        fetch(url)
        .then(res => res.json())
        .then(data => showPhones(data.data))
        const phnDetailsContainer = document.getElementById('phone-details-container');
        phnDetailsContainer.textContent = '';
        console.log('input else');
    }
    // stop spnner
    spinner('none');
};
// show all phones
const showPhones = phones => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
    // incorrect input value
    if(phones != ''){
        console.log('rong');
        document.getElementById('icorrectInput').style.display = 'none';
        document.getElementById('result-not-found').style.display = 'none';
    }
    else {
        console.log('right')
        document.getElementById('icorrectInput').style.display = 'block';
        document.getElementById('result-not-found').style.display = 'block';
         
    };
    // const newValue = phones.slice(0, 20);
    // const newValue2 = phones.slice(0, 30);

    // less than 20 phones
    // newValue2?.forEach(phone => {
        // console.log(phone);


    for(const phone of phones.slice(0, 20)){
        const div = document.createElement('div');
        div.classList.add('col');

        div.innerHTML = `
            <div class="card h-100">
                <div class="mx-auto">
                    <img src="${phone.image}" class="card-img-top img-fluid" alt="...">
                </div>
                <div class="card-body">
                    <h5 class="fw-bold card-title">Name: <span class="font-style">${phone.phone_name}</span></h5>
                    <h5 class="fw-bold card-title">Brand: <span class="font-style">${phone.brand}</span></h5>
                    <h5 class="fw-bold card-title">Slug: <span class="font-style">${phone.slug}</span></h5>
                    <button type="button" onclick="phoneDetails('${phone.slug}')" class="btn btn-primary btn-sm mt-2 px-4 py-1 fw-bold fs-4">See Details</button>
                </div>
            </div>
        `;
        
        phoneContainer.appendChild(div);
        
    };
    
    
}

const phoneDetails = (phoneName) => {
    // console.log(phoneName);
    const url = `https://openapi.programming-hero.com/api/phone/${phoneName}`;
    fetch(url)
    .then(res => res.json())
    .then(data => showPhoneDetails(data.data))
};

const showPhoneDetails = (phoneInfo) => {
    // console.log(phoneInfo.slug);
    // console.log(phoneInfo.mainFeatures.storage);
    // console.log(phoneInfo.mainFeatures.sensors);
    const phnDetailsContainer = document.getElementById('phone-details-container');
    phnDetailsContainer.textContent = '';
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('row');
    rowDiv.innerHTML = `
        <h4>Phone Details</h4>
        <div class="col-md-6 mx-auto mb-3">
            <img src="${phoneInfo.image}" class="details-img w-50 card-img-top img-fluid" alt="phone-image">
        </div>
        <div class="col-md-6 text-start p-4 align-items-center mt-4">
            <h6 class="fw-bold">Name: <span class="font-style">${phoneInfo.name}</span></h6>
            <h6 class="fw-bold">ReleaseDate: <span class="font-style">${phoneInfo.releaseDate ? phoneInfo.releaseDate : 'No ReleaseDate found'}</span></h6>
            <h6 class="fw-bold">ChipSet: <span class="font-style">${phoneInfo.mainFeatures.chipSet}</span></h6>
            <h6 class="fw-bold">Storage: <span class="font-style">${phoneInfo.mainFeatures.storage}</span></h6>
            <h6 class="fw-bold">DisplaySize: <span class="font-style">${phoneInfo.mainFeatures.displaySize}</span></h6>
            <h6 class="fw-bold">Memory: <span class="font-style">${phoneInfo.mainFeatures.memory}</span></h6>
        </div>
    `;
    phnDetailsContainer.appendChild(rowDiv);
};
