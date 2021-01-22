const express = require('express')
const hbs = require('hbs')
const path = require('path')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000;
//Definición de directorios para la configuración de express
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Configuración de las diracciones de ahndlebars
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
//Config directorio estatico
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'App del clima',
        name: 'Diego'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Sección Acerca de',
        name: 'Diego'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Texto de ayuda lol',
        title: 'Ayuda',
        name: 'Diego Gómez'
    })
})


app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    console.log(req.query.address);
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Añade el termino a buscar'
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 help',
        name: 'Diego',
        errorMessage: 'Help article not found'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Diego',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Express running on port ' + port);
})