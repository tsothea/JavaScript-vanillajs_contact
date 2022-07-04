function loadData() {
    let contacts = localStorage.getItem('contacts');
    if (contacts != null && contacts != '') {
        contacts = JSON.parse(contacts);
        contacts.map(function(item) {
            insertRow(1, item);
        });
    }
}

function saveData() {
    if (validatForm()) {
        id = document.getElementById('data_id').value;
        if (id != '') {
            updateRow();
        } else {
            addRow();
        }
        document.getElementById('name_id').value = '';
        document.getElementById('phone_id').value = '';
        document.getElementById('email_id').value = '';
        document.getElementById('errors_id').innerHTML = '';
        document.getElementById('data_id').value = '';
    }
}

function addRow() {
    contacts = getLocalData();
    let data = {
        'id': contacts.length + 1,
        'name': document.getElementById('name_id').value,
        'phone': document.getElementById('phone_id').value,
        'email': document.getElementById('email_id').value,
        'date': new Date().toLocaleString()
    };
    addLocalData(data);
  
    insertRow(1, data);
}

function updateRow() {
    contacts = getLocalData();
    let data = {
        'id': document.getElementById('data_id').value,
        'name': document.getElementById('name_id').value,
        'phone': document.getElementById('phone_id').value,
        'email': document.getElementById('email_id').value,
        'date': new Date().toLocaleString()
    };
    
    rows = document.getElementById('table_id').rows;
    for (let i=0; i<rows.length; i++) {
        if (data['id'] == parseInt(rows[i].cells[0].innerHTML)) {
            document.getElementById('table_id').deleteRow(i);
            insertRow(i, data);
            break;
        }
    }
    result = [];
    contacts.map(function(item) {
        if (item['id'] == id) {
            result.push(data);
        } else {
            result.push(item);
        }
    });
    localStorage.setItem('contacts', JSON.stringify(result));
}

function addRow() {
    contacts = getLocalData();
    let data = {
        'id': contacts.length + 1,
        'name': document.getElementById('name_id').value,
        'phone': document.getElementById('phone_id').value,
        'email': document.getElementById('email_id').value,
        'date': new Date().toLocaleString()
    };
    addLocalData(data);
  
    insertRow(1, data);
}

function insertRow(index, data) {
    let row = document.getElementById('table_id').insertRow(index);
    row.insertCell(0)
    row.cells[0].innerHTML = data['id'];
    row.insertCell(1)
    row.cells[1].innerHTML = data['name'];
    row.insertCell(2)
    row.cells[2].innerHTML = data['phone'];
    row.insertCell(3)
    row.cells[3].innerHTML = data['email'];
    row.insertCell(4)
    row.cells[4].innerHTML = data['date'];
    row.insertCell(5)
    row.cells[5].innerHTML = '<input type="button" value="Edit" class="btn btn-success" onclick="editData('+data['id']+')" /> <input type="button" value="Delete" class="btn btn-danger" onclick="deleteData(this, '+data['id']+')" />';
}


function validatForm() {
    let isValid = true;
    let name = document.getElementById('name_id').value;
    let phone = document.getElementById('phone_id').value;
    let email = document.getElementById('email_id').value;
    let errors = '';

    if (name == '') {
        errors += 'Please enter your name!<br />';
        isValid = false;
    }
    if (phone == '') {
        errors += 'Please enter your phone number!<br />';
        isValid = false;
    }
    if (email == '') {
        errors += 'Please enter your email!<br />';
        isValid = false;
    } else if (!ValidateEmail(email)) {
        errors += 'Please provide valid email address!<br />';
        isValid = false;
    }

    if (!isValid) {
        document.getElementById('errors_id').innerHTML = errors;
    }

    return isValid;
}

function ValidateEmail(email) {
    let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.match(validRegex)) {
        return true;
    }
    
    return false;
}

function editData(id) {
    let contacts = getLocalData();
    data = [];
    contacts.map(function(item) {
        if (item['id'] == id) {
            data = item;
        }
    });
    document.getElementById('data_id').value = data['id'];
    document.getElementById('name_id').value = data['name'];
    document.getElementById('phone_id').value = data['phone'];
    document.getElementById('email_id').value = data['email'];
}

function deleteData(row, id) {
    removeLocalData(id);

    let index = row.parentNode.parentNode.rowIndex;
    document.getElementById('table_id').deleteRow(index);
}

function getLocalData() {
    let contacts = localStorage.getItem('contacts');
    if (contacts == null || contacts == '') {
        return [];
    }

    return JSON.parse(contacts);
}

function addLocalData(data) {
    contacts = localStorage.getItem('contacts');
    if (contacts == null || contacts == '') {
        contacts = [];
    } else {
        contacts = JSON.parse(contacts);
    }
    contacts.push({"id": data['id'], "name": data['name'], "phone": data['phone'], "email": data['email'], "date": data['date']});

    localStorage.setItem('contacts', JSON.stringify(contacts));
}

function removeLocalData(id) {
    let contacts = getLocalData();
    data = [];
    contacts.map(function(item) {
        if (item['id'] != id) {
            data.push(item);
        }
    });

    localStorage.setItem('contacts', JSON.stringify(data));
}
