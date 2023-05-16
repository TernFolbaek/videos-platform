import type { NextApiRequest, NextApiResponse } from 'next'

// This would be better stored in a database or some sort of persisted storage
let invalidatedTokens: string[] = []

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'DELETE') {
        const token = req.headers.authorization?.split(" ")[1] // Assuming 'Bearer {token}' format
        if (!token) {
            return res.status(400).json({ message: 'No token provided' });
        }

        // Invalidate the token
        invalidatedTokens.push(token)

        res.status(200).json({ message: 'Successfully logged out' })
    } else {
        res.setHeader('Allow', ['DELETE'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}

export default handler
