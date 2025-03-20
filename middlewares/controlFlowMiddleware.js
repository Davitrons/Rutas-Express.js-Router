module.exports = (req, res, next) => {
    console.log(`Middleware de control de flujo ejecutado en: ${req.method} ${req.originalUrl}`);
    next(); 
};
