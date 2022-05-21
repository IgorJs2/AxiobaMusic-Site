import { SetStateAction, useState} from 'react';

const isBrowser = typeof window !== 'undefined';

export function stringifyOptions(options: { [x: string]: any; }) {
    return Object.keys(options).reduce((acc, key) => {
        if (key === 'days') {
            return acc;
        } else {
            if (options[key] === false) {
                return acc;
            } else if (options[key] === true) {
                return `${acc}; ${key}`;
            } else {
                return `${acc}; ${key}=${options[key]}`;
            }
        }
    }, '');
}

export const setCookie = (name: string, value: string, options: any) => {
    if (!isBrowser) return;

    const optionsWithDefaults = {
        days: 7,
        HttpOnly: true
    };
    const expires = new Date(
        Date.now() + optionsWithDefaults.days * 864e5
    ).toUTCString();

    const d = new Date();
    d.setTime(d.getTime() + (7*24*60*60*1000));
    let expiress = "expires="+ d.toUTCString();

    document.cookie = name + "=" + value + ";" + expiress + ";path=/" + ";HttpOnly;";
    // document.cookie = name + "=" + value + ";" + "expires="+expires + stringifyOptions(optionsWithDefaults)+";";
    // console.log(name + "=" + value + ";" + "expires="+expires + stringifyOptions(optionsWithDefaults)+";")
    // console.log(name + "=" + value + ";" + expiress + ";path=/"+ ";HttpOnly;")
};

export const getCookie = (name: string, initialValue = '') => {
    return (
        (isBrowser &&
            document.cookie.split('; ').reduce((r, v) => {
                const parts = v.split('=');
                return parts[0] === name ? decodeURIComponent(parts[1]) : r;
            }, '')) ||
        initialValue
    );
};

export default function (key: string, initialValue: string | undefined) {
    const [item, setItem] = useState(() => {
        return getCookie(key, initialValue);
    });

    const updateItem = (value: number | boolean | SetStateAction<string>, options: any) => {
        // @ts-ignore
        setItem(value);
        setCookie(key, value, options);
    };

    return [item, updateItem];
}