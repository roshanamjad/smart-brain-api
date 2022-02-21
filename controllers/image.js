const Clarifai = require('clarifai')

const app = new Clarifai.App({
      apiKey: 'e905ea17f3b644c688f3de64f58937ae'
      })

const handleApiCall = (req, res) => {
	app.models
      	.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
      	.then(data => {
      		res.json(data)
      	})
      	.catch(err => res.status(400).json("unable to connect with Api"))
}

const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0]);
	})
	.catch(err => res.status(400).json('Counting Error'));
}

module.exports = {
	handleImage,
	handleApiCall
}