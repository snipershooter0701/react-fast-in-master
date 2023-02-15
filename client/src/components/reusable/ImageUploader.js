import React from 'react';
import { useDropzone } from 'react-dropzone';
import Cancel from '../icons/Cancel';

const ImageUpload = ({
    maxFiles = 0,
    onDrop,
    multiple = true,
    labelText = 'add image',
    hideButton = false,
    id = '',
}) => {
    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        maxFiles,
        multiple,
        onDrop: (acceptedFiles) => {
            onDrop(
                acceptedFiles.map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                )
            );
        },
    });

    return (
        <div className='image-uploader'>
            <div {...getRootProps({ className: 'dropzone' })}>
                <input id={id} {...getInputProps()} />
                {/* <p>Drag 'n' drop some files here, or click to select files</p> */}
                {hideButton ? (
                    ''
                ) : (
                    <div className='button inverted rounded-md'>
                        {labelText}
                    </div>
                )}
            </div>
        </div>
    );
};

export const ImagePreview = ({
    name,
    src,
    existing = true,
    deleteField,
    removeImage,
}) => (
    <div className='thumb'>
        <div className='thumb__inner'>
            <img src={src} alt={`preview of ${name}`} />
            <button
                type='button'
                onClick={() => removeImage(existing, deleteField)}
            >
                <Cancel fill='#fff' width='17px' height='17px' />
            </button>
        </div>
    </div>
);

export default ImageUpload;
