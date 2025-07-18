import React from 'react';
import { Card, Typography } from '@mui/material';
import { getAllUrls } from '../URL/urlmanage';

function StatsPage() {
    const urls = getAllUrls();

    return (
    <Card sx={{ p: 3, m: 2 }}>
    <Typography variant="h5">URL Stats</Typography>
    {urls.map((url, i) => (
        <Card key={i} sx={{ p: 1, m: 1 }}>
        <Typography>Short: {url.shortUrl}</Typography>
        <Typography>Long: {url.longUrl}</Typography>
        <Typography>Created: {url.created}</Typography>
        <Typography>Expires in: {url.expiry} mins</Typography>
        <Typography>Clicks: {url.clicks.length}</Typography>
        <Typography>Click Times: {url.clicks.join(', ')}</Typography>
        </Card>
    ))}
    </Card>
    );
}
export default StatsPage;