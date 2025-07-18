import { Check, X } from "lucide-react";

const PasswordCriteria = ({ password }) => {
  const criteria = [
    { label: "At least 6 characters", met: password.length >= 6 },
    { label: "Contains uppercase letter", met: /[A-Z]/.test(password) },
    { label: "Contains lowercase letter", met: /[a-z]/.test(password) },
    { label: "Contains a number", met: /\d/.test(password) },
    { label: "Contains special character", met: /[^A-Za-z0-9]/.test(password) },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-4">
      {criteria.map((item) => (
        <div key={item.label} className="flex items-center text-sm">
          {item.met ? (
            <Check className="size-4 text-green-600 mr-2" />
          ) : (
            <X className="size-4 text-red-300 opacity-60 mr-2" />
          )}
          <span
            className={item.met ? "text-gray-800" : "text-gray-400 opacity-60"}
          >
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

const PasswordStrengthMeter = ({ password }) => {
  const getStrength = (pass) => {
    let strength = 0;
    if (pass.length >= 6) strength++;
    if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) strength++;
    if (/\d/.test(pass)) strength++;
    if (/[^a-zA-Z\d]/.test(pass)) strength++;
    return strength;
  };

  const strength = getStrength(password);

  const getColor = (strength) => {
    if (strength <= 1) return "bg-red-400";
    if (strength === 2) return "bg-yellow-400";
    if (strength === 3) return "bg-green-400";
    return "bg-green-600";
  };

  const getStrengthText = (strength) => {
    if (strength === 0) return "Very Weak";
    if (strength === 1) return "Weak";
    if (strength === 2) return "Fair";
    if (strength === 3) return "Good";
    return "Strong";
  };

  return (
    <div className="mt-4 p-4 rounded-xl shadow-sm border border-purple-300 bg-[#f4f2ff]">
      {/* Strength label */}
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-semibold text-gray-700">
          Password Strength
        </span>
        <span className="text-sm text-gray-600 opacity-80">
          {getStrengthText(strength)}
        </span>
      </div>

      {/* Strength meter bars */}
      <div className="flex space-x-2 mb-4">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className={`h-1 w-full rounded-full transition-colors duration-300 ${
              index < strength ? getColor(strength) : "bg-gray-300 opacity-40"
            }`}
          />
        ))}
      </div>

      {/* Criteria grid */}
      <PasswordCriteria password={password} />
    </div>
  );
};

export default PasswordStrengthMeter;
