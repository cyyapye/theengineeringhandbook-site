export const GA_TRACKING_ID = 'UA-155333507-2'

export function pageView(url: string) {
    window.gtag('config', GA_TRACKING_ID, {
        page_path: url,
    })
}

export function event({ action, category, label, value }: TrackingEvent) {
    window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
    })
}

interface TrackingEvent {
    action: string
    category: string
    label?: string
    value?: number
}