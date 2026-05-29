let loginform = document.getElementById("loginform");

loginform.addEventListener("submit", (e) => {
    e.preventDefault();

    let loginUser = document.getElementById("loginUser").value.trim();
    let loginpwd = document.getElementById("loginpwd").value.trim();

    let usererr = document.getElementById("usererr");

    usererr.innerHTML = "";

    // Get users from localStorage
    let users = JSON.parse(localStorage.getItem("user")) || [];

    // Check empty fields
    if (loginUser === "" || loginpwd === "") {
        usererr.innerHTML = "All fields are required";
        return;
    }

    // Find matching user
    let validUser = users.find((u) => {
        return (
            (u.username.toLowerCase() === loginUser.toLowerCase() ||
             u.email.toLowerCase() === loginUser.toLowerCase()) &&
            u.password === loginpwd
        );
    });

    if (validUser) {

    localStorage.setItem("loggedInUser", JSON.stringify(validUser));

    alert("Login Successful ✅");

    // move to home page
    window.location.href = "home2.html";

} 
else {
    usererr.innerHTML = "Invalid username/email or password";
} 
});


// CLOSE CHECKOUT MODAL
let closeCheckout = document.querySelector(".close-checkout");

if(closeCheckout){
    closeCheckout.addEventListener("click", () => {
        document.querySelector(".checkout-modal").classList.remove("active");
    });
}