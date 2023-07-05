export const basePayUrl = (env: string | undefined) => {
  switch (env) {
    case 'stag':
      return 'https://pay.quickcan.cn';
    default:
      return 'https://pay.kkmh.com';
  }
};

export const baseSocialUrl = (env: string | undefined) => {
  switch (env) {
    case 'stag':
      return 'https://social.quickcan.cn';
    default:
      return 'https://social.kkmh.com';
  }
};
