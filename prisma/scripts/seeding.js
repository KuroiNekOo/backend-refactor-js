import { PrismaClient, UserCompanyStatus, TransactionStatus, BankAccountTypes, BankAccountOwnerTypes, ChunkStatus } from '../generated/client/index.js'

const prisma = new PrismaClient()

async function main() {

  console.log('Starting database seeding...');

  // 1. Créer des types de comptes bancaires
  const bankAccountTypeStandard = await prisma.bankAccountType.create({
    data: {
      name: BankAccountTypes.STANDARD,
      limit: 100_000,
      interestRate: 0.05,
    },
  });

  const bankAccountTypePremium = await prisma.bankAccountType.create({
    data: {
      name: BankAccountTypes.PREMIUM,
      limit: 500_000,
      interestRate: 0.1,
    },
  });

  // 2. Créer les comptes bancaires et les transactions
  const bankAccount1 = await prisma.bankAccount.create({
    data: {
      id: 'BA000001',
      balance: 1000,
      isActive: true,
      ownerType: BankAccountOwnerTypes.USER,
      bankAccountTypeId: bankAccountTypeStandard.id,
      isDefault: true,
      transactionsAsReceiver: {
        create: [
          {
            senderId: 'BA000001',
            amount: 100,
            status: TransactionStatus.SUCCESS,
            inProgress: false,
            isActive: true,
          },
          {
            senderId: 'BA000001',
            amount: 200,
            status: TransactionStatus.SUCCESS,
            inProgress: false,
            isActive: true,
          },
        ],
      },
      transactionsAsSender: {
        create: [
          {
            receiverId: 'BA000001',
            amount: 50,
            status: TransactionStatus.SUCCESS,
            inProgress: false,
            isActive: true,
          },
          {
            receiverId: 'BA000001',
            amount: 100,
            status: TransactionStatus.SUCCESS,
            inProgress: false,
            isActive: true,
          },
        ],
      },
    },
  });

  const bankAccount2 = await prisma.bankAccount.create({
    data: {
      id: 'BA00A2B3',
      balance: 1000,
      isActive: true,
      ownerType: BankAccountOwnerTypes.USER,
      bankAccountTypeId: bankAccountTypeStandard.id,
      isDefault: true,
      transactionsAsReceiver: {
        create: [
          {
            senderId: 'BA00A2B3',
            amount: 100,
            status: TransactionStatus.SUCCESS,
            inProgress: false,
            isActive: true,
          },
          {
            senderId: 'BA000001',
            amount: 200,
            status: TransactionStatus.SUCCESS,
            inProgress: false,
            isActive: true,
          },
        ],
      },
      transactionsAsSender: {
        create: [
          {
            receiverId: 'BA00A2B3',
            amount: 50,
            status: TransactionStatus.SUCCESS,
            inProgress: false,
            isActive: true,
          },
          {
            receiverId: 'BA000001',
            amount: 100,
            status: TransactionStatus.SUCCESS,
            inProgress: false,
            isActive: true,
          },
        ],
      },
    },
  });

  const bankAccount3 = await prisma.bankAccount.create({
    data: {
      id: 'BA01F9C4',
      balance: 1000,
      isActive: true,
      ownerType: BankAccountOwnerTypes.USER,
      bankAccountTypeId: bankAccountTypeStandard.id,
      isDefault: true,
      transactionsAsReceiver: {
        create: [
          {
            senderId: 'BA00A2B3',
            amount: 100,
            status: TransactionStatus.SUCCESS,
            inProgress: false,
            isActive: true,
          },
          {
            senderId: 'BA01F9C4',
            amount: 200,
            status: TransactionStatus.SUCCESS,
            inProgress: false,
            isActive: true,
          },
        ],
      },
      transactionsAsSender: {
        create: [
          {
            receiverId: 'BA00A2B3',
            amount: 50,
            status: TransactionStatus.SUCCESS,
            inProgress: false,
            isActive: true,
          },
          {
            receiverId: 'BA01F9C4',
            amount: 100,
            status: TransactionStatus.SUCCESS,
            inProgress: false,
            isActive: true,
          },
        ],
      },
    },
  });

  const bankAccount4 = await prisma.bankAccount.create({
    data: {
      id: 'BA03D5E6',
      balance: 1000,
      isActive: true,
      ownerType: BankAccountOwnerTypes.USER,
      bankAccountTypeId: bankAccountTypeStandard.id,
      isDefault: true,
      transactionsAsReceiver: {
        create: [
          {
            senderId: 'BA00A2B3',
            amount: 100,
            status: TransactionStatus.SUCCESS,
            inProgress: false,
            isActive: true,
          },
          {
            senderId: 'BA01F9C4',
            amount: 200,
            status: TransactionStatus.SUCCESS,
            inProgress: false,
            isActive: true,
          },
        ],
      },
      transactionsAsSender: {
        create: [
          {
            receiverId: 'BA00A2B3',
            amount: 50,
            status: TransactionStatus.SUCCESS,
            inProgress: false,
            isActive: true,
          },
          {
            receiverId: 'BA01F9C4',
            amount: 100,
            status: TransactionStatus.SUCCESS,
            inProgress: false,
            isActive: true,
          },
        ],
      },
    },
  });

  const bankAccount5 = await prisma.bankAccount.create({
    data: {
      id: 'BA0456F7',
      balance: 1000,
      isActive: true,
      ownerType: BankAccountOwnerTypes.USER,
      bankAccountTypeId: bankAccountTypeStandard.id,
      isDefault: true,
      transactionsAsReceiver: {
        create: [
          {
            senderId: 'BA00A2B3',
            amount: 100,
            status: TransactionStatus.SUCCESS,
            inProgress: false,
            isActive: true,
          },
          {
            senderId: 'BA01F9C4',
            amount: 200,
            status: TransactionStatus.SUCCESS,
            inProgress: false,
            isActive: true,
          },
        ],
      },
      transactionsAsSender: {
        create: [
          {
            receiverId: 'BA00A2B3',
            amount: 50,
            status: TransactionStatus.SUCCESS,
            inProgress: false,
            isActive: true,
          },
          {
            receiverId: 'BA01F9C4',
            amount: 100,
            status: TransactionStatus.SUCCESS,
            inProgress: false,
            isActive: true,
          },
        ],
      },
    },
  });

  const bankAccount6 = await prisma.bankAccount.create({
    data: {
      id: 'BA07B8A9',
      balance: 1000,
      isActive: true,
      ownerType: BankAccountOwnerTypes.USER,
      bankAccountTypeId: bankAccountTypeStandard.id,
      isDefault: true,
      transactionsAsReceiver: {
        create: [
          {
            senderId: 'BA00A2B3',
            amount: 100,
            status: TransactionStatus.SUCCESS,
            inProgress: false,
            isActive: true,
          },
          {
            senderId: 'BA01F9C4',
            amount: 200,
            status: TransactionStatus.SUCCESS,
            inProgress: false,
            isActive: true,
          },
        ],
      },
      transactionsAsSender: {
        create: [
          {
            receiverId: 'BA00A2B3',
            amount: 50,
            status: TransactionStatus.SUCCESS,
            inProgress: false,
            isActive: true,
          },
          {
            receiverId: 'BA01F9C4',
            amount: 100,
            status: TransactionStatus.SUCCESS,
            inProgress: false,
            isActive: true,
          },
        ],
      },
    },
  });

  const bankAccount7 = await prisma.bankAccount.create({
    data: {
      id: 'BA09CDEF',
      balance: 1000,
      isActive: true,
      ownerType: BankAccountOwnerTypes.COMPANY,
      bankAccountTypeId: bankAccountTypePremium.id,
      isDefault: true,
      transactionsAsReceiver: {
        create: [
          {
            senderId: 'BA00A2B3',
            amount: 100,
            status: TransactionStatus.SUCCESS,
            inProgress: false,
            isActive: true,
          },
          {
            senderId: 'BA01F9C4',
            amount: 200,
            status: TransactionStatus.SUCCESS,
            inProgress: false,
            isActive: true,
          },
        ],
      },
      transactionsAsSender: {
        create: [
          {
            receiverId: 'BA00A2B3',
            amount: 50,
            status: TransactionStatus.SUCCESS,
            inProgress: false,
            isActive: true,
          },
          {
            receiverId: 'BA01F9C4',
            amount: 100,
            status: TransactionStatus.SUCCESS,
            inProgress: false,
            isActive: true,
          },
        ],
      },
    },
  });

  const bankAccount8 = await prisma.bankAccount.create({
    data: {
      id: 'BA0AB012',
      balance: 1000,
      isActive: true,
      ownerType: BankAccountOwnerTypes.COMPANY,
      bankAccountTypeId: bankAccountTypePremium.id,
      isDefault: true,
      transactionsAsReceiver: {
        create: [
          {
            senderId: 'BA00A2B3',
            amount: 100,
            status: TransactionStatus.SUCCESS,
            inProgress: false,
            isActive: true,
          },
          {
            senderId: 'BA01F9C4',
            amount: 200,
            status: TransactionStatus.SUCCESS,
            inProgress: false,
            isActive: true,
          },
        ],
      },
      transactionsAsSender: {
        create: [
          {
            receiverId: 'BA00A2B3',
            amount: 50,
            status: TransactionStatus.SUCCESS,
            inProgress: false,
            isActive: true,
          },
          {
            receiverId: 'BA01F9C4',
            amount: 100,
            status: TransactionStatus.SUCCESS,
            inProgress: false,
            isActive: true,
          },
        ],
      },
    },
  });

  const bankAccount9 = await prisma.bankAccount.create({
    data: {
      id: 'BA0FC3D4',
      balance: 1000,
      isActive: true,
      ownerType: BankAccountOwnerTypes.COMPANY,
      bankAccountTypeId: bankAccountTypePremium.id,
      isDefault: true,
      transactionsAsReceiver: {
        create: [
          {
            senderId: 'BA00A2B3',
            amount: 100,
            status: TransactionStatus.SUCCESS,
            inProgress: false,
            isActive: true,
          },
          {
            senderId: 'BA01F9C4',
            amount: 200,
            status: TransactionStatus.SUCCESS,
            inProgress: false,
            isActive: true,
          },
        ],
      },
      transactionsAsSender: {
        create: [
          {
            receiverId: 'BA00A2B3',
            amount: 50,
            status: TransactionStatus.SUCCESS,
            inProgress: false,
            isActive: true,
          },
          {
            receiverId: 'BA01F9C4',
            amount: 100,
            status: TransactionStatus.SUCCESS,
            inProgress: false,
            isActive: true,
          },
        ],
      },
    },
  });

  const bankAccount10 = await prisma.bankAccount.create({
    data: {
      id: 'BA03D5C9',
      balance: 1000,
      isActive: true,
      ownerType: BankAccountOwnerTypes.USER,
      bankAccountTypeId: bankAccountTypeStandard.id,
      isDefault: true,
      transactionsAsReceiver: {
        create: [
          {
            senderId: 'BA00A2B3',
            amount: 100,
            status: TransactionStatus.SUCCESS,
            inProgress: false,
            isActive: true,
          },
          {
            senderId: 'BA01F9C4',
            amount: 200,
            status: TransactionStatus.SUCCESS,
            inProgress: false,
            isActive: true,
          },
        ],
      },
      transactionsAsSender: {
        create: [
          {
            receiverId: 'BA00A2B3',
            amount: 50,
            status: TransactionStatus.SUCCESS,
            inProgress: false,
            isActive: true,
          },
          {
            receiverId: 'BA01F9C4',
            amount: 100,
            status: TransactionStatus.SUCCESS,
            inProgress: false,
            isActive: true,
          },
        ],
      },
    },
  });

  const bankAccount11 = await prisma.bankAccount.create({
    data: {
      id: 'BA03D5F9',
      balance: 1000,
      isActive: true,
      ownerType: BankAccountOwnerTypes.USER,
      bankAccountTypeId: bankAccountTypeStandard.id,
      isDefault: true,
      transactionsAsReceiver: {
        create: [
          {
            senderId: 'BA00A2B3',
            amount: 100,
            status: TransactionStatus.SUCCESS,
            inProgress: false,
            isActive: true,
          },
          {
            senderId: 'BA01F9C4',
            amount: 200,
            status: TransactionStatus.SUCCESS,
            inProgress: false,
            isActive: true,
          },
        ],
      },
      transactionsAsSender: {
        create: [
          {
            receiverId: 'BA00A2B3',
            amount: 50,
            status: TransactionStatus.SUCCESS,
            inProgress: false,
            isActive: true,
          },
          {
            receiverId: 'BA01F9C4',
            amount: 100,
            status: TransactionStatus.SUCCESS,
            inProgress: false,
            isActive: true,
          },
        ],
      },
    },
  });

  // 3. Créer les rôles et permissions
  const roleAdmin = await prisma.role.create({
    data: {
      name: 'Admin',
      isActive: true,
    },
  });

  const roleUser = await prisma.role.create({
    data: {
      name: 'User',
      isActive: true,
    },
  });

  const roleCompany = await prisma.role.create({
    data: {
      name: 'Company',
      isActive: true,
    },
  });

  const permissionRead = await prisma.permission.create({
    data: {
      name: 'READ',
      isActive: true,
    },
  });

  const permissionWrite = await prisma.permission.create({
    data: {
      name: 'WRITE',
      isActive: true,
    },
  });

  const permissionDelete = await prisma.permission.create({
    data: {
      name: 'DELETE',
      isActive: true,
    },
  });

  const permissionUpdate = await prisma.permission.create({
    data: {
      name: 'UPDATE',
      isActive: true,
    },
  });

  const permissionCreate = await prisma.permission.create({
    data: {
      name: 'CREATE',
      isActive: true,
    },
  });

  const permissionTransfer = await prisma.permission.create({
    data: {
      name: 'TRANSFER',
      isActive: true,
    },
  });

  // 4. Associer les permissions aux rôles
  await prisma.rolePermission.createMany({
    data: [
      { roleId: roleAdmin.id, permissionId: permissionRead.id, isActive: true },
      { roleId: roleUser.id, permissionId: permissionWrite.id, isActive: true },
      { roleId: roleCompany.id, permissionId: permissionDelete.id, isActive: true },
    ],
  });

  // 5. Créer les entreprises
  const company1 = await prisma.company.create({
    data: {
      name: 'Company 1',
      isActive: true,
      bankAccounts: {
        connect: { id: bankAccount7.id },
      },
    },
  });

  const company2 = await prisma.company.create({
    data: {
      name: 'Company 2',
      isActive: true,
      bankAccounts: {
        connect: { id: bankAccount8.id },
      },
    },
  });

  const company3 = await prisma.company.create({
    data: {
      name: 'Company 3',
      isActive: true,
      bankAccounts: {
        connect: { id: bankAccount9.id },
      },
    },
  });

  const company4 = await prisma.company.create({
    data: {
      name: 'Company 4',
      isActive: true,
      bankAccounts: {
        connect: { id: bankAccount11.id },
      },
    },
  });

  // 6. Créer les utilisateurs
  const user1 = await prisma.user.create({
    data: {
      id: 'e6bd3f00-6a2a-4141-a71a-4abe95fba7c3',
      name: 'fuzeblocks',
      password: 'password',
      isActive: true,
      bankAccounts: {
        connect: { id: bankAccount1.id },
      },
      userCompanies: {
        create: {
          companyId: company1.id,
          status: UserCompanyStatus.OWNER,
          isActive: true,
        },
      },
      userRoles: {
        create: {
          roleId: roleCompany.id,
          isActive: true,
        },
      },
      userPermissions: {
        create: {
          permissionId: permissionWrite.id,
          isActive: true,
        },
      },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      id: 'd455b3a1-bb8d-4979-bb79-d60bab0278c4',
      name: 'Audin200',
      password: 'password',
      isActive: true,
      bankAccounts: {
        connect: { id: bankAccount2.id },
      },
      userCompanies: {
        create: {
          companyId: company2.id,
          status: UserCompanyStatus.OWNER,
          isActive: true,
        },
      },
      userRoles: {
        create: {
          roleId: roleAdmin.id,
          isActive: true,
        },
      },
      userPermissions: {
        create: {
          permissionId: permissionUpdate.id,
          isActive: true,
        },
      },
    },
  });

  const user3 = await prisma.user.create({
    data: {
      id: '1d6378f5-937a-40a1-8ce9-6bbcb9e14b7b',
      name: '__Hoxys__',
      password: 'password',
      isActive: true,
      bankAccounts: {
        connect: { id: bankAccount3.id },
      },
      userCompanies: {
        create: {
          companyId: company1.id,
          status: UserCompanyStatus.EMPLOYEE,
          isActive: true,
        },
      },
      userRoles: {
        create: {
          roleId: roleCompany.id,
          isActive: true,
        },
      },
      userPermissions: {
        create: {
          permissionId: permissionRead.id,
          isActive: true,
        },
      },
    },
  });

  const user4 = await prisma.user.create({
    data: {
      id: '64a9cbf6-c478-49fb-aee2-67a721630f37',
      name: 'Ethokia',
      password: 'password',
      isActive: true,
      bankAccounts: {
        connect: { id: bankAccount4.id },
      },
      userCompanies: {
        create: {
          companyId: company3.id,
          status: UserCompanyStatus.OWNER,
          isActive: true,
        },
      },
      userRoles: {
        create: {
          roleId: roleAdmin.id,
          isActive: true,
        },
      },
      userPermissions: {
        create: {
          permissionId: permissionCreate.id,
          isActive: true,
        },
      },
    },
  });

  const user5 = await prisma.user.create({
    data: {
      id: 'd89a930b-d54d-44f1-9150-1e2613222e66',
      name: 'flo67',
      password: 'password',
      isActive: true,
      bankAccounts: {
        connect: { id: bankAccount5.id },
      },
      userCompanies: {
        create: {
          companyId: company2.id,
          status: UserCompanyStatus.EMPLOYEE,
          isActive: true,
        },
      },
      userRoles: {
        create: {
          roleId: roleUser.id,
          isActive: true,
        },
      },
      userPermissions: {
        create: {
          permissionId: permissionDelete.id,
          isActive: true,
        },
      },
    },
  });

  const user6 = await prisma.user.create({
    data: {
      id: '7dced56c-2123-4b81-bccb-e9706d287e4a',
      name: 'Mr_Volty',
      password: 'password',
      isActive: true,
      bankAccounts: {
        connect: { id: bankAccount6.id },
      },
      userCompanies: {
        create: {
          companyId: company3.id,
          status: UserCompanyStatus.EMPLOYEE,
          isActive: true,
        },
      },
      userRoles: {
        create: {
          roleId: roleUser.id,
          isActive: true,
        },
      },
      userPermissions: {
        create: {
          permissionId: permissionTransfer.id,
          isActive: true,
        },
      },
    },
  });

  const user7 = await prisma.user.create({
    data: {
      id: 'b91740dd-e9a0-4ab0-bfd8-b2948c2f6538',
      name: 'Hyloxor',
      password: 'password',
      isActive: true,
      bankAccounts: {
        connect: { id: bankAccount10.id },
      },
      userCompanies: {
        create: {
          companyId: company4.id,
          status: UserCompanyStatus.OWNER,
          isActive: true,
        },
      },
      userRoles: {
        create: {
          roleId: roleCompany.id,
          isActive: true,
        },
      },
      userPermissions: {
        create: {
          permissionId: permissionWrite.id,
          isActive: true,
        },
      },
    },
  });

  // 7. Créer les drives
  const drive1 = await prisma.drive.create({
    data: {
      name: 'Drive 1',
      isActive: true,
      drivePurchases: {
        create: [
          {
            userId: user1.id,
            content: JSON.stringify({ text: 'Hello World!' }),
            isActive: true,
          },
          {
            userId: user2.id,
            content: JSON.stringify({ text: 'Hello World!' }),
            isActive: true,
          },
        ],
      },
    },
  });

  const drive2 = await prisma.drive.create({
    data: {
      name: 'Drive 2',
      isActive: true,
      drivePurchases: {
        create: [
          {
            userId: user3.id,
            content: JSON.stringify({ text: 'Hello World!' }),
            isActive: true,
          },
          {
            userId: user4.id,
            content: JSON.stringify({ text: 'Hello World!' }),
            isActive: true,
          },
        ],
      },
    },
  });

  const drive3 = await prisma.drive.create({
    data: {
      name: 'Drive 3',
      isActive: true,
      drivePurchases: {
        create: [
          {
            userId: user5.id,
            content: JSON.stringify({ text: 'Hello World!' }),
            isActive: true,
          },
          {
            userId: user6.id,
            content: JSON.stringify({ text: 'Hello World!' }),
            isActive: true,
          },
        ],
      },
    },
  });

  const drive4 = await prisma.drive.create({
    data: {
      name: 'Drive 4',
      isActive: true,
      drivePurchases: {
        create: [
          {
            userId: user7.id,
            content: JSON.stringify({ text: 'Hello World!' }),
            isActive: true,
          },
        ],
      },
    },
  });

  // 8. Créer les conteneurs
  const container1 = await prisma.container.create({
    data: {
      name: 'Container 1',
      isActive: true,
      content: {
        create: {
            companyId: company1.id,
            content: JSON.stringify({ text: 'Hello World!' }),
            isActive: true,
        },
      },
      containerHistories: {
        create: [
          {
            companyId: company1.id,
            content: JSON.stringify({ text: 'Hello World!' }),
            isActive: true,
          },
        ],
      },
    },
  });

  const container2 = await prisma.container.create({
    data: {
      name: 'Container 2',
      isActive: true,
      content: {
        create: {
            companyId: company2.id,
            content: JSON.stringify({ text: 'Hello World!' }),
            isActive: true,
        },
      },
      containerHistories: {
        create: [
          {
            companyId: company2.id,
            content: JSON.stringify({ text: 'Hello World!' }),
            isActive: true,
          },
        ],
      },
    },
  });

  const container3 = await prisma.container.create({
    data: {
      name: 'Container 3',
      isActive: true,
      content: {
        create: {
            companyId: company3.id,
            content: JSON.stringify({ text: 'Hello World!' }),
            isActive: true,
        },
      },
      containerHistories: {
        create: [
          {
            companyId: company3.id,
            content: JSON.stringify({ text: 'Hello World!' }),
            isActive: true,
          },
        ],
      },
    },
  });

  // 9. Créer les items / blocs
  const block1 = await prisma.itemBlock.create({
    data: {
      minecraftId: 'minecraft:dirt',
      content: JSON.stringify({ name: 'dirt' }),
      isInDrive: true,
      isActive: true,
      marketPrices: {
        create: {
          price: 10,
          isActive: true,
          marketPriceHistories: {
            create: [
              {
                price: 6,
                isActive: true,
              },
              {
                price: 5,
                isActive: true,
              },
              {
                price: 8,
                isActive: true,
              },
            ],
          },
        }
      },
    },
  });

  const block2 = await prisma.itemBlock.create({
    data: {
      minecraftId: 'minecraft:stone',
      content: JSON.stringify({ name: 'stone' }),
      isInDrive: true,
      isActive: true,
      marketPrices: {
        create: {
          price: 10,
          isActive: true,
          marketPriceHistories: {
            create: [
              {
                price: 6,
                isActive: true,
              },
              {
                price: 5,
                isActive: true,
              },
              {
                price: 8,
                isActive: true,
              },
            ],
          },
        }
      },
    },
  });

  const block3 = await prisma.itemBlock.create({
    data: {
      minecraftId: 'minecraft:cobblestone',
      content: JSON.stringify({ name: 'cobblestone' }),
      isInDrive: false,
      isActive: true,
      marketPrices: {
        create: {
          price: 10,
          isActive: true,
          marketPriceHistories: {
            create: [
              {
                price: 6,
                isActive: true,
              },
              {
                price: 5,
                isActive: true,
              },
              {
                price: 8,
                isActive: true,
              },
            ],
          },
        }
      },
    },
  });

  const block4 = await prisma.itemBlock.create({
    data: {
      minecraftId: 'minecraft:gravel',
      content: JSON.stringify({ name: 'gravel' }),
      isInDrive: false,
      isActive: true,
      marketPrices: {
        create: {
          price: 10,
          isActive: true,
          marketPriceHistories: {
            create: [
              {
                price: 6,
                isActive: true,
              },
              {
                price: 5,
                isActive: true,
              },
              {
                price: 8,
                isActive: true,
              },
            ],
          },
        }
      },
    },
  });

  // 9.5 Creer les items dans les achats de drives
  await prisma.drivePurchaseItemBlock.createMany({
    data: [
      { drivePurchaseId: 1, itemBlockId: block1.id, quantity: 10, isActive: true },
      { drivePurchaseId: 1, itemBlockId: block2.id, quantity: 10, isActive: true },
      { drivePurchaseId: 2, itemBlockId: block2.id, quantity: 20, isActive: true },
      { drivePurchaseId: 2, itemBlockId: block3.id, quantity: 10, isActive: true },
      { drivePurchaseId: 3, itemBlockId: block3.id, quantity: 30, isActive: true },
      { drivePurchaseId: 3, itemBlockId: block4.id, quantity: 10, isActive: true },
    ],
  });

  // 10. Créer les paramètres des prix
  await prisma.settingsPrice.create({
    data: {
      id: 'ENCHANTING_PRICE',
      value: 50,
      description: 'Taxe pour un item enchanté',
      isActive: true,
    },
  });

  // 11. Créer les mondes
  await prisma.world.createMany({
    data: [
      { name: 'world', isActive: true },
      { name: 'world_nether', isActive: true },
      { name: 'world_the_end', isActive: true },
    ],
  });


  // 12. Créer les chunks
  await prisma.chunk.createMany({
    data: [
      { x: 8, z: 0, xPrime: 8, zPrime: 0, worldId: 1, status: ChunkStatus.SOLD, isActive: true }, // 1 seul chunk
      { x: 9, z: 0, xPrime: 9, zPrime: 0, worldId: 1, status: ChunkStatus.ON_SALE, isActive: true }, // 1 seul chunk
      { x: 5, z: 0, xPrime: 6, zPrime: 1, worldId: 1, status: ChunkStatus.ON_SALE, isActive: true }, // 4 chunks
      { x: 1, z: 0, xPrime: 3, zPrime: 2, worldId: 1, status: ChunkStatus.EXPIRED, isActive: true }, // 9 chunks

      { x: 8, z: 0, xPrime: 8, zPrime: 0, worldId: 2, status: ChunkStatus.SOLD, isActive: true }, // 1 seul chunk
      { x: 9, z: 0, xPrime: 9, zPrime: 0, worldId: 2, status: ChunkStatus.ON_SALE, isActive: true }, // 1 seul chunk
      { x: 5, z: 0, xPrime: 6, zPrime: 1, worldId: 2, status: ChunkStatus.ON_SALE, isActive: true }, // 4 chunks
      { x: 1, z: 0, xPrime: 3, zPrime: 2, worldId: 2, status: ChunkStatus.EXPIRED, isActive: true }, // 9 chunks

      { x: 8, z: 0, xPrime: 8, zPrime: 0, worldId: 3, status: ChunkStatus.SOLD, isActive: true }, // 1 seul chunk
      { x: 9, z: 0, xPrime: 9, zPrime: 0, worldId: 3, status: ChunkStatus.ON_SALE, isActive: true }, // 1 seul chunk
      { x: 5, z: 0, xPrime: 6, zPrime: 1, worldId: 3, status: ChunkStatus.ON_SALE, isActive: true }, // 4 chunks
      { x: 1, z: 0, xPrime: 3, zPrime: 2, worldId: 3, status: ChunkStatus.EXPIRED, isActive: true }, // 9 chunks
    ],
  });

  // 13. Créer des chenks vendus
  await prisma.chunkSold.createMany({
    data: [
      { chunkId: 1, companyId: company1.id, price: 10_000, isActive: true },
      { chunkId: 5, companyId: company1.id, price: 10_000, isActive: true },
      { chunkId: 9, companyId: company1.id, price: 10_000, isActive: true },
    ],
  });

}

main()
  .then(async () => {
    console.log('Database seeding completed successfully!');
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })