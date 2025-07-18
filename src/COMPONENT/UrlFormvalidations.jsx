import React, { useState } from 'react';
import { TextField, Button, Card, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { validateUrl, validateShortcode, validateMinutes } from '../URL/validate';
import { shortenUrl, saveUrl } from '../URL/urlmanage';
import { logEvent } from '../URL/log';

function UrlForm() {
    const [urls, setUrls] = useState([{ longUrl: '', expiry: '', shortcode: '' }]);
    const [shortenedUrls, setShortenedUrls] = useState([]);
    const navigate = useNavigate();

    const handleChange = (index, field, value) => {
    const updated = [...urls];
    updated[index][field] = value;
    setUrls(updated);
    };

    const handleShorten = () => {
    const results = [];
    for (let entry of urls) {
    const { longUrl, expiry, shortcode } = entry;
    if (!validateUrl(longUrl) || (expiry && !validateMinutes(expiry))) {
        alert('Invalid input. Check URL or expiry.');
        return;
    }
    const short = shortenUrl(longUrl, expiry, shortcode);
    saveUrl(short);
    logEvent('SHORTENED_URL', short);
    results.push(short);
    }
    setShortenedUrls(results);
    };

    const addInput = () => {
    if (urls.length < 5) setUrls([...urls, { longUrl: '', expiry: '', shortcode: '' }]);
    };

    return (
    <Card sx={{ p: 3, m: 2 }}>
    <Typography variant="h5">URL Shortener</Typography>
    {urls.map((entry, i) => (
        <div key={i}>
        <TextField label="Long URL" fullWidth sx={{ m: 1 }} value={entry.longUrl} onChange={e => handleChange(i, 'longUrl', e.target.value)} />
        <TextField label="Expiry (minutes)" sx={{ m: 1 }} value={entry.expiry} onChange={e => handleChange(i, 'expiry', e.target.value)} />
        <TextField label="Custom Shortcode (optional)" sx={{ m: 1 }} value={entry.shortcode} onChange={e => handleChange(i, 'shortcode', e.target.value)} />
        </div>
    ))}
    <Button variant="outlined" onClick={addInput} disabled={urls.length >= 5}>+ Add</Button>
    <Button variant="contained" onClick={handleShorten} sx={{ m: 1 }}>Shorten</Button>
    <Button onClick={() => navigate('/stats')}>View Stats</Button>
    {shortenedUrls.map((url, i) => (
        <Typography key={i}>{url.shortUrl} (expires: {url.expiry})</Typography>
    ))}
    </Card>
    );
}

export default UrlForm;
