const path = require('path')
const express = require('express');
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();
const port = process.env.PORT || 3000

//Define paths for express config
const publicDirectory = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectory))

app.get('', (req,res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Anuj Choure'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Help',
        name: 'Anuj Choure',
        helptext:'This is some helpful text'
    });
})

app.get('/about', (req,res) => {
    res.render('about',{
        title: 'About',
        name:'Anuj Choure'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.place){
        return res.send({
            error: 'You must provide the address'
        })
    }

    geocode(req.query.place, (error, {latitude,longitude,location} = {}) => {
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }

            res.send({
                forecast : forecastData,
                location,
                place: req.query.place,
            })
        })
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title:'404',
        errorMsg: 'Help article not found',
        name: 'Anuj Choure'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title:'404',
        errorMsg: 'Page not found',
        name: 'Anuj Choure'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+port);
})