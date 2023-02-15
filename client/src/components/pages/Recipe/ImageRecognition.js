import React, {
    useReducer,
    useState,
    useRef,
    useEffect,
    useContext,
} from 'react';
import * as tf from '@tensorflow/tfjs';
import Camera from '../../icons/Camera';
import recipeContext from '../../../context/recipe/recipeContext';

const stateMachine = {
    initial: 'loadingModel',
    states: {
        // initial: { on: { next: 'loadingModel' } },
        loadingModel: { on: { next: 'awaitingUpload' } },
        awaitingUpload: { on: { next: 'ready' } },
        ready: { on: { next: 'classifying' }, showImage: true },
        classifying: { on: { next: 'complete' } },
        complete: {
            on: { next: 'awaitingUpload' },
            showImage: true,
            showResults: true,
        },
    },
};

const reducer = (currentState, event) =>
    stateMachine.states[currentState].on[event] || stateMachine.initial;

const ImageRecognition = () => {
    const { searchTerm, setSearchTerm } = useContext(recipeContext);

    const [state, dispatch] = useReducer(reducer, stateMachine.initial);
    const [model, setModel] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const inputRef = useRef();
    const imageRef = useRef();

    const TARGET_CLASSES = [
        'Chicken Wings',
        'Fish and Chips',
        'Fried Rice',
        'Hamburger',
        'Omelette',
        'Pancakes',
        'Pizza',
        'Sushi',
        'Tacos',
        'Waffles',
    ];

    const next = () => dispatch('next');

    const loadModel = async () => {
        // next();
        const modelJson = await tf.loadGraphModel(
            'https://feastin.s3-ap-southeast-1.amazonaws.com/model/model.json'
        );
        setModel(modelJson);
        next();
    };

    const handleUpload = async (e) => {
        const { files } = e.target;
        if (files.length > 0) {
            const url = URL.createObjectURL(files[0]);
            setImageUrl(url);
            next();
        }
    };

    const handleChange = (e) => {
        const { value } = e.target;
        if (value.trim() === '') {
            setSearchTerm('');
            return;
        }
        setSearchTerm(value);
    };

    const classify = async () => {
        next();
        const image = imageRef.current;
        const tensor = tf.browser
            .fromPixels(image, 3)
            .resizeNearestNeighbor([224, 224])
            .expandDims()
            .toFloat()
            .reverse(-1);
        const predictions = await model.predict(tensor).data();
        const pred = tf.argMax(predictions).dataSync()[0];
        const bestGuess = TARGET_CLASSES[pred];
        setSearchTerm(bestGuess);
        next();
    };

    const reset = () => {
        setSearchTerm('');
        setImageUrl(null);
        next();
    };

    const buttonProps = {
        loadingModel: { text: 'Preparing...', action: () => {} },
        awaitingUpload: {
            text: 'Upload',
            action: () => inputRef.current.click(),
        },
        ready: { text: 'Find', action: classify },
        classifying: { text: 'Searching in database...', action: () => {} },
        complete: { text: 'Reset', action: reset },
    };

    // showResults = false;
    const { showImage = false } = stateMachine.states[state];

    useEffect(() => {
        loadModel();
        // eslint-disable-next-line
    }, []);

    return (
        <div className='search-image-container container'>
            {showImage && (
                <div className='preview-container'>
                    <img src={imageUrl} alt='upload-preview' ref={imageRef} />
                </div>
            )}
            <div className='search-container'>
                <div className='search-bar'>
                    <input
                        placeholder='Search Recipes'
                        value={searchTerm || ''}
                        onChange={handleChange}
                    />
                </div>
                <div className='image-recognition '>
                    <input
                        type='file'
                        accept='image/*'
                        ref={inputRef}
                        onChange={handleUpload}
                        capture='camera'
                    />
                    <button
                        className='button rounded-md primary'
                        onClick={buttonProps[state].action}
                    >
                        <Camera fill='#fff' width='22px' height='22px' />
                        <p>{buttonProps[state].text}</p>
                    </button>
                </div>
            </div>
        </div>
    );
};
export default ImageRecognition;
