import {getCookie, setCookies} from "cookies-next";


export const useCookie = () => {
    const checkFavorite = () => {
        if (getCookie("favorite")) {
            const data = JSON.parse(<string>getCookie("favorite"))
            const ActiveElementsCheck = document.querySelectorAll(".bxs-heart")
            ActiveElementsCheck.forEach((elem) => {
                let check = 0;
                data.forEach((id: string) => {
                    if (id !== elem.getAttribute("data-id")) {
                        check += 1
                    }
                })
                if (check === data.length) {
                    elem.classList.remove("active")
                } else {
                    elem.classList.add("active")
                }
            })
        }
    }

    const checkToken = () => {
        if (getCookie("token")) {
            const data = JSON.parse(<string>getCookie("token"))
            return data
        }
    }

    const setCookieForFavorite = (id: string) => {
        const day = 7
        const result = new Date().setDate(new Date().getDate() + day);
        const expires = new Date(result)
        if (!getCookie("favorite")) {
            const data = JSON.stringify([id])
            const cookie = setCookies("favorite", data, {path: "/", expires: expires})
            checkFavorite()
            return 0
        }
        let check = 0
        const value = JSON.parse(<string>getCookie("favorite"))
        const checkedValue = value.filter((elem: string) => elem !== id)
        if (checkedValue.length === value.length) {
            value.push(id)
            const data = JSON.stringify(value)
            const cookie = setCookies("favorite", data, {path: "/", expires: expires})
            checkFavorite()
            return 0
        }
        const data = JSON.stringify(checkedValue)
        const cookie = setCookies("favorite", data, {path: "/", expires: expires})
        checkFavorite()
    }

    const setCookieForAuth = (token: string) => {
        const day = 7
        const result = new Date().setDate(new Date().getDate() + day);
        const expires = new Date(result)
        const data = JSON.stringify(token)
        const cookie = setCookies("token", data, {path: "/", expires: expires})
    }

    return {setCookieForFavorite, setCookieForAuth, checkFavorite, checkToken}
}

