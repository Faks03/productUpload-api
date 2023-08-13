function validateForm() {
    // Basic validation, you can add more complex checks as needed
    var name = document.forms["registration"]["name"].value;
    var email = document.forms["registration"]["email"].value;
    var phone = document.forms["registration"]["phone"].value;
    var password = document.forms["registration"]["password"].value;
    var confirm = document.forms["registration"]["confirm"].value;

    if (name === "" || email === "" || phone === "" || password === "" || confirm === "") {
        alert("Please fill in all fields.");
        return false;
    }

    if (password !== confirm) {
        alert("Passwords do not match.");
        return false;
    }

    alert("Success!");
    return true;
}




