import React, { useState } from "react";
import { Switch } from "../../../design-system/ui-components";

export const SwitchDemoElement: React.FC = () => {
  const [controlled, setControlled] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h2 style={{ marginBottom: '24px', fontSize: '24px', fontWeight: '600' }}>Switch Component Demo</h2>
        
        {/* Basic Usage */}
        <section style={{ marginBottom: '32px' }}>
          <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '500' }}>Basic Usage</h3>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Switch defaultChecked={false} />
              <span>Default Off</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Switch defaultChecked={true} />
              <span>Default On</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Switch disabled />
              <span>Disabled Off</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Switch disabled defaultChecked={true} />
              <span>Disabled On</span>
            </div>
          </div>
        </section>

        {/* Size Variants */}
        <section style={{ marginBottom: '32px' }}>
          <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '500' }}>Size Variants</h3>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Switch size="small" defaultChecked={true} />
              <span>Small</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Switch size="medium" defaultChecked={true} />
              <span>Medium</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Switch size="large" defaultChecked={true} />
              <span>Large</span>
            </div>
          </div>
        </section>

        {/* Controlled Example */}
        <section style={{ marginBottom: '32px' }}>
          <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '500' }}>Controlled Component</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <Switch 
              checked={controlled} 
              onChange={(checked) => setControlled(checked)} 
            />
            <span>Controlled Switch: {controlled ? 'ON' : 'OFF'}</span>
          </div>
          <button 
            onClick={() => setControlled(!controlled)}
            style={{
              padding: '8px 16px',
              border: '1px solid var(--color--border-prime)',
              borderRadius: '6px',
              background: 'var(--color--bg-secondary)',
              color: 'var(--color--text-prime)',
              cursor: 'pointer'
            }}
          >
            Toggle Programmatically
          </button>
        </section>

        {/* Variant Examples */}
        <section style={{ marginBottom: '32px' }}>
          <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '500' }}>Variants</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <h4 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '500' }}>Toggle (Default) - On/Off States</h4>
              <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Switch 
                    variant="toggle"
                    defaultChecked={false}
                    checkedIcon="check"
                    uncheckedIcon="close"
                  />
                  <span>Enable Feature</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Switch 
                    variant="toggle"
                    defaultChecked={true}
                    checkedIcon="wifi"
                    uncheckedIcon="wifi_off"
                  />
                  <span>WiFi Status</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '500' }}>Mode - Neutral Mode Switching</h4>
              <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Switch 
                    variant="mode"
                    defaultChecked={false}
                    checkedIcon="light_mode"
                    uncheckedIcon="dark_mode"
                  />
                  <span>Light/Dark Theme</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Switch 
                    variant="mode"
                    size="large"
                    defaultChecked={true}
                    checkedIcon="volume_up"
                    uncheckedIcon="volume_off"
                  />
                  <span>Audio Mode</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Switch 
                    variant="mode"
                    size="small"
                    defaultChecked={false}
                    checkedIcon="view_list"
                    uncheckedIcon="view_module"
                  />
                  <span>View Mode</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Real-world Examples */}
        <section>
          <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '500' }}>Real-world Examples</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0' }}>
              <div>
                <div style={{ fontWeight: '500' }}>Enable Notifications</div>
                <div style={{ fontSize: '14px', color: 'var(--color--text-secondary)' }}>
                  Receive push notifications for important updates
                </div>
              </div>
              <Switch 
                checked={notifications} 
                onChange={(checked) => setNotifications(checked)} 
              />
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0' }}>
              <div>
                <div style={{ fontWeight: '500' }}>Dark Mode</div>
                <div style={{ fontSize: '14px', color: 'var(--color--text-secondary)' }}>
                  Switch to dark theme for better night viewing
                </div>
              </div>
              <Switch 
                checked={darkMode} 
                onChange={(checked) => setDarkMode(checked)} 
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0' }}>
              <div>
                <div style={{ fontWeight: '500' }}>Auto-save</div>
                <div style={{ fontSize: '14px', color: 'var(--color--text-secondary)' }}>
                  Automatically save your work every 30 seconds
                </div>
              </div>
              <Switch defaultChecked={true} disabled />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}; 