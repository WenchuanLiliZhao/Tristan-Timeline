import React from 'react';

export const Element: React.FC = () => {
  return (
    <div style={{ 
      padding: '2rem', 
      textAlign: 'center', 
      minHeight: '50vh', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center',
      color: 'var(--color--text-prime)'
    }}>
      <h1 style={{ 
        fontSize: '4rem', 
        margin: '0 0 1rem 0', 
        color: 'var(--color--semantic-error)'
      }}>
        404
      </h1>
      <h2 style={{ 
        margin: '0 0 1rem 0', 
        color: 'var(--color--text-prime)'
      }}>
        Page Not Found
      </h2>
      <p style={{ 
        margin: '0 0 2rem 0', 
        color: 'var(--color--text-secondary)',
        fontSize: '1.1rem'
      }}>
        Sorry, the page you are looking for does not exist.
      </p>
      <a 
        href="/" 
        style={{
          color: 'var(--color--semantic-active)',
          textDecoration: 'none',
          fontSize: '1.1rem',
          padding: '0.75rem 1.5rem',
          border: '1px solid var(--color--semantic-active)',
          borderRadius: '4px',
          display: 'inline-block',
          maxWidth: '200px',
          margin: '0 auto'
        }}
      >
        Back to Home
      </a>
    </div>
  );
}; 