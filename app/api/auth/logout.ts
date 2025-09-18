import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });
  return res.status(200).json({ message: 'Logout exitoso (el frontend debe borrar el token)' });
}
