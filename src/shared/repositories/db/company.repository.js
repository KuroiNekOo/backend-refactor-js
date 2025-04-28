import { prisma } from '../../../config/database.js';

const CompanyRepository = {

  async addPlayerToCompany(
    { userId, companyId, status },
  ) {
    return prisma.userCompany.create({
      data: {
        userId,
        companyId,
        status,
      },
    });
  },

  async removePlayerFromCompany(
    { userId, companyId },
  ) {
    return prisma.userCompany.delete({
      where: {
        userId_companyId: {
          userId,
          companyId,
        },
      },
    });
  },

};

export default CompanyRepository;

