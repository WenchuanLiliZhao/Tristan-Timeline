import React from 'react';
import { Icon } from '../../../design-system/ui-components';

export const Element: React.FC = () => {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', color: 'var(--color--text-prime)' }}>
      <h1 style={{ color: 'var(--color--text-prime)' }}>Icon Component Demo</h1>
      
      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ color: 'var(--color--text-prime)' }}>通过CSS样式控制尺寸</h2>
        <p style={{ marginBottom: '16px', color: 'var(--color--text-secondary)' }}>
          Icon组件通过CSS的fontSize属性来控制大小
        </p>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icon name="home" style={{ fontSize: '16px' }} />
            <span>16px</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icon name="home" style={{ fontSize: '24px' }} />
            <span>24px</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icon name="home" style={{ fontSize: '32px' }} />
            <span>32px</span>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ color: 'var(--color--text-prime)' }}>更多自定义尺寸</h2>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icon name="star" style={{ fontSize: '14px' }} />
            <span>14px</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icon name="star" style={{ fontSize: '20px' }} />
            <span>20px</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icon name="star" style={{ fontSize: '28px' }} />
            <span>28px</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icon name="star" style={{ fontSize: '36px' }} />
            <span>36px</span>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ color: 'var(--color--text-prime)' }}>继承父元素尺寸（推荐方式）</h2>
        <p style={{ marginBottom: '16px', color: 'var(--color--text-secondary)' }}>
          当不设置fontSize时，图标会继承父元素的font-size，这是推荐的使用方式
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icon name="info" />
            <span>继承父元素12px字体大小</span>
          </div>
          
          <div style={{ fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icon name="info" />
            <span>继承父元素18px字体大小</span>
          </div>
          
          <div style={{ fontSize: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icon name="info" />
            <span>继承父元素24px字体大小</span>
          </div>
          
          <div style={{ fontSize: '32px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icon name="info" />
            <span>继承父元素32px字体大小</span>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ color: 'var(--color--text-prime)' }}>常用图标示例</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', 
          gap: '16px', 
          marginBottom: '16px' 
        }}>
          {[
            'home', 'person', 'settings', 'favorite', 'search', 'menu',
            'close', 'check', 'add', 'remove', 'edit', 'delete',
            'visibility', 'visibility_off', 'download', 'upload', 'share', 'copy'
          ].map(iconName => (
            <div 
              key={iconName} 
              style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                gap: '8px',
                padding: '12px',
                border: '1px solid var(--color--border-prime)',
                borderRadius: '8px',
                backgroundColor: 'var(--color--bg-secondary)',
                fontSize: '32px'
              }}
            >
              <Icon name={iconName} />
              <span style={{ fontSize: '12px', textAlign: 'center' }}>{iconName}</span>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ color: 'var(--color--text-prime)' }}>与其他组件结合使用</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            padding: '12px',
            border: '1px solid var(--color--border-prime)',
            borderRadius: '8px',
            fontSize: '16px'
          }}>
            <Icon name="info" style={{ color: 'var(--color--semantic-info)' }} />
            <span>这是一个信息提示</span>
          </div>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            padding: '12px',
            border: '1px solid var(--color--semantic-success)',
            borderRadius: '8px',
            backgroundColor: 'rgba(34, 197, 94, 0.05)',
            fontSize: '18px'
          }}>
            <Icon name="check_circle" style={{ color: 'var(--color--semantic-success)' }} />
            <span>操作成功完成</span>
          </div>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            padding: '12px',
            border: '1px solid var(--color--semantic-error)',
            borderRadius: '8px',
            backgroundColor: 'rgba(239, 68, 68, 0.05)',
            fontSize: '18px'
          }}>
            <Icon name="error" style={{ color: 'var(--color--semantic-error)' }} />
            <span>发生了错误</span>
          </div>
        </div>
      </section>
    </div>
  );
}; 