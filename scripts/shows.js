var NUM_ARTISTS = 3;

window.onload = function () {
    populateShowList();
    var createShowBtn = document.getElementById('button-add-collection');
    var cancelCreateBtn = document.getElementById('button-cancel-collection');
    var addArtistBtn = document.getElementById('button-add-artist');
    var addShowBtn = document.getElementById('button-submit');
    var numCurrArtists = 0;
    var modal = document.getElementById('div-add-collection');

    createShowBtn.addEventListener('click', () => {
        modal.setAttribute('style', 'visibility : visible');
    });

    cancelCreateBtn.addEventListener('click', () => {
        modal.setAttribute('style', 'visibility : hidden');
    });

    addArtistBtn.addEventListener('click', () => {
        if (numCurrArtists < NUM_ARTISTS) {
            addArtist();
            numCurrArtists++;

            if (numCurrArtists >= NUM_ARTISTS) {
                addArtistBtn.setAttribute('style', 'visibility : hidden');
            }
        }
    });

    function addArtist() {
        let inputArtistHTML = document.createElement('input');
        let inputLinkHTML = document.createElement('input');
        let artistDiv = document.getElementById('artist-div');
        let br = document.createElement('br');
        let br2 = document.createElement('br');
        let br3 = document.createElement('br');

        inputArtistHTML.setAttribute('class', 'modal-input');
        inputArtistHTML.setAttribute('type', 'text');
        inputArtistHTML.setAttribute('placeholder', 'Artist name test');
        inputArtistHTML.setAttribute('required', 'required');

        inputLinkHTML.setAttribute('class', 'modal-input');
        inputLinkHTML.setAttribute('type', 'url');
        inputLinkHTML.setAttribute('placeholder', '(Link to artist info) Ex: https://example.com test');

        artistDiv.insertAdjacentElement('beforeend', br3);
        artistDiv.insertAdjacentElement('beforeend', inputArtistHTML);
        artistDiv.insertAdjacentElement('beforeend', br);
        artistDiv.insertAdjacentElement('beforeend', inputLinkHTML);
        artistDiv.insertAdjacentElement('beforeend', br2);
    };

    addShowBtn.addEventListener('click', () => {
        // let containerDiv = document.getElementById('div-add-collection');
        let artistsDiv = document.getElementById('artist-div');
        let descrictionInput = document.getElementById('input-description-collection');

        let dateInput = document.getElementById('input-date-due-collection');
        let timeInput = document.getElementById('input-time-collection');
        let priceInput = document.getElementById('input-price-collection');
        let locationInput = document.getElementById('input-location-collection');

        // let inputs = containerDiv.getElementsByTagName('input');
        let artistInput = artistsDiv.getElementsByTagName('input');
        let genreSelection = document.getElementById('select-priority-collection');
        let ageInput = document.getElementById('input-21-collection');

        let locationOfShow = locationInput.value;
        let dateOfShow = dateInput.value;
        let timeOfShow = timeInput.value;
        let priceOfShow = priceInput.value;
        let genreOfShow = genreSelection.value;
        let descrictionOfShow = descrictionInput.value;
        let twentyOnePlus = ageInput.value;
        let artists = [];

        for (i = 0; i < artistInput.length; i++) {
            artists.push(artistInput[i].value);
        }
        // console.log(dateOfShow,timeOfShow,priceOfShow,genreOfShow,descrictionOfShow,artists);
        let show = {
            "location": locationOfShow,
            "date": dateOfShow,
            "time": timeOfShow,
            "price": priceOfShow,
            "genre": genreOfShow,
            "description": descrictionOfShow,
            "artists": artists,
            "age": twentyOnePlus
        }

        createShow(show);
        modal.setAttribute('style', 'visibility : hidden');
        populateShowList();
    });

    function populateShowList() {
        if ('content' in document.createElement('template')) {
            getShows().then(data => {
                let templateElem = document.getElementById('template-entry');
                let tableElem = document.getElementById('table-collection');
                let keys = Object.keys(data);
                let values = Object.values(data);
                console.log(keys);
                console.log(values);
                for (i = 0; i < values.length; i++) {
                    let artistStr = "";
                    let artistArray = values[i].artists;
                    for (j = 0; j < artistArray.length; j += 2) {
                        if(j == artistArray.length - 2) {
                            artistStr += artistArray[j];
                        }else{
                            artistStr = artistStr + artistArray[j] + " / ";
                        }
                    }
                    console.log(artistStr);
                    let clone = document.importNode(templateElem.content, true);
                    let tr = clone.querySelector('tr');
                    let tds = tr.getElementsByTagName('td');

                    tds[1].textContent = artistStr;
                    tds[2].textContent = values[i].genre;
                    tds[3].textContent = values[i].date;
                    tds[4].textContent = values[i].location;
                    tds[5].textContent = values[i].price;
                    if(values[i].age = 'on'){
                        tds[6].textContent = "21+";
                    }
                    tBod = document.getElementById('table-body-collection');
                    tBod.appendChild(clone);
                }
            }).catch(e => {
                console.log(e);
            });
        } else {
            return;
        }
    };
}