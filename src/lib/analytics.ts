/** Registry of all GA4 event names and their required parameters. Extend here when adding new events. */
export type AnalyticsEventMap = {
  search_results_returned: { query: string; result_count: number };
  search_no_results: { query: string };
  search_coin_selected: { coin_id: string; query: string; selection_method: 'mouse' | 'keyboard' };
  search_cleared: { query: string; had_active_coin: boolean; clear_method: 'button' | 'escape' | 'back_button' };
  crypto_data_refresh: { had_error: boolean; was_loading: boolean };
};

/**
 * Fire a GA4 event via `window.gtag`. Safe to call before the gtag script loads —
 * optional chaining prevents throws if GTM hasn't initialized yet.
 */
export const trackEvent = <K extends keyof AnalyticsEventMap>(
  event: K,
  params: AnalyticsEventMap[K]
) => {
  window.gtag?.('event', event, params);
};
