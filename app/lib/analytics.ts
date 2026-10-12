export type AnalyticsEvent =
  | "form_start"
  | "form_submit"
  | "form_success"
  | "form_error"

export function trackEvent(_event: AnalyticsEvent): void {}
