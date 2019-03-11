const tblbody = document.getElementById("tblbody");
const sqlfield = document.getElementById("sql");
var personMap = [];

document.getElementById("btnsend").addEventListener("click", fetchFromUrl);
document.getElementById("btnsql").addEventListener("click", buildSQLs);

function getGender() {
    return document.getElementById("gender").value;
}

function getRegion() {
    return document.getElementById("region").value;
}

function getAmount() {
    return document.getElementById("amount").value;
}

function buildUrl() {
    var gender = getGender();
    var region = getRegion();
    var amount = getAmount();

    var url = `http://uinames.com/api/?amount=${amount}&region=${region}&gender=${gender}`;
    console.log(url);
    return url;

}

function fetchFromUrl(url) {
    var url = buildUrl();

    fetch(url)
        .then(res => res.json())
        .catch(error => console.error('Error: ', error))
        .then(data => {
            var persons = "";
            var errorMessage = "";

            if (data.error) {
                errorMessage = "You can maximum request 500 persons."
                tblbody.innerHTML = errorMessage;
            } else {
                for (let person of data) {
                    var name = person.name;
                    var surname = person.surname;
                    var gender = person.gender;

                    personMap.push({name, surname, gender});

                    persons += "<tr>"
                        + "<td>" + name + "</td>"
                        + "<td>" + surname + "</td>"
                        + "<td>" + gender + "</td>"
                        + "</tr>";
                }
                clearSQL();
                tblbody.innerHTML = persons;
                console.log(persons);
            }
        });
};

function buildSQLs() {
    var sqlMap = personMap.map(person =>
        `INSERT INTO person (name, lastname, gender) VALUES  ('${person.name}', '${person.surname}', '${person.gender});`
        );
    insertSQLs = sqlMap.join('\n');

    clearSQL();
    sqlfield.value = insertSQLs;

    console.log(sqlMap);
};

function clearSQL() {
    sqlfield.value = "";
}
