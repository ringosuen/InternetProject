const pool = require('../util/database')

exports.createUser = async (userData) => {
	try {
		//creates a new user
		const sql =
			'INSERT INTO users (email, password, full_name, bio, img_url, country, date_of_birth) VALUES("' +
			userData.email +
			'","' +
			userData.password +
			'","' +
			userData.full_name +
			'","' +
			userData.bio +
			'","' +
			userData.img_url +
			'","' +
			userData.country +
			'","' +
			userData.date_of_birth +
			'");'
		const response = await pool.execute(sql)

		//returns the new user's userId
		const userId = await this.getUserId({ email: userData.email, password: userData.password })
		return userId
	} catch (err) {
		throw err
	}
}

exports.getUserId = async (userData) => {
	try {
		const response = await pool.execute(
			'SELECT user_id FROM users WHERE email = "' +
				userData.email +
				'" && password = "' +
				userData.password +
				'";'
		)
		if (response[0].length === 0) {
			return undefined
		} else {
			const userId = response[0][0]['user_id']
			return userId
		}
	} catch (err) {
		throw err
	}
}
