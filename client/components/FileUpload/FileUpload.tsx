import React, {FC, useRef} from 'react';

type FileUpload = {
    setFile?: Function,
    setFiles?: Function,
    accept: string,
}

const FileUpload: FC<FileUpload> = ({setFile, setFiles, accept, children}) => {
    const ref = useRef<HTMLInputElement>()

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if(setFiles){
            // @ts-ignore
            setFiles((old: any) => [...old, ...files])
            return 0
        }
        // @ts-ignore
        setFile(e.target.files[0])
    }


    return (
        <div onClick={() => ref.current?.click()}>
            {/*// @ts-ignore*/}
            <input type="file" className="hidden" ref={ref} accept={accept} onChange={onChange}/>
            {children}
        </div>
    );
};

export default FileUpload;