import React, {FC} from 'react';

type ErrorMessageT = {
    error: string
}

const ErrorMessage: FC<ErrorMessageT> = ({error}) => {
    return (
        <div className="w-fit h-fit m-auto text-white text-4xl text-center bg-dark_blue rounded-box p-4">
            {error}
        </div>
    );
};

export default ErrorMessage;