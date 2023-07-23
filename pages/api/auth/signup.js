import connect from 'mongodb'
import { connectToDatabase } from '../../../helpers/db'
import { hashFunction } from '../../../helpers/auth'

const handler = async (req, res) => {
	if (req.method === 'POST') {
		const { email, password } = req.body

		if (
			!email ||
			!password ||
			!email.includes('@') ||
			password.trim().length < 7
		) {
			res.status(422).json({
				message:
					'Invalid input = password should also be atleast 7 characters long',
			})
			return
		}

		const hashedPassword = await hashFunction(password)

		const client = await connectToDatabase()
		const db = client.db()

		const existingUser = await db.collection('users').findOne({ email })

		if (existingUser) {
			res.status(422).json({
				message: 'USer Already Exists',
			})
			client.close()
			return
		}

		const result = await db
			.collection('users')
			.insertOne({ email, password: hashedPassword })

		res.status(201).json({ message: 'User created!' })
		client.close()
	}
}

export default handler
