const express = require('express')
const app = express()
const convoModel = require('../models/convoModel.js')
const messageModel = require('../models/messageModel.js')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

exports.renderConvoPage = async (req, res) => {
	try {
		// These functions pull data needed to render the page from the database. Then you can do whatever you want with it.
		// Right now we're just rendering the raw data to the screen
		const convoData = await convoModel.getAllUsersConvos({ user_id: req.session.userId })
		const messageData = await messageModel.getAllConvoMessages({ convo_id: convoData[0].convo_id })
		res.render('convoPage', {
			convoPageJSCSS: true,
			convo_data: JSON.stringify(convoData),
			message_data: JSON.stringify(messageData)
		})
	} catch (err) {
		res.send('' + err)
	}
}