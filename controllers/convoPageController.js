const express = require('express')
const app = express()
const convoModel = require('../models/convoModel.js')
const messageModel = require('../models/messageModel.js')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

exports.renderConvoPage = async (req, res) => {
	try {
		const convoData = await convoModel.getAllUsersConvos({ user_id: req.session.userId })
		let messageData = {}
		console.log(req.query.convoId)
		if (convoData.length > 0 && req.query.convoId) {
			messageData = await messageModel.getAllConvoMessages({ convo_id: req.query.convoId })
		} else if (convoData.length > 0) {
			messageData = await messageModel.getAllConvoMessages({ convo_id: convoData[0].convo_id })
		}
		res.render('convoPage', {
			convoPageJSCSS: true,
			convo_data: convoData,
			message_data: JSON.stringify(messageData)
		})
	} catch (err) {
		res.send('' + err)
	}
}
