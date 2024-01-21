// errorMiddleware.js
module.exports = {
    handleErrors: (err, req, res, next) => {
        console.error(err.stack);
        res.status(500).json({ message: 'Internal Server Error' });
    },

    // Add other error handling middleware methods as needed
};
