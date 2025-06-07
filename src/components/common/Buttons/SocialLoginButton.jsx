import React from "react";
import ButtonSecondary from "./ButtonSecondary";

export const SocialLoginButton = ({ icon, label }) => (
  <div className="flex items-center justify-center">
    <ButtonSecondary className="p-0.5">
      <div className="flex items-center gap-1">
        <img className="h-8 w-8 p-1" src={icon} alt={`${label} icon`} />
        <span className="w-full block text-nowrap">Sign in with {label}</span>
      </div>
    </ButtonSecondary>
  </div>
);
