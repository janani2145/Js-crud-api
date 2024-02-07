let users = [];
let editId = null;
let url = `https://65ae12861dfbae409a73dcb5.mockapi.io/student`;
document.getElementById('studentForm').addEventListener("submit", function (event) {
    if (!validateForm()) {
        event.preventDefault();
    }
});
window.onload = () => {
    editForm();
};
function validateForm() {
    const name = document.getElementById("name").value.trim();
    const dob = document.getElementById("dob").value.trim();
    const email = document.getElementById("email").value.trim();
    const phoneNumber = document.getElementById("phoneNumber").value.trim();
    const language = document.getElementById("language").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPass = document.getElementById("confirmPass").value.trim();
    const genderValue = document.querySelector('input[name="gender"]:checked');
    const male = document.getElementById("male");
    const checkbox = document.getElementById("attend");
    const female = document.getElementById("female");

    let gender;
    if (genderValue) {
        gender = genderValue.value;
    }
    const nameRegex = /^[a-zA-Z\s]{3,}$/;
    if (name === "") {
        document.getElementById("name").style.border = " 2px solid red";
        document.getElementById("nError").innerHTML = "Name is required";
    }
    else if (!nameRegex.test(name)) {
        document.getElementById("name").style.border = " 2px solid red";
        document.getElementById("nError").innerHTML = "Name must be atleast 3 characters";
    }
    else {
        document.getElementById("nError").innerHTML = "";
        document.getElementById("name").style.border = "";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "") {
        document.getElementById("email").style.border = " 2px solid red";
        document.getElementById("emailError").innerHTML = "email is required";
    }
    else if (!emailRegex.test(email)) {
        document.getElementById("email").style.border = " 2px solid red";
        document.getElementById("emailError").innerHTML = "Invalid email !Please enter valid email";
    }
    else {
        document.getElementById("emailError").innerHTML = "";
        document.getElementById("email").style.border = "";
    }
    if (dob === "") {
        document.getElementById("dob").style.border = " 2px solid red";
        document.getElementById("dbError").innerHTML = "D.O.B  is required";

    }
    else {
        document.getElementById("dbError").innerHTML = "";
        document.getElementById("dob").style.border = "";
    }
    if (male.checked || female.checked) {
        document.getElementById("gdError").innerHTML = "";
    }
    else {
        document.getElementById("gdError").innerHTML = " ! Please Select one Gender";
    }

    const phoneRejex = /^\d{10}$/;
    if (phoneNumber.trim() === "") {
        document.getElementById("phoneNumber").style.border = " 2px solid red";
        document.getElementById("pnError").innerHTML = " ! Phonenumber is required";

    }
    else if (!phoneRejex.test(phoneNumber)) {
        document.getElementById("phoneNumber").style.border = " 2px solid red";
        document.getElementById("pnError").innerHTML = "Inavlid Phone Number !Please Enter 10 Digit Number ";

    }
    else {
        document.getElementById("pnError").innerHTML = "";
        document.getElementById("phoneNumber").style.border = "";

    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (password === "") {
        document.getElementById("password").style.border = " 2px solid red";
        document.getElementById("pwError").innerHTML = " ! Password is required";
    }
    else if (!passwordRegex.test(password)) {
        document.getElementById("password").style.border = " 2px solid red";
        document.getElementById("pwError").innerHTML = "!Invalid.Atleast 8 characters eg.Jasdh050";
    }
    else {
        document.getElementById("pwError").innerHTML = "";
        document.getElementById("password").style.border = "";
    }
    if (confirmPass === "") {
        document.getElementById("confirmPass").style.border = " 2px solid red";
        document.getElementById("cpError").innerHTML = "! Confirm password is required";
    }
    else if (password !== confirmPass) {
        document.getElementById("confirmPass").style.border = " 2px solid red";
        document.getElementById("cpError").innerHTML = "! Not Matching. Password must be same";
    }
    else {
        document.getElementById("cpError").innerHTML = "";
        document.getElementById("confirmPass").style.border = "";

    }
    if (language === "") {
        document.getElementById("language").style.border = " 2px solid red";
        document.getElementById("selectError").innerHTML = " Language password is required";
    }
    else {
        document.getElementById("language").style.border = "";
        document.getElementById("selectError").innerHTML = "";
    }


    if (name == "" ||!nameRegex.test(name)|| dob == "" || email == "" || !emailRegex.test(email) || phoneNumber == "" || !phoneRejex.test(phoneNumber) || language == "" || password == "" || !passwordRegex.test(password) || password !== confirmPass || confirmPass == "" || !(male.checked || female.checked)) {
        return false;
    }
    const newObj = { name, email, dob, phoneNumber, password, confirmPass, language, gender, checkbox: checkbox.checked ? "Present" : "Absent" };

    // Get day, month, and year components
    const dateOfBirth = new Date(newObj.dob);
    const day = dateOfBirth.getDate().toString().padStart(2, '0');
    const month = (dateOfBirth.getMonth() + 1).toString().padStart(2, '0');
    const year = dateOfBirth.getFullYear();
    // Format the date as "DD/MM/YYYY"
    const formattedDate = `${day}/${month}/${year}`;
    newObj['dob'] = formattedDate;

    if (editId !== null) {
        fetch(url + "/" + editId, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newObj),
        })
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                window.location.href = "list.html";
            })
            .catch((errMsg) =>
                console.log(errMsg));
    }
    
    else {
        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newObj),
        })
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                window.location.href = "list.html";
            })
            .catch((errMsg) =>
                console.log(errMsg));
    }
    //Reset the form
    document.getElementById("name").value = "";
    document.getElementById("dob").value = "";
    document.getElementById("email").value = "";
    document.getElementById("male").checked = false;
    document.getElementById("female").checked = false;
    document.getElementById("phoneNumber").value = "";
    document.getElementById("password").value = "";
    document.getElementById("confirmPass").value = "";
    document.getElementById("language").value = "";
    document.getElementById("attend").checked = false;

}

