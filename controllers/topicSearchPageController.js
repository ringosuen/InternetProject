const express = require('express')
const app = express()
const postModel = require('../models/postModel')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

exports.renderTopicSearchPage = async (req, res) => {
	try {
		// These functions pull data needed to render the page from the database. Then you can do whatever you want with it.
		// Right now we're just rendering the raw data to the screen
		const queryString = req.query.topic
		const postData = await postModel.getPostsByTopic({ queryString: queryString })
		res.render('topicSearchPage', { topicSearchPageJSCSS: true, post_data: JSON.stringify(postData) })
	} catch (err) {
		res.send('' + err)
	}
}
