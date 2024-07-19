const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {

    // Create a new greenhouse
    const greenhouse= await prisma.greenhouse.create({
        data: {
            name: 'Title 1',
            country: 'Country Name', 
            website: 'https://example.com', 
            phone: '1234567890', 
            cif: 'CIF123456', 
            profileImage: 'https://example.com/image.jpg', 
        }
    })
    console.log("Created a new greenhouse",greenhouse );

}


main()
.catch(e => {
    throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })