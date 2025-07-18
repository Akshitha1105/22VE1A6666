import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUrlByShortcode, logClick } from '../URL/urlmanage';

function RedirectHandler() {
    const { shortcode } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
    const found = getUrlByShortcode(shortcode);
    if (!found) return navigate('/');

    const now = new Date();
    const expiryTime = new Date(found.created);
    expiryTime.setMinutes(expiryTime.getMinutes() + parseInt(found.expiry));

    if (now > expiryTime) return alert('Link expired');
    logClick(shortcode);
    window.location.href = found.longUrl;
    }, [shortcode, navigate]);

    return <p>Redirecting...</p>;
}

export default RedirectHandler;