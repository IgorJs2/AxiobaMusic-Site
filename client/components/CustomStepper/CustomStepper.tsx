import React, {FC} from 'react';

type CustomStepperProps = {
    currentStep: number
}

const CustomStepper: FC<CustomStepperProps> = ({currentStep}) => {
    return (
        <div className="mx-auto pt-3 pb-3 pl-4 pr-4 w-full text-white text-3xl flex flex-row">
            <div className={currentStep === 1 || currentStep === 2 || currentStep === 3? "rounded-3xl bg-light_blue p-4 current" : "rounded-3xl bg-dark_blue p-4"}>1</div>
            <line className={currentStep === 2 || currentStep === 3 ? "w-3/6 mb-auto mt-auto ml-2 mr-2 bg-light_blue h-2 flex flex-row text-center items-center justify-center rounded-2xl current" : "w-3/6 mb-auto mt-auto ml-2 mr-2 bg-dark_blue h-2 flex flex-row text-center items-center justify-center rounded-2xl"}></line>
            <div className={currentStep === 3 ? "rounded-3xl bg-light_blue p-4 current" : "rounded-3xl bg-dark_blue p-4"}>2</div>
            <line className={currentStep === 3 ? "w-3/6 mb-auto mt-auto ml-2 mr-2 bg-light_blue h-2 flex flex-row text-center items-center justify-center rounded-2xl current" : "w-3/6 mb-auto mt-auto ml-2 mr-2 bg-dark_blue h-2 flex flex-row text-center items-center justify-center rounded-2xl"}></line>
            <div className="rounded-3xl bg-dark_blue p-4">3</div>
        </div>
    );
};

export default CustomStepper;