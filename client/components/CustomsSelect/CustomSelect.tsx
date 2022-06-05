import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react';

type ElementT = {
    name: string,
    value: number,
    label: string
}

type CustomSelectT = {
    options: ElementT[], placeholder: string, placeholder_image: string, CurrentSelectValue: number, SetCurrentSelectValue: Dispatch<SetStateAction<number>>
}


const CustomSelect: FC<CustomSelectT> = ({options, placeholder, placeholder_image, CurrentSelectValue, SetCurrentSelectValue}) => {

    useEffect(() => {
        const choosedElement = document.querySelectorAll(".select_element")
        choosedElement.forEach((e) => {
            if (e.getAttribute("data-label") === CurrentSelectValue.toString()) {
                e.classList.add("bg-light_blue")
            } else {
                e.classList.remove("bg-light_blue")
            }
        })
    }, [CurrentSelectValue])

    const openSelectHandler = (e: React.MouseEvent) => {
        const variantElement = document.querySelector("#variants")

        if (variantElement?.classList.contains("hidden")) {
            variantElement?.classList.remove("hidden")
            return 0
        }
        variantElement?.classList.add("hidden")
    }

    const selectHandler = (e: any) => {
        const value = e.target.getAttribute("data-value")
        const name = e.target.getAttribute("data-name")
        const label = e.target.getAttribute("data-label")
        const variantElement = document.querySelector("#variants")
        variantElement?.classList.add("hidden")
        // @ts-ignore
        SetCurrentSelectValue(label)
    }

    return (
        <div className="w-3/6 h-15 mr-auto ">
            <div
                className="m-auto pt-3 pb-3 pl-4 pr-4 w-full h-fit text-white text-3xl rounded-3xl flex flex-row text-center justify-center items-center border-4 border-blue"
                onClick={openSelectHandler}>
                <span className="m-2">{CurrentSelectValue}</span>
                {placeholder_image === "" ? (<></>) : (<span className="m-2">{placeholder_image}</span>)}
            </div>
            <div className="border-blue border-4 rounded-3xl none relative z-10 absolute flex flex-row" id="variants">
                {options.map((elem) => {
                    return (
                        <div data-name={elem.name} data-value={elem.value} data-label={elem.label}
                             className="select_element cursor-pointer m-auto pt-3 pb-3 pl-4 pr-4 w-full h-fit text-white text-2xll rounded-3xl bg-opacity-100 flex flex-row text-center justify-center items-center hover:bg-light_blue transition-all"
                             onClick={selectHandler}>
                            <span data-name={elem.name} data-value={elem.value} data-label={elem.label}
                                  className="m-2">{elem.label}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default CustomSelect;