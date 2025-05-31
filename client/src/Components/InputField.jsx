// InputField.jsx
import React from "react";
import { AlertCircle, Eye, EyeOff } from "lucide-react";

const InputField = ({
  icon: Icon,
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  togglePassword, // Optional: for password toggling
  showPassword,
  ...props
}) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <div className="relative">
      {Icon && (
        <Icon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
          error ? "border-red-500" : "border-gray-200"
        } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
        {...props}
      />
      {name === "password" && togglePassword && (
        <button
          type="button"
          onClick={togglePassword}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      )}
    </div>
    {error && (
      <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
        <AlertCircle size={14} />
        <span>{error}</span>
      </div>
    )}
  </div>
);

export default React.memo(InputField);
