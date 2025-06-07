import React from "react";
import "../../../styles/checkbox.css";
import { Check } from "lucide-react";

const Checkbox = ({ label, id, name, register }) => (
  <div className="flex items-center gap-1">
    <label htmlFor={id} className="checkbox-wrapper">
      <input type="checkbox" id={id} {...(register ? register(name) : {})} />
      <span className="checkbox-custom">
        <Check size={20} className="checkmark text-white" />
      </span>
    </label>
    <span id={id} className="text-sm text-gray-500 text-nowrap">
      {label}
    </span>
  </div>
);

export default Checkbox;
