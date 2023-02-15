import React from 'react';

const ChevronDown = ({ fill = '#000', width = '32px', height = '32px' }) => (
    <svg
        fill={fill}
        width={width}
        height={height}
        viewBox='0 0 32 32'
        xmlns='http://www.w3.org/2000/svg'
    >
        <title />
        <g id='chevron-bottom'>
            <line
                style={{
                    fill: 'none',
                    stroke: fill,
                    strokeLinecap: 'round',
                    strokeLinejoin: 'round',
                    strokeWidth: '2px',
                }}
                x1='16'
                x2='7'
                y1='20.5'
                y2='11.5'
            />
            <line
                style={{
                    fill: 'none',
                    stroke: fill,
                    strokeLinecap: 'round',
                    strokeLinejoin: 'round',
                    strokeWidth: '2px',
                }}
                x1='25'
                x2='16'
                y1='11.5'
                y2='20.5'
            />
        </g>
    </svg>
);

export default ChevronDown;
