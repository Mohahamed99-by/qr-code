import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = 'QR Code Generator & Scanner',
  description = 'Create and scan QR codes easily with our free online tool. Generate QR codes for links, text, and more.',
  keywords = 'QR code, QR generator, QR scanner, QR code creator, free QR code',
  canonicalUrl,
  ogImage = '/og-image.png' // Add your Open Graph image path here
}) => {
  const siteUrl = window.location.origin;
  const currentUrl = window.location.href;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl || currentUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${ogImage}`} />
      
      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="robots" content="index, follow" />
    </Helmet>
  );
};

export default SEO;
