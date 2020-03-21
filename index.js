const express = require('express')
const app = express()
const path = require('path')

const expressHbs = require('express-handlebars')
app.engine(
	'hbs',
	expressHbs({
		layoutsDir: 'views/layouts/',
		defaultLayout: 'baseLayout',
		extname: 'hbs'
	})
)
app.set('view engine', 'hbs')
app.set('views', 'views')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

let signupLoginRoutes = require('./routes/signupLoginRoutes')
app.use('/', signupLoginRoutes)

let dashboardRoutes = require('./routes/dashboardRoutes')
app.use('/', dashboardRoutes)

let convosPageRoutes = require('./routes/convosPageRoutes')
app.use('/', convosPageRoutes)

let editProfilePageRoutes = require('./routes/editProfilePageRoutes')
app.use('/', editProfilePageRoutes)

let profilePageRoutes = require('./routes/profilePageRoutes')
app.use('/', profilePageRoutes)

let querySearchPageRoutes = require('./routes/querySearchPageRoutes')
app.use('/', querySearchPageRoutes)

let sendMessagePageRoutes = require('./routes/sendMessagePageRoutes')
app.use('/', sendMessagePageRoutes)

let topicSearchPageRoutes = require('./routes/topicSearchPageRoutes')
app.use('/', topicSearchPageRoutes)

// Points towards location of js and css folders
app.use(express.static(path.join(__dirname, '/public')))

app.get('/', (req, res) => {
	res.render('landingPage', { landingPageJSCSS: true })
})

app.get('/signup', (req, res) => {
	res.render('signupPage', { signupPageJSCSS: true })
})

app.listen(process.env.PORT || 3000)
