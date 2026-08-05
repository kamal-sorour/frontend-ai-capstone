import { useState } from 'react';

export default function SettingsForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    notifications: true,
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Saved settings:', formData);
    alert('Settings saved successfully.');
  };

  return (
    <section className="settings-form">
      <h2>User Settings</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
        </label>

        <label htmlFor="email">
          Email
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
          />
        </label>

        <label htmlFor="notifications">
          <input
            id="notifications"
            name="notifications"
            type="checkbox"
            checked={formData.notifications}
            onChange={handleChange}
          />
          Enable notifications
        </label>

        <button type="submit">Save Settings</button>
      </form>
    </section>
  );
}
