import { prisma } from '../../../config/database.js';

const marketPriceRepository = {

  async setPriceFluctuation({ itemBlockId, price }) {

    // Récupérer l'itemBlock
    const itemBlock = await prisma.itemBlock.findUnique({
      where: { id: itemBlockId },
    });

    if (!itemBlock) {
      throw new Error('ItemBlock not found');
    }

    // Mettre à jour le prix de l'itemBlock
    return prisma.marketPrice.update({
      where: { itemBlockId },
      data: {
        price,
        marketPriceHistories: {
          create: {
            price: itemBlock.price,
          },
        },
      },
    });

  },

};

export default marketPriceRepository;

