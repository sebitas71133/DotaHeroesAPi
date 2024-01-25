var cors = require('cors');

const corsMiddleware = () => cors({
    origin:'*',
    methods : 'HEAD,PUT,PATCH,PUT,DELETE',
    optionsSuccessStatus: 204,
});



module.exports = {
    corsMiddleware
}