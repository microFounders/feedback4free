# React Feedback Component Documentation

Welcome to the React Feedback Component documentation. This library provides a customizable feedback button and form for React applications, allowing users to submit feedback directly from your app to Slack or a custom webhook.

## Documentation Index

### Getting Started

- [Quick Start Guide](QUICK_START.md) - Get up and running in minutes
- [Installation Guide](INSTALLATION.md) - Detailed installation and configuration instructions
- [README](README.md) - Overview and basic usage

### Visual References

- [Visual Guide](VISUAL_GUIDE.md) - Visual examples of different configurations

### Technical Documentation

- [Technical Reference](TECHNICAL_REFERENCE.md) - Detailed technical overview of the component architecture

## Component Overview

The React Feedback Component is a customizable feedback button and form for React applications. It allows users to submit feedback directly from your app to Slack or a custom webhook.

### Key Features

- **Easy Integration**: Add a feedback button to your app with just a few lines of code
- **Customizable**: Configure the button's position, color, icon, and more
- **Multiple Integrations**: Send feedback to Slack or your own API endpoint
- **Screenshot Support**: Users can attach screenshots to their feedback
- **Responsive Design**: Works on all screen sizes
- **Accessibility**: Built with accessibility in mind
- **Theming**: Supports light and dark modes

### Basic Example

```tsx
import { FeedbackComponent } from "free-feedback";

function App() {
  return (
    <div className="app">
      {/* Your app content */}

      <FeedbackComponent slackWebhookUrl="https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK" />
    </div>
  );
}
```

## Props Summary

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

For more detailed information about each prop and how to use them, see the [Installation Guide](INSTALLATION.md).

## Need Help?

If you encounter any issues or have questions, please open an issue on our [GitHub repository](https://github.com/microFounders/free-feedback/issues).
