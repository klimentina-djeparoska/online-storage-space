const prod = process.env.NODE_ENV === 'production';

module.exports = {
    target: 'serverless',
    basePath: '',
    future: {
        webpack5: true,
    }
};
