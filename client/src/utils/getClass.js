const getClass = (prefix = '', options = [], target = '') =>
    ~options.indexOf(target) ? `${prefix}-${target}` : '';

export default getClass;
