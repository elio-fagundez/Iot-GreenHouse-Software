import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
const PORT = 3000;

app.use(express.json()); 

app.post('/api/customers', async (req, res) => {
  const { name, country, website, phone, cif, profileImage } = req.body;

  try {
    const newCustomer = await prisma.customer.create({
      data: {
        name,
        country,
        website,
        phone,
        cif,
        profileImage,
      },
    });

    res.status(201).json(newCustomer);
  } catch (error) {
    console.error("Error creating customer:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});