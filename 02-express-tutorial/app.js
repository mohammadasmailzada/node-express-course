const { products } = require("./data");
const express = require('express');

console.log('Express Tutorial');

const app = express();

app.use(express.static('./public'));


app.get('/api/v1/test', (req, res) => {
    res.json(products);
});


app.get('/api/v1/products/:productID', (req, res) => {
    const idToFind = parseInt(req.params.productID);
    const product = products.find(p => p.id === idToFind);
 
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
});


app.get('/api/v1/query', (req, res) => {
    const { search, searchRegex, limit, maxPrice } = req.query;
    let filteredProducts = [...products];

    if (search) {
        const searchTerm = search.toLowerCase();
        filteredProducts = filteredProducts.filter(p => p.name.toLowerCase().startsWith(searchTerm));
    }

    if (searchRegex) {
        const regex = new RegExp(searchRegex, 'i'); 
        filteredProducts = filteredProducts.filter(p => regex.test(p.name));
    }

    if (maxPrice) {
        const maxPriceNumber = parseFloat(maxPrice);
        filteredProducts = filteredProducts.filter(p => p.price < maxPriceNumber);
    }

    if (limit) {
        const limitNumber = parseInt(limit);
        filteredProducts = filteredProducts.slice(0, limitNumber);
    }

    res.json(filteredProducts);
});


app.use((req, res, next) => {
    res.status(404).send('Page not found');
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
