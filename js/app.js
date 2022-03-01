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
    for(const phone of phones){
        const div = document.createElement('div');
        div.classList.add('col');

        div.innerHTML = `
            <div id="card" class="card h-100">
                <div class="mx-auto">
                    <img src="${phone.image}" class="card-img-top img-fluid" alt="card-image">
                </div>
                <div class="card-body">
                    <h5 class="fw-bold card-title">Name: <span class="font-style">${phone.phone_name}</span></h5>
                    <h5 class="fw-bold card-title">Brand: <span class="font-style">${phone.brand}</span></h5>
                    <h5 class="fw-bold card-title">Slug: <span class="font-style">${phone.slug}</span></h5>
                    

                    <div class="d-grid gap-2 col-6 mx-auto">
                        <button onclick="phoneDetails('${phone.slug}')" class="btn btn-primary mt-2 fw-bold fs-5" type="button">See Details</button>
                    </div>
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
    const phnDetailsContainer = document.getElementById('phone-details-container');
    phnDetailsContainer.textContent = '';
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('row');
    rowDiv.innerHTML = `
        <h4 id="details-img-title">Phone Details</h4>
        <div class="col-md-6 mx-auto">
            <img src="${phoneInfo.image}" class="details-img img-fluid" alt="phone-image">
        </div>
        <div id="phone-details-container" class="col-md-6 text-start p-4 align-items-center mt-4 text-wrap">
            <h6 class="fw-bold">Name: <span class="font-style">${phoneInfo?.name}</span></h6>
            <h6 class="fw-bold">ReleaseDate: <span class="font-style">${phoneInfo?.releaseDate ? phoneInfo?.releaseDate : 'No ReleaseDate found'}</span></h6>
            <h6 class="fw-bold">ChipSet: <span class="font-style">${phoneInfo?.mainFeatures?.chipSet ? phoneInfo?.mainFeatures?.chipSet : 'No ChipSet'}</span></h6>
            <h6 class="fw-bold">Storage: <span class="font-style">${phoneInfo?.mainFeatures?.storage}</span></h6>
            <h6 class="fw-bold">DisplaySize: <span class="font-style">${phoneInfo?.mainFeatures?.displaySize}</span></h6>
            <h6 class="fw-bold">Memory: <span class="font-style">${phoneInfo?.mainFeatures?.memory}</span></h6>
            <h6 class="fw-bold">Sensor: <span class="font-style">${phoneInfo?.mainFeatures?.sensors}</span></h6>
            <h6 class="fw-bold">WLAN: <span class="font-style">${phoneInfo?.others?.WLAN ? phoneInfo?.others?.WLAN : 'NO WLAN'}</span></h6>
            <h6 class="fw-bold">Bluetooth: <span class="font-style">${phoneInfo?.others?.Bluetooth ? phoneInfo?.others?.Bluetooth : 'No Bluetooth'}</span></h6>
            <h6 class="fw-bold">GPS: <span class="font-style">${phoneInfo?.others?.GPS ? phoneInfo?.others?.GPS : 'No GPS'}</span></h6>
            <h6 class="fw-bold">NFC: <span class="font-style">${phoneInfo?.others?.NFC ? phoneInfo?.others?.NFC : 'No NFC'}</span></h6>
            <h6 class="fw-bold">Radio: <span class="font-style">${phoneInfo?.others?.Radio ? phoneInfo?.others?.Radio : 'No Radio'}</span></h6>
            <h6 class="fw-bold">USB: <span class="font-style">${phoneInfo?.others?.USB ? phoneInfo?.others?.USB : 'No USB'}</span></h6>
        </div>
    `;
    phnDetailsContainer.appendChild(rowDiv);
};
