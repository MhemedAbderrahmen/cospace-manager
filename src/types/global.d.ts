export {};

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      username: string;
      role: "member" | "manager";
      onboardingComplete?: boolean;
    };
  }
}
