export {};

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      username: string;
      role: "MEMBER" | "MANAGER";
      onboardingComplete?: boolean;
    };
  }
}
