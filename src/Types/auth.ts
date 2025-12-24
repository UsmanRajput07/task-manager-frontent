export type OrgSignup = {
  organizationName: string;
  adminUser: {
    name: string;
    email: string;
    password: string;
  };
};

export type login = {
  email: string;
  password: string;
};

// export type resendOtp = {
//   phone: string;
// };
