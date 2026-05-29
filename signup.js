localStorage.clear();
let myform = document.getElementById("myform")
myform.addEventListener("submit",(e)=>{
    e.preventDefault()

    let username = document.getElementById("username").value
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    let confirmpassword = document.getElementById("confirmpassword").value

    document.getElementById("userError").innerHTML="";
    document.getElementById("emailError").innerHTML="";
    document.getElementById("pwdError").innerHTML="";
    document.getElementById("confpwdError").innerHTML="";

    let isValid = true;

    if(username === "")
    {
        userError.innerHTML="Username is required"
        isValid = false
    }else if(username.length<4){
        userError.innerHTML="username should me minimum 6 character"
        isValid=false;
    }

    if(password.length<6){
        pwdError.innerHTML="password length should be minimum 6 character"
        isValid=false;
    }

    if(password!=confirmpassword)
    {
        confpwdError.innerHTML="password is not matching"
        isValid=false;
    }

    if(isValid)
    {

        let arr = JSON.parse(localStorage.getItem("user"))||[]

        let existUser = arr.some((u)=>{
            return u.username.toLowerCase()===username.toLowerCase()
        })

        if(existUser){
            alert("This user is already registered....")
            return
        }

        let existEmail = arr.some((em)=>{
            return em.email.toLowerCase()===email.toLowerCase()
        })

        if(existEmail){
            alert("This email is already registered....")
            return
        }

        let users = {
            username : username,
            email:email,
            password:password,
            confirmpassword:confirmpassword
        }

        
        arr.push(users);
localStorage.setItem("user", JSON.stringify(arr));

alert("Registration Successful ✅");

// move to signin page
window.location.href = "signin.html";
    }

})
