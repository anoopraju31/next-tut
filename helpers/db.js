import { MongoClient } from 'mongodb'

export const connectToDatabase = async () => {
	const client = MongoClient.connect(
		'mongodb+srv://anoop2019:aqwsedrf@cluster0.r1lmc5v.mongodb.net/auth_demo?retryWrites=true&w=majority',
	)

	return client
}
