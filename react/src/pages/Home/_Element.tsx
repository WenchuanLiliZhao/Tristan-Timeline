import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ProgressCircle } from '../../design-system/ui-components/data-display';

export const Element: React.FC = () => {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedProgress(prev => (prev >= 100 ? 0 : prev + 1));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const pages = [
    { name: 'Button Demo', path: '/button-demo', description: 'Button component demonstration - View all variants, sizes, colors and states of the button component' },
    { name: 'Timeline Demo', path: '/timeline', description: 'Timeline component demonstration - Explore various usage patterns and configuration options for the timeline component' },
    { name: 'Icon Demo', path: '/icon-demo', description: 'Icon component demonstration - View different sizes, predefined and custom icon usage' },
    { name: 'Tag Demo', path: '/tag-demo', description: 'Tag component demonstration - View different styles and usage patterns of the tag component' },
    { name: 'Layout Demo', path: '/layout-demo', description: 'Layout component demonstration - View different styles and usage patterns of the layout component' },
    { name: 'RichTooltip Demo', path: '/rich-tooltip-demo', description: 'RichTooltip component demonstration - View different styles and usage patterns of the RichTooltip component' },
    { name: 'Dropdown & Cascader Demo', path: '/dropdown-cascader-demo', description: 'Dropdown and Cascader components demonstration - Interactive dropdowns with flexible content and positioning options' },
    { name: 'Property Distribution Bar Demo', path: '/property-distribution-bar-demo', description: 'Property Distribution Bar component demonstration - View different styles and usage patterns of the Property Distribution Bar component' },
  ];

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', color: 'var(--color--text-prime)' }}>
      <h1 style={{ color: 'var(--color--text-prime)' }}>Tristan-UI Component Showcase</h1>
      <p style={{ color: 'var(--color--text-secondary)' }}>Welcome to the Tristan-UI design system component library!</p>

              <div style={{ marginTop: '2rem' }}>
        <h2 style={{ color: 'var(--color--text-prime)' }}>Available Pages</h2>
        <div style={{ 
          display: 'grid', 
          gap: '1rem', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          marginTop: '1rem'
        }}>
          {pages.map((page) => (
            <Link 
              key={page.path}
              to={page.path}
              style={{
                textDecoration: 'none',
                padding: '1.5rem',
                border: '1px solid var(--color--border-secondary-trans)',
                borderRadius: '8px',
                backgroundColor: 'var(--color--bg-pale)',
                transition: 'all 0.2s ease',
                display: 'block'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color--bg-darken)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = 'var(--color--shadow-pop-up)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color--bg-pale)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--color--semantic-active)' }}>
                {page.name}
              </h3>
              <p style={{ margin: 0, color: 'var(--color--text-secondary)', fontSize: '0.9rem' }}>
                {page.description}
              </p>
            </Link>
          ))}
        </div>
      </div>

      <div style={{ 
        marginTop: '3rem', 
        padding: '1.5rem', 
        backgroundColor: 'var(--color--semantic-active-pale)', 
        borderRadius: '8px',
        border: '1px solid var(--color--semantic-active)'
      }}>
        <h3 style={{ margin: '0 0 1rem 0', color: 'var(--color--semantic-active)' }}>
          📦 Latest Update - Material Icons Integration
        </h3>
        <p style={{ margin: '0 0 1rem 0', color: 'var(--color--text-prime)' }}>
          Tristan-UI now includes Google Material Icons! No additional dependencies required, 200+ beautiful icons ready to use out of the box.
        </p>
        <div style={{ backgroundColor: 'var(--color--bg-prime)', padding: '1rem', borderRadius: '4px', border: '1px solid var(--color--border-secondary-trans)' }}>
          <code>npm install tristan-ui</code>
          <br />
                      <code style={{ marginTop: '0.5rem', display: 'block', color: 'var(--color--text-prime)' }}>
            {`import { Icon } from 'tristan-ui';`}
          </code>
          <code style={{ marginTop: '0.5rem', display: 'block', color: 'var(--color--text-prime)' }}>
            {`<Icon name="home" size="large" color="var(--color--semantic-active)" />`}
          </code>
        </div>
        <p style={{ margin: '1rem 0 0 0', fontSize: '0.9rem', color: 'var(--color--text-secondary)' }}>
          Visit the <strong>Material Icons Debug</strong> page to view all available icons and usage examples.
        </p>
      </div>

      <div style={{ 
        marginTop: '3rem', 
        padding: '1.5rem', 
        backgroundColor: 'var(--color--bg-pale)', 
        borderRadius: '8px',
        border: '1px solid var(--color--semantic-active)'
      }}>
        <h3 style={{ margin: '0 0 1rem 0', color: 'var(--color--semantic-active)' }}>
          🔄 New Component - ProgressCircle
        </h3>
        <p style={{ margin: '0 0 1rem 0', color: 'var(--color--text-prime)' }}>
          SVG-based configurable progress circle component with support for custom colors, sizes, and animation effects.
        </p>
        
        <div style={{ 
          display: 'grid', 
          gap: '2rem', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          marginTop: '1.5rem'
        }}>
          <div>
            <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color--text-prime)' }}>Different Sizes</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <ProgressCircle progress={75} size="small" />
              <ProgressCircle progress={75} size="medium" />
              <ProgressCircle progress={75} size="large" />
              <ProgressCircle progress={75} size={48} />
            </div>
          </div>

          <div>
            <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color--text-prime)' }}>Different Colors</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <ProgressCircle progress={60} color="primary" />
              <ProgressCircle progress={60} color="success" />
              <ProgressCircle progress={60} color="warning" />
              <ProgressCircle progress={60} color="error" />
            </div>
          </div>

          <div>
            <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color--text-prime)' }}>With Text Display</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <ProgressCircle progress={85} showText size="large" />
              <ProgressCircle progress={50} showText text="50%" size="large" />
              <ProgressCircle progress={100} showText text="Complete" size="large" color="success" />
            </div>
          </div>

          <div>
            <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color--text-prime)' }}>Animation Effects</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <ProgressCircle 
                progress={animatedProgress} 
                showText 
                size="large" 
                color="primary"
                animationDuration={100}
              />
              <ProgressCircle 
                progress={animatedProgress} 
                showText 
                size={40} 
                color="var(--color--semantic-error)"
                strokeWidth={3}
              />
            </div>
          </div>
        </div>

        <div style={{ 
          backgroundColor: 'var(--color--bg-prime)', 
          padding: '1rem', 
          borderRadius: '4px', 
          border: '1px solid var(--color--border-secondary-trans)',
          marginTop: '1.5rem'
        }}>
          <code style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color--text-prime)' }}>
            {`import { ProgressCircle } from 'tristan-ui';`}
          </code>
          <code style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color--text-prime)' }}>
            {`<ProgressCircle progress={75} size="large" color="primary" showText />`}
          </code>
          <code style={{ display: 'block', color: 'var(--color--text-prime)' }}>
            {`<ProgressCircle progress={50} size={32} color="var(--color--semantic-active)" strokeWidth={3} />`}
          </code>
        </div>
      </div>

      <div style={{ marginTop: '2rem', fontSize: '0.9rem', color: 'var(--color--text-secondary)' }}>
        <p>
          <strong style={{ color: 'var(--color--text-prime)' }}>Version:</strong> 0.2.1<br />
          <strong style={{ color: 'var(--color--text-prime)' }}>Documentation:</strong> View component pages for detailed usage instructions<br />
          <strong style={{ color: 'var(--color--text-prime)' }}>Source Code:</strong> <a href="https://github.com/wenchuanlilizhao/tristan-ui" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color--semantic-active)' }}>GitHub</a>
        </p>
      </div>
    </div>
  );
};