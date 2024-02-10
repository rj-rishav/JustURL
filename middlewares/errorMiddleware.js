function errorHandle (err, req, res, next) {
    const errorStatus = err.status || 500
    const errorType = err.name || "Default error"
    const errorMessage = err.message || "Backend Error"

    console.error(`\n${errorType}: ${errorMessage}`);
    res.status(errorStatus).json({ error: `${errorType}: ${errorMessage}`})
    next()
}

module.exports = errorHandle;