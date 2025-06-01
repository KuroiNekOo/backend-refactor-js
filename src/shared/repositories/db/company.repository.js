import { prisma } from '../../../config/database.js';

async function generateCompanyId() {

  // Générer un uuid random
  const randomId = crypto.randomUUID();

  // Vérifier s'il existe déjà une entreprise avec cet id
  const existingCompany = await prisma.bankAccount.findUnique({
    where: { id: randomId },
  });

  if (existingCompany) {
    return generateCompanyId();
  }

  // Vérifier s'il existe déjà un utilisateur avec cet id
  const existingUser = await prisma.user.findUnique({
    where: { id: randomId },
  });

  if (existingUser) {
    return generateCompanyId();
  }

  return randomId;

}

const CompanyRepository = {

  addPlayerToCompany(
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

  removePlayerFromCompany(
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

  async createCompany(
    { name, ownerId },
  ) {
    // Générer un nouvel id d'entreprise
    const id = await generateCompanyId();

    if (!id) {
      throw new Error('Company ID generation failed');
    }

    const newCompany = await prisma.company.create({
      data: {
        name,
      },
    });

    if (!newCompany) {
      throw new Error('Company creation failed');
    }

    return prisma.userCompany.create({
      data: {
        userId: ownerId,
        companyId: id,
        status: 'OWNER',
      },
    });
  },

  updateCompany(
    { id, name },
  ) {
    return prisma.company.update({
      where: { id },
      data: {
        name,
        updatedAt: new Date(),
      },
    });
  },

  deleteCompany(
    { id },
  ) {
    return prisma.company.update({
      where: { id },
      data: { isActive: false },
    });
  },

};

export default CompanyRepository;

