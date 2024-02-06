import { ApplicationVerifier, ConfirmationResult } from "firebase/auth";

declare global {
  interface Window {
    recaptchaVerifier: ApplicationVerifier;
    confirmationResult: ConfirmationResult;
  }
}

export {};
