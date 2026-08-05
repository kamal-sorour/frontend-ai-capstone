import { useState } from "react";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SettingsForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const validate = () => {
    const validationErrors = {};

    if (!fullName.trim()) {
      validationErrors.fullName = "Full Name is required.";
    }

    if (!email.trim()) {
      validationErrors.email = "Email is required.";
    } else if (!emailPattern.test(email.trim())) {
      validationErrors.email = "Please enter a valid email address.";
    }

    return validationErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: "", message: "" });

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setStatus({ type: "success", message: "Settings saved successfully." });
      setErrors({});
    } catch (error) {
      setStatus({ type: "error", message: "Unable to save settings. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="max-w-xl mx-auto bg-white shadow-sm rounded-xl p-6 space-y-6"
    >
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">User Settings</h2>
        <p className="mt-2 text-sm text-slate-600">
          Update your profile information and save your preferences.
        </p>
      </div>

      {status.message ? (
        <div
          role="status"
          aria-live="polite"
          className={`rounded-md px-4 py-3 text-sm ${
            status.type === "success"
              ? "bg-emerald-50 text-emerald-800"
              : "bg-red-50 text-red-800"
          }`}
        >
          {status.message}
        </div>
      ) : null}

      <div className="space-y-1">
        <label htmlFor="fullName" className="block text-sm font-medium text-slate-700">
          Full Name
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          aria-invalid={errors.fullName ? "true" : "false"}
          aria-describedby={errors.fullName ? "fullName-error" : undefined}
          className={`mt-1 block w-full rounded-xl border px-4 py-3 text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-400 ${
            errors.fullName ? "border-red-300 bg-red-50" : "border-slate-200 bg-white"
          }`}
        />
        {errors.fullName ? (
          <p id="fullName-error" role="alert" className="text-sm text-red-600">
            {errors.fullName}
          </p>
        ) : null}
      </div>

      <div className="space-y-1">
        <label htmlFor="email" className="block text-sm font-medium text-slate-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          aria-invalid={errors.email ? "true" : "false"}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={`mt-1 block w-full rounded-xl border px-4 py-3 text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-400 ${
            errors.email ? "border-red-300 bg-red-50" : "border-slate-200 bg-white"
          }`}
        />
        {errors.email ? (
          <p id="email-error" role="alert" className="text-sm text-red-600">
            {errors.email}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
      >
        {isSubmitting ? "Saving..." : "Save Settings"}
      </button>
    </form>
  );
}
