# FE-03: AI-Assisted Workflow Drill Comparison

## 1. Correctness & Edge Cases
- **Round 1 (Vague):** The generated form lacked proper regex validation for email and allowed submitting empty strings. There was no loading or error handling state.
- **Round 2 (Precise):** Implemented strict regex validation and prevented submission until fields met criteria. Handled edge cases including empty inputs and loading button states.

## 2. Accessibility (a11y)
- **Round 1:** Missing `aria-invalid` attributes and programmatic associations between inputs and error labels.
- **Round 2:** Fully compliant with `<label htmlFor="...">` and dynamic `aria-describedby` links to error messages.

## 3. Review Effort & Speed
- **Round 1:** Took 10 seconds to prompt, but would require ~45 minutes of manual refactoring and bug fixing to be production-ready.
- **Round 2:** Took 4 minutes to craft the prompt and inspect tests, but yielded a production-ready component with zero manual refactoring needed.

## 4. AI Mistake Caught
- **Caught Error:** During Round 2, the AI initially forgot to disable the submit button while `isLoading` was true. I identified this during review and explicitly instructed the AI to add the `disabled={isLoading}` attribute to prevent duplicate form submissions.