import React from 'react';

const Heart = ({ fill = '#000', width = '32px', height = '32px' }) => (
    <svg viewBox='0 0 50 50' width={width} height={height}>
        <g>
            <rect
                fill='none'
                id='canvas_background'
                height='34'
                width='34'
                y='-1'
                x='-1'
            />
        </g>
        <g>
            <path
                stroke={fill}
                strokeWidth='2'
                id='svg_1'
                d='m17.210163,4.14122l-1.210162,1.252769l-1.210162,-1.252769c-3.341788,-3.459569 -8.759836,-3.459569 -12.101624,0c-3.341788,3.459569 -3.341788,9.070045 0,12.531541l1.210162,1.252769l12.101624,12.529613l12.101624,-12.531541l1.210162,-1.252769c3.341788,-3.459569 3.341788,-9.070045 0,-12.531541c-3.341788,-3.459569 -8.759836,-3.459569 -12.101624,0.001927z'
            />
        </g>
    </svg>
);

export default Heart;
