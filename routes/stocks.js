const userRoutes = (app, fs) => {

    // json file based data. like file base database
    const dataPath = './data/stocks.json';

    // function to read data from json file
    const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
        fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                throw err;
            }

            callback(returnJson ? JSON.parse(data) : data);
        });
    };

    // function to write data to json file
    const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {

        fs.writeFile(filePath, fileData, encoding, (err) => {
            if (err) {
                throw err;
            }

            callback();
        });
    };

    // GET Stocks
    app.get('/stocks', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            res.send(JSON.parse(data));
        });
    });

    // CREATE Stocks
    app.post('/stocks', (req, res) => {

        readFile(data => {
                const incomingPayload = req.body;
                //const newStockId = Object.keys(data).length + 1;
                incomingPayload.id = data['stocks'].length + 1;
                //data['stocks'].end;
                // add the new stock
                data['stocks'].push(incomingPayload)
                //data.stocks[newStockId.toString()] = req.body;

                writeFile(JSON.stringify(data, null, 2), () => {
                    res.status(201).send('new stock added');
                });
            },
            true);
    });


    // UPDATE Stocks
    app.put('/stocks/:id', (req, res) => {

        readFile(data => {

                // update the stock
                const stockId = req.params["id"];
                data['stocks'][stockId - 1] = req.body;

                writeFile(JSON.stringify(data, null, 2), () => {
                    res.status(200).send(`stocks id:${stockId} updated`);
                });
            },
            true);
    });


    // DELETE Stocks
    app.delete('/stocks/:id', (req, res) => {

        readFile(data => {

                // delete the stock
                const stockId = req.params["id"];
                //delete data['stocks'][stockId - 1]; // This puts null in removed element
                data['stocks'].splice((stockId - 1), 1);
                writeFile(JSON.stringify(data, null, 2), () => {
                    res.status(200).send(`stocks id:${stockId} removed`);
                });
            },
            true);
    });
};

module.exports = userRoutes;
