# React Feedback Component

A reusable React component for collecting user feedback and sending it to Slack.

## Installation

```bash
npm install react-feedback-component
# or
yarn add react-feedback-component
```

## Usage

```tsx
import { FeedbackComponent } from "react-feedback-component";

function App() {
  return (
    <FeedbackComponent
      slackWebhookUrl="https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK"
      position="bottom-right" // optional, default: "bottom-right"
      color="default" // optional, default: "default"
      icon="message" // optional, default: "message"
      animate={false} // optional, default: false
    />
  );
}
```

### Props

| Prop              | Type                                                                                    | Default          | Description                                       |
| ----------------- | --------------------------------------------------------------------------------------- | ---------------- | ------------------------------------------------- |
| `slackWebhookUrl` | `string`                                                                                | Required         | Your Slack webhook URL to receive feedback        |
| `position`        | `"bottom-right"` \| `"bottom-left"` \| `"top-right"` \| `"top-left"`                    | `"bottom-right"` | Position of the feedback button                   |
| `color`           | `"default"` \| `"secondary"` \| `"destructive"` \| `"outline"` \| `"ghost"` \| `"link"` | `"default"`      | Color variant of the button                       |
| `icon`            | `"message"` \| `"help"` \| `"flag"` \| `"alert"` \| `"info"`                            | `"message"`      | Icon to display in the button                     |
| `animate`         | `boolean`                                                                               | `false`          | Whether to animate the button with a pulse effect |

### Using Individual Components

You can also import and use the `FeedbackButton` component directly:

```tsx
import { FeedbackButton } from "react-feedback-component";

function App() {
  return (
    <FeedbackButton slackWebhookUrl="https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK" />
  );
}
```

## Development

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/react-feedback-component.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

## Publishing to npm

1. Build the package:
   ```bash
   npm run build
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
