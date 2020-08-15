const express = require('express')
const path = require('path')
const app = express()
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// define paths for express
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views locations
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
     res.render('index', {
        title: 'Weather',
        name: 'Oladipupo Oluwatobi'
     })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help Pages',
        message: 'This is the page to get help',
        name:'Oladipupo Oluwatobi'
    })
})
app.get('/about', (req,res) => {
    res.render('about', {
        title:'About Me',
        name: 'Oladipupo Oluwatobi'
    })
})

app.get('/weather', (req,res) => {
    const address = req.query.address
    if (!address) {
       return  res.send({
            error:'You must provide an address!'
        })
        
    }
    geocode(address, (error,{latitude,longitude,location} = {}) => {
        if (error) {
            return  res.send({
                error: error
            })
        }
         forecast(latitude, longitude, (error, forecastData) => {
             if (error) {
                return  res.send({
                    error: error
                })
             }
             return res.send({
                   forecast: forecastData,
                   location: location,
                   address:address
             })
          })
    }) 
   
})

app.get('/help/*', (req,res) => {
    res.render('error', {
        title:'404',
        name: 'Oladipupo Oluwatobi',
        message: 'Help Article not found'
    })
})

app.get('*', (req,res) => {
    res.render('error', {
        title:'404',
        name: 'Oladipupo Oluwatobi',
        message: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log("server is up on port 3000. ")
})