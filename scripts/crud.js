const JSON_SERVER = 'http://localhost:3000';
const FIREBASE_REST = 'https://showtracker-38010.firebaseio.com'

const BUGS_ID = 'id';
const USERS_ID = 'uid';

function counter(init) {
    var counter = init;
    return () => counter++;
}

const newUId = counter(0);
const newBugId = counter(0);

function formatURLforItemById(table, value) {
    // return `${JSON_SERVER}/${table}/${value}`;
    return `${FIREBASE_REST}/${table}/${value}.json`;
}

function formatURLforItemByField(table, key, value) {
    // return `${JSON_SERVER}/${table}?${key}=${value}`;
   return `${FIREBASE_REST}/${table}.json?orderBy="${key}"&equalTo="${value}"`;
}

function formatURLforTable(table) {
        // return `${JSON_SERVER}/${table}`;
        return `${FIREBASE_REST}/${table}.json`;
}

function showURL(id) { return formatURLforItemById('shows', id); }
function allShowsURL() { return formatURLforTable('shows'); }

function userURL(uid, opt) {
    switch (opt) {
        case 1: return formatURLforItemByField('users', USERS_ID, uid); 
        case 2: return formatURLforItemById('users',uid);
    } 
}
function allUsersURL() { return formatURLforTable('users'); }

function jsonFetch(url, params) {
    return(
        fetch(url,params).then(response => {
            if(response.status == 201 || response.status == 200) {
                return response.json();
            }
            else {
                throw response;
            }
        })
    );
}
function createCRUD(url, data) {
    return jsonFetch(url,
        {headers:{'Content-Type' : 'application/json'}, method:'POST', body: JSON.stringify(data)}
    );
}
function readCRUD(url) {
    return jsonFetch(url,
        {headers:{'Content-Type' : 'application/json'}, method:'GET'}
    );
}
function updateCRUD(url, data) {
    return jsonFetch(url,
        {headers:{'Content-Type' : 'application/json'}, method:'PUT', body: JSON.stringify(data)}
    );
}
function deleteCRUD(url) {
    return jsonFetch(url,
        {headers:{'Content-Type' : 'application/json'}, method:'DELETE'}
    );
}

// CRUD for users

function createUser(data) {
    return createCRUD(allUsersURL(), data);
}

function getUser(uid, opt) {
    return readCRUD(userURL(uid, opt));
}

function updateUser(uid, opt, data) {
    return updateCRUD(userURL(uid, opt), data);
}

// CRUD for shows

function createShow(data) {
    return (
        createCRUD(allShowsURL(), data).then(response => {
            return response.name;
        })
        )
};

function getShows() {
    return readCRUD(allShowsURL());   
};

function deleteShow(id) {
    return deleteCRUD(showURL(id));
}

function deleteShows(idArray) {
    for(i = 0; i < idArray.length; i++) {
        deleteShow(idArray[i]);
    }
}