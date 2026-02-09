export const getFormattedDate = (date) => {
    // Check if we are on the client side to access navigator.language
    // Default to 'en-US' if on server or navigator is undefined
    const locale = typeof window !== 'undefined' && window.navigator ? window.navigator.language : 'en-US';

    const dayName = new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(date);

    // Date format: "8 February 2026"
    const dateString = new Intl.DateTimeFormat(locale, {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }).format(date);

    // Time format: HH:mm (24h or 12h depending on locale)
    const timeString = new Intl.DateTimeFormat(locale, {
        hour: 'numeric',
        minute: 'numeric',
        // We let the locale determine 12/24h cycle
        // id-ID will default to 24h, en-US to 12h
    }).format(date);

    return { dayName, dateString, timeString };
};
