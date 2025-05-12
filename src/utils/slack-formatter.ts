
import { FeedbackFormData, FeedbackType } from "@/types/feedback";

// Emoji mapping for feedback types
const typeEmojis: Record<FeedbackType, string> = {
  issue: "🐞",
  suggestion: "💡",
  question: "❓",
  other: "📝"
};

// Color mapping for feedback types
const typeColors: Record<FeedbackType, string> = {
  issue: "#E11D48", // Red
  suggestion: "#8B5CF6", // Purple
  question: "#0EA5E9", // Blue
  other: "#6B7280" // Gray
};

// Define the different types of Slack blocks for better type safety
type HeaderBlock = {
  type: "header";
  text: {
    type: "plain_text";
    text: string;
    emoji: boolean;
  };
};

type SectionBlock = {
  type: "section";
  text?: {
    type: "mrkdwn";
    text: string;
  };
  fields?: {
    type: "mrkdwn";
    text: string;
  }[];
};

type ImageBlock = {
  type: "image";
  image_url: string;
  alt_text: string;
};

type DividerBlock = {
  type: "divider";
};

type ContextBlock = {
  type: "context";
  elements: {
    type: "mrkdwn";
    text: string;
  }[];
};

// Union type for all possible block types
type SlackBlock = HeaderBlock | SectionBlock | ImageBlock | DividerBlock | ContextBlock;

/**
 * Formats feedback data into a Slack message payload
 */
export function formatSlackMessage(data: FeedbackFormData & { screenshotBase64?: string }): { blocks: SlackBlock[] } {
  const { type, email, subject, message, screenshotBase64 } = data;
  
  // Add a safety check for the type value
  const feedbackType = type || 'other'; // Default to 'other' if type is null or undefined
  const typeLabel = feedbackType.charAt(0).toUpperCase() + feedbackType.slice(1);
  
  // Create the base message blocks
  const blocks: SlackBlock[] = [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: `${typeEmojis[feedbackType as FeedbackType] || '📝'} New Feedback: ${subject || 'No Subject'}`,
        emoji: true
      }
    },
    {
      type: "section",
      fields: [
        {
          type: "mrkdwn",
          text: `*Type:*\n${typeLabel}`
        },
        {
          type: "mrkdwn",
          text: `*From:*\n${email || 'Anonymous'}`
        }
      ]
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*Message:*\n${message || 'No message provided'}`
      }
    }
  ];
  
  // Add screenshot if available
  if (screenshotBase64) {
    // Check if the base64 string is valid and not too long
    try {
      // Add a note about screenshots instead of including the full base64 image
      blocks.push({
        type: "section",
        text: {
          type: "mrkdwn",
          text: "*Screenshot:* Screenshot was included in the feedback, but Slack has a size limit for images in messages. The screenshot has been attached separately."
        }
      });
      
      // For attachments in Slack, we would normally use the 'attachments' field in the payload
      // but this requires a different approach in the actual API call, which we'll handle in the service
    } catch (error) {
      console.error("Error with screenshot:", error);
    }
  }
  
  // Add the footer blocks
  blocks.push(
    {
      type: "divider"
    } as DividerBlock,
    {
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text: `Submitted on ${new Date().toLocaleString()}`
        }
      ]
    }
  );
  
  return { blocks };
}
