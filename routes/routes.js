// import other routes
const userRoutes = require('./stocks');

const appRouter = (app, fs) => {

    // default root context route
    app.get('/', (req, res) => {
        res.send(JSON.parse('{"getStocks": "http://localhost:3001/stocks",\n' +
            '"postStocks": "http://localhost:3001/stocks",\n' +
            '"putStocks": "http://localhost:3001/stocks/4",\n' +
            '"deleteStocks": "http://localhost:3001/stocks/4"}'));
    });

    // other routes
    userRoutes(app, fs);

};

module.exports = appRouter;
