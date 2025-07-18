export const shortenUrl = (longUrl, expiry, shortcode) => {
    const code = shortcode && validateShortcode(shortcode) ? shortcode : Math.random().toString(36).substring(2, 8);
    const created = new Date().toISOString();
    return {
    longUrl,
    shortUrl: `${window.location.origin}/${code}`,
    shortcode: code,
    created,
    expiry: expiry || '30',
    clicks: []
    };
};

export const saveUrl = obj => {
    const list = JSON.parse(localStorage.getItem('urls') || '[]');
    list.push(obj);
    localStorage.setItem('urls', JSON.stringify(list));
};

export const getAllUrls = () => JSON.parse(localStorage.getItem('urls') || '[]');

export const getUrlByShortcode = code => getAllUrls().find(u => u.shortcode === code);

export const logClick = code => {
    const urls = getAllUrls();
    const updated = urls.map(u => {
    if (u.shortcode === code) {
    u.clicks.push(new Date().toISOString());
    }
    return u;
    });
    localStorage.setItem('urls', JSON.stringify(updated));
};