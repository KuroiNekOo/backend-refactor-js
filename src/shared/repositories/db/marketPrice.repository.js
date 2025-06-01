import { prisma } from '../../../config/database.js';

const marketPriceRepository = {

  async setPriceFluctuation({ itemBlockId, price }) {

    // Récupérer l'itemBlock
    const itemBlock = await prisma.itemBlock.findUnique({
      where: { id: itemBlockId },
      include: {
        marketPrices: true,
      },
    });

    if (!itemBlock) {
      throw new Error('ItemBlock not found');
    }

    // Mettre à jour le prix de l'itemBlock
    return prisma.marketPrice.update({
      where: { itemBlockId },
      data: {
        price,
        updatedAt: new Date(),
        marketPriceHistories: {
          create: {
            price: itemBlock.marketPrices.price,
          },
        },
      },
    });

  },

};

export default marketPriceRepository;

