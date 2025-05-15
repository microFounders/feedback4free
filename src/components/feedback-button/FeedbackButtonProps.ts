export interface FeedbackButtonProps {
  /**
   * The URL of your Slack webhook for receiving feedback
   */
  slackWebhookUrl?: string;
  /**
   * Alternative webhook URL for receiving feedback in other platforms
   */
  webhookUrl?: string;
  /**
   * Position of the feedback button
   */
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  /**
   * Color style of the button
   */
  color?:
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | "ghost"
    | "link";
  /**
   * Icon to display on the button
   */
  icon?: "message" | "help" | "flag" | "alert" | "info";
  /**
   * Whether the button should animate to draw attention
   */
  animate?: boolean;
  /**
   * Size of the button
   */
  size?: "sm" | "default" | "lg";
  /**
   * Text label for the button
   */
  label?: string;
  /**
   * Whether to display the text label on the button
   */
  showLabel?: boolean;
  /**
   * Corner rounding of the button
   */
  rounded?: "full" | "md";
  /**
   * Email address of the currently logged in user.
   * If provided, this will pre-fill the email field in the feedback form.
   * If not provided but user is logged in, the email from auth state will be used.
   */
  userEmail?: string;
  /**
   * Type of integration to use: 'slack' or 'webhook'
   */
  integrationType?: "slack" | "webhook";
}
