import React, { useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import IngredientContext from '../../../../context/ingredient/ingredientContext';
import Back from '../../../icons/Back';
import InternalLink from '../../../reusable/InternalLink';
import ImageUpload, { ImagePreview } from '../../../reusable/ImageUploader';
import Loading from '../../../reusable/Loading';

const AllergyForm = () => {
    const ingredientContext = useContext(IngredientContext);

    const {
        current,
        success,
        createAllergy,
        getAllergy,
        setCurrent,
        clearCurrent,
        updateAllergy,
        deleteAllergy,
        setSuccess,
    } = ingredientContext;

    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        if (current === null && id) {
            getAllergy(id);
            return;
        }

        if (current !== null) {
            setAllergy(current);
            return;
        }

        setCurrent('');

        return () => {
            URL.revokeObjectURL(uploaded.preview);
        };
        // eslint-disable-next-line
    }, [current, id]);

    useEffect(() => {
        if (success) {
            history.push('/admin/ingredients/allergies');
            setSuccess(false);
        }
    }, [success]);

    const [allergy, setAllergy] = useState('');
    const [uploaded, setUploaded] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.entries(allergy).map(([key, value]) =>
            formData.append(key, JSON.stringify(value))
        );
        uploaded && formData.append('uploaded', uploaded);
        id ? updateAllergy(current._id, formData) : createAllergy(formData);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAllergy((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const onDrop = (file) => {
        setUploaded(file[0]);
    };

    const removeImage = (existing, deleteField) => {
        if (!existing) {
            setUploaded('');
        }
    };

    const { name, image } = allergy;

    return (
        <div className='category-form'>
            <InternalLink
                to='/admin/ingredients/allergies'
                onClick={clearCurrent}
            >
                <div className='back-container'>
                    <Back fill='#f15a2e' width='18px' height='18px' />
                    <span>Back</span>
                </div>
            </InternalLink>
            <h2>{id ? 'Edit ' : 'Add New'} Allergy</h2>
            {current !== null ? (
                <form onSubmit={onSubmit}>
                    <div className='row'>
                        <label htmlFor=''>Featured Image</label>
                        {!uploaded && image ? (
                            <ImagePreview
                                name={image.key}
                                src={image.location}
                                existing={true}
                                deleteField={image.key}
                                removeImage={removeImage}
                            />
                        ) : (
                            ''
                        )}
                        {uploaded ? (
                            <ImagePreview
                                key={uploaded.name}
                                name={uploaded.name}
                                src={uploaded.preview}
                                existing={false}
                                deleteField={uploaded.lastModified}
                                removeImage={removeImage}
                            />
                        ) : image ? (
                            ''
                        ) : (
                            'No files uploaded'
                        )}
                        <ImageUpload
                            onDrop={onDrop}
                            multiple={false}
                            labelText={
                                image || uploaded ? 'Change Image' : 'Add Image'
                            }
                        />
                    </div>
                    <div className='row'>
                        <label>Allergy Name</label>
                        <input
                            type='text'
                            name='name'
                            value={name || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='button-container'>
                        <button
                            type='submit'
                            className='button primary rounded-md'
                        >
                            {id ? 'save changes' : 'add'}
                        </button>
                        {id ? (
                            <button
                                className='button rounded-md delete'
                                type='button'
                                onClick={() => deleteAllergy(current._id)}
                            >
                                Delete
                            </button>
                        ) : (
                            ''
                        )}
                    </div>
                </form>
            ) : (
                <Loading />
            )}
        </div>
    );
};

export default AllergyForm;
