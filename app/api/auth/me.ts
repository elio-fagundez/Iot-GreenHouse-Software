import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Obtener token del header Authorization o cookie
  const authHeader = req.headers.authorization;
  let token = '';
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.replace('Bearer ', '');
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }
  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    // Decodificar el token (sin verificar firma, solo para obtener el payload)
    const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    if (!payload.userId) return res.status(401).json({ error: 'Token inválido' });
    return res.status(200).json({ userId: payload.userId, email: payload.email });
  } catch (e) {
    return res.status(401).json({ error: 'Token inválido' });
  }
}