function parseCustomDate(formattedDate) {
    const parts = formattedDate.split("/");
    if (parts.length === 3) {
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const year = parseInt(parts[2], 10);
        return new Date(year, month, day);
    }
}

function editForm(id) {
    var url_string = window.location.href.toLocaleLowerCase();
    var url = new URL(url_string);
    var id = url.searchParams.get("id");
    editId = id;
    console.log(editId)
    if (id) {
        let url = `https://65ae12861dfbae409a73dcb5.mockapi.io/student`;
        fetch(url + "/" + id, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        }
        )
            .then(response => response.json())
            .then((data) => {
                console.log(data)
                users = data;
                document.getElementById("name").value = users.name;

                let dateOfBirth = parseCustomDate(users.dob);
                let formattedDate = `${dateOfBirth.getFullYear()}-${(dateOfBirth.getMonth() + 1).toString().padStart(2, '0')}-${dateOfBirth.getDate().toString().padStart(2, '0')}`;
                document.getElementById("dob").value = formattedDate;

                document.getElementById("email").value = users.email;
                if (users.gender === "Male") {
                    document.getElementById("male").checked = true;
                } else if (users.gender === "Female") {
                    document.getElementById("female").checked = true;
                } else {
                    document.getElementById("male").checked = false;
                    document.getElementById("female").checked = false;
                }
                if (users.checkbox === "Present") {
                    document.getElementById("attend").checked = true;
                }
                else {
                    document.getElementById("attend").checked = false;
                }
                document.getElementById("phoneNumber").value = users.phoneNumber;
                document.getElementById("password").value = users.password;
                document.getElementById("confirmPass").value = users.confirmPass;
                document.getElementById("language").value = users.language;
            })
            .catch((errMsg) => { console.log(errMsg) });
    }
}