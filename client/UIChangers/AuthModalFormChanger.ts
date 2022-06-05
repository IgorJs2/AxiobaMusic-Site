const LoginChange = (error: string) => {
    const loginInput = document.querySelector("#login")
    const loginError = document.querySelector("#loginError")
    if (loginError && loginError.innerHTML.length < 5) {
        loginError.innerHTML = loginError.innerHTML + " " + (error.split("LOGIN:")[1] || error.split("EMAIL:")[0])
    }
    loginError?.classList.remove("hidden")
    loginInput?.classList.remove("border-none")
    loginInput?.classList.add("border-2")
    loginInput?.classList.add("border-red")
}

const EmailChange = (error: string) => {
    const emailInput = document.querySelector("#email")
    const emailError = document.querySelector("#emailError")
    if (emailError && emailError.innerHTML.length < 5) {
        emailError.innerHTML = emailError.innerHTML + " " + (error.split("EMAIL:")[1] || error.split("EMAIL:")[0])
    }
    emailError?.classList.remove("hidden")
    emailInput?.classList.remove("border-none")
    emailInput?.classList.add("border-2")
    emailInput?.classList.add("border-red")
}

const PasswordChange = (error: string) => {
    const passwordInput = document.querySelector("#password")
    const passwordError = document.querySelector("#passwordError")
    if (passwordError && passwordError.innerHTML.length < 5) {
        passwordError.innerHTML = passwordError.innerHTML + " " + error.split("PASSWORD:")[1]
    }
    passwordError?.classList.remove("hidden")
    passwordInput?.classList.remove("border-none")
    passwordInput?.classList.add("border-2")
    passwordInput?.classList.add("border-red")
}

const UserChange = () => {
    LoginChange("This user already registered")
    EmailChange("This user already registered")
}


const ClearInputErrors = (element: string[]) => {
    const loginInput = document.querySelector("#login")
    const loginError = document.querySelector("#loginError")
    const emailInput = document.querySelector("#email")
    const emailError = document.querySelector("#emailError")
    const passwordInput = document.querySelector("#password")
    const passwordError = document.querySelector("#passwordError")
    for(let i = 0; i < element.length; i++){
        if(element[i] === "ALL"){
            loginError?.classList.add("hidden")
            loginInput?.classList.add("border-none")
            loginInput?.classList.remove("border-2")
            loginInput?.classList.remove("border-red")
            if(loginError)
                loginError.innerHTML = "•"
            emailError?.classList.add("hidden")
            emailInput?.classList.add("border-none")
            emailInput?.classList.remove("border-2")
            emailInput?.classList.remove("border-red")
            if(emailError)
                emailError.innerHTML = "•"
            passwordError?.classList.add("hidden")
            passwordInput?.classList.add("border-none")
            passwordInput?.classList.remove("border-2")
            passwordInput?.classList.remove("border-red")
            if(passwordError)
                passwordError.innerHTML = "•"
            return 0
        }
        if (element[i] === "Login") {
            loginError?.classList.add("hidden")
            loginInput?.classList.add("border-none")
            loginInput?.classList.remove("border-2")
            loginInput?.classList.remove("border-red")
            if(loginError)
                loginError.innerHTML = "•"
        }
        if (element[i] === "Email") {
            emailError?.classList.add("hidden")
            emailInput?.classList.add("border-none")
            emailInput?.classList.remove("border-2")
            emailInput?.classList.remove("border-red")
            if(emailError)
                emailError.innerHTML = "•"
        }
        if (element[i] === "Password") {
            passwordError?.classList.add("hidden")
            passwordInput?.classList.add("border-none")
            passwordInput?.classList.remove("border-2")
            passwordInput?.classList.remove("border-red")
            if(passwordError)
                passwordError.innerHTML = "•"
        }
    }
}


const AutorizePass = (fields: string[]) => {
    ClearInputErrors(fields)
    const loginInput = document.querySelector("#login")
    const emailInput = document.querySelector("#email")
    const passwordInput = document.querySelector("#password")
    loginInput?.classList.remove("border-none")
    loginInput?.classList.add("border-2")
    loginInput?.classList.add("border-green")
    emailInput?.classList.remove("border-none")
    emailInput?.classList.add("border-2")
    emailInput?.classList.add("border-green")
    passwordInput?.classList.remove("border-none")
    passwordInput?.classList.add("border-2")
    passwordInput?.classList.add("border-green")
}


const AuthModalFormChanger = (errors: string[], fields: string[]) => {
    for (let i = 0; i < fields.length; i++) {
        if (fields.includes("User")) {
            UserChange()
            return 0
        }
        if (fields.includes("Login")) {
            for (let i = 0; i < errors.length; i++) {
                if (errors[i].includes("LOGIN:")) {
                    LoginChange(errors[i])
                }
            }
        }
        if (fields.includes("Password")) {
            for (let i = 0; i < errors.length; i++) {
                if (errors[i].includes("PASSWORD:")) {
                    PasswordChange(errors[i])
                }
            }
        }
        if (fields.includes("Email")) {
            for (let i = 0; i < errors.length; i++) {
                if (errors[i].includes("EMAIL:")) {
                    EmailChange(errors[i])
                }
            }
        }
    }
};

export {AuthModalFormChanger, ClearInputErrors, AutorizePass};