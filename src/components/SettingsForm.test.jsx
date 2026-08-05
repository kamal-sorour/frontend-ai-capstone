import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SettingsForm from "./SettingsForm";

describe("SettingsForm", () => {
  it("displays validation errors when submitting empty fields", async () => {
    render(<SettingsForm />);

    const submitButton = screen.getByRole("button", { name: /save settings/i });
    await userEvent.click(submitButton);

    expect(screen.getByText(/full name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();

    const fullNameInput = screen.getByLabelText(/full name/i);
    const emailInput = screen.getByLabelText(/email/i);

    expect(fullNameInput).toHaveAttribute("aria-invalid", "true");
    expect(emailInput).toHaveAttribute("aria-invalid", "true");
  });
});
