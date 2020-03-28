const express = require('express')
const app = express()
// const userHelpers = require('./controllerHelpers/userHelpers')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

exports.renderEditProfilePage = async (req, res) => {
	try {
		// These functions pull data needed to render the page from the database. Then you can do whatever you want with it.
		// Right now we're just rendering the raw data to the screen
		// const userData = await userHelpers.getProfile({})
		// res.render('editProfilePage', { user_data: userData })
		const userId = req.session.userId
		res.render('editProfilePage', { editProfilePageJSCSS: true })
	} catch (err) {
		res.send('' + err)
	}
}