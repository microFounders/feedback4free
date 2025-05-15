# React Feedback Component

A reusable React component for collecting user feedback and sending it to Slack or a custom webhook.

## Installation

```bash
npm install react-feedback-component
# or
yarn add react-feedback-component
```

## Usage

### Basic Usage with Slack

```tsx
import { FeedbackComponent } from "react-feedback-component";

function App() {
  return (
    <FeedbackComponent slackWebhookUrl="https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK" />
  );
}
```

### Advanced Usage with Custom Styling

```tsx
import { FeedbackComponent } from "react-feedback-component";

function App() {
  return (
    <FeedbackComponent
      slackWebhookUrl="https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK"
      position="bottom-right"
      color="secondary"
      icon="help"
      animate={true}
      size="lg"
      label="Help & Feedback"
      showLabel={true}
      rounded="md"
    />
  );
}
```

### Using with a Custom Webhook

```tsx
import { FeedbackButton } from "react-feedback-component";

function App() {
  return (
    <FeedbackButton
      webhookUrl="https://your-api.example.com/feedback"
      integrationType="webhook"
      position="top-right"
      color="outline"
      icon="flag"
    />
  );
}
```

### Pre-filling User Email

```tsx
import { FeedbackComponent } from "react-feedback-component";

function App() {
  // Get user email from your auth system
  const userEmail = "user@example.com";

  return (
    <FeedbackComponent
      slackWebhookUrl="https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK"
      userEmail={userEmail}
    />
  );
}
```

## Props

| Prop              | Type                                                                                    | Default          | Description                                                                                       |
| ----------------- | --------------------------------------------------------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------- |
| `slackWebhookUrl` | `string`                                                                                | `""`             | Your Slack webhook URL to receive feedback                                                        |
| `webhookUrl`      | `string`                                                                                | `""`             | Alternative webhook URL for receiving feedback in other platforms                                 |
| `position`        | `"bottom-right"` \| `"bottom-left"` \| `"top-right"` \| `"top-left"`                    | `"bottom-right"` | Position of the feedback button                                                                   |
| `color`           | `"default"` \| `"secondary"` \| `"destructive"` \| `"outline"` \| `"ghost"` \| `"link"` | `"default"`      | Color variant of the button                                                                       |
| `icon`            | `"message"` \| `"help"` \| `"flag"` \| `"alert"` \| `"info"`                            | `"message"`      | Icon to display in the button                                                                     |
| `animate`         | `boolean`                                                                               | `false`          | Whether to animate the button with a pulse effect                                                 |
| `size`            | `"sm"` \| `"default"` \| `"lg"`                                                         | `"default"`      | Size of the button                                                                                |
| `label`           | `string`                                                                                | `"Feedback"`     | Text label for the button                                                                         |
| `showLabel`       | `boolean`                                                                               | `false`          | Whether to display the text label on the button                                                   |
| `rounded`         | `"full"` \| `"md"`                                                                      | `"full"`         | Corner rounding of the button                                                                     |
| `userEmail`       | `string`                                                                                | `undefined`      | Email address of the user to pre-fill the email field in the feedback form                        |
| `integrationType` | `"slack"` \| `"webhook"`                                                                | `"slack"`        | Type of integration to use. Use "slack" for Slack webhooks and "webhook" for custom API endpoints |

## Component Architecture

The React Feedback Component consists of several parts:

1. **FeedbackComponent**: The main wrapper component that includes the ThemeProvider and Toaster
2. **FeedbackButton**: The button that triggers the feedback form
3. **FeedbackForm**: The modal form that appears when the button is clicked

### Using Individual Components

You can also import and use the `FeedbackButton` component directly if you want more control:

```tsx
import { FeedbackButton } from "react-feedback-component";
import { ThemeProvider } from "react-feedback-component/ThemeProvider";
import { Toaster } from "react-feedback-component/ui/toaster";

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <Toaster />
      <FeedbackButton
        slackWebhookUrl="https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK"
        // Additional props...
      />
    </ThemeProvider>
  );
}
```

## Feedback Form Features

The feedback form includes:

- Feedback type selection (Issue, Idea, Other)
- Email field (pre-filled if userEmail prop is provided)
- Subject field
- Message field
- Screenshot upload capability
- Submit button with loading state

## Integration Types

### Slack Integration

When using `integrationType="slack"`, the component will:

1. Format the feedback data for Slack
2. Send it to the provided `slackWebhookUrl`
3. Display a success toast when sent

### Custom Webhook Integration

When using `integrationType="webhook"`, the component will:

1. Send the feedback data as JSON to the provided `webhookUrl`
2. The JSON payload will include:
   - `type`: The feedback type (issue, idea, other)
   - `email`: The user's email
   - `subject`: The feedback subject
   - `message`: The feedback message
   - `screenshot`: The screenshot file (if provided)

## Development

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/react-feedback-component.git
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```
3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

## Publishing to npm

1. Build the package:
   ```bash
   npm run build
   # or
   yarn build
   ```
2. Log in to npm:
   ```bash
   npm login
   ```
3. Publish the package:
   ```bash
   npm publish
   ```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).
