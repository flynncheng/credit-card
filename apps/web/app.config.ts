export const appConfig = {
  client: {
    name: process.env.NEXT_PUBLIC_CLIENT_NAME,
    email: process.env.NEXT_PUBLIC_CLIENT_EMAIL,
  },

  provider: {
    kyc: process.env.NEXT_PUBLIC_KYC_PROVIDER,
    card: process.env.NEXT_PUBLIC_CARD_PROVIDER,
  },

  api: {
    user: process.env.NEXT_PUBLIC_HOST_USER,
    card: process.env.NEXT_PUBLIC_HOST_CARD,
    txn: process.env.NEXT_PUBLIC_HOST_TXN,
    webhook: process.env.NEXT_PUBLIC_HOST_WEBHOOK,
  },
  app: {
    monthlyLimit: Number(process.env.NEXT_PUBLIC_MONTHLY_LIMIT),
    topupMin: Number(process.env.NEXT_PUBLIC_TOPUP_MIN),
    topupFee: Number(process.env.NEXT_PUBLIC_TOPUP_FEE),
  },
};
