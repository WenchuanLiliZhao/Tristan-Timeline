import React, { useState } from 'react';
import { Input } from '../../../design-system/ui-components/data-entry';

export const Element: React.FC = () => {
  const [controlledValue, setControlledValue] = useState('');
  const [buttonValue, setButtonValue] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleStandardSearch = (value: string) => {
    console.log('Standard search:', value);
    setSearchResults([`Result for "${value}" 1`, `Result for "${value}" 2`, `Result for "${value}" 3`]);
  };

  const handleControlledSearch = async (value: string) => {
    console.log('Controlled search:', value);
    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      setSearchResults([`API Result for "${value}" 1`, `API Result for "${value}" 2`]);
      setIsSearching(false);
    }, 1000);
  };

  const handleButtonClick = () => {
    console.log('Button search clicked');
    alert('This would open a fullscreen search modal!');
    setButtonValue('Advanced filters applied');
  };

  const handleClear = (setter: React.Dispatch<React.SetStateAction<string>>) => {
    return () => {
      setter('');
      setSearchResults([]);
    };
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', color: 'var(--color--text-prime)' }}>
      <h1 style={{ color: 'var(--color--text-prime)' }}>Input Component Demo</h1>
      
      {/* Basic Usage */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: 'var(--color--text-prime)', marginBottom: '1rem' }}>Basic Usage</h2>
        <p style={{ marginBottom: '1.5rem', color: 'var(--color--text-secondary)' }}>
          Basic input with default settings
        </p>
        
        <Input 
          placeholder="Type something..."
          onEnter={handleStandardSearch}
        />
        
        {searchResults.length > 0 && (
          <div style={{ 
            marginTop: '1rem', 
            padding: '1rem', 
            backgroundColor: 'var(--color--bg-secondary)', 
            borderRadius: '6px',
            border: '1px solid var(--color--border-prime)'
          }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color--text-prime)' }}>Results:</h4>
            {searchResults.map((result, index) => (
              <div key={index} style={{ padding: '0.25rem 0', color: 'var(--color--text-secondary)' }}>
                {result}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Search Input Example */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: 'var(--color--text-prime)', marginBottom: '1rem' }}>Search Input Example</h2>
        <p style={{ marginBottom: '1.5rem', color: 'var(--color--text-secondary)' }}>
          Input configured as a search bar with prefix icon
        </p>
        
        <Input 
          prefixIcon="search"
          placeholder="Search anything..."
          onEnter={handleStandardSearch}
        />
      </section>

      {/* Variants */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: 'var(--color--text-prime)', marginBottom: '1rem' }}>Variants</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color--text-secondary)' }}>Outlined (Default)</h4>
            <Input variant="outlined" placeholder="Outlined input" />
          </div>
          
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color--text-secondary)' }}>Filled</h4>
            <Input variant="filled" placeholder="Filled input" />
          </div>
          
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color--text-secondary)' }}>Ghost</h4>
            <Input variant="ghost" placeholder="Ghost input" />
          </div>
        </div>
      </section>

      {/* Sizes */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: 'var(--color--text-prime)', marginBottom: '1rem' }}>Sizes</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color--text-secondary)' }}>Tiny</h4>
            <Input size="tiny" placeholder="Tiny input" />
          </div>
          
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color--text-secondary)' }}>Small</h4>
            <Input size="small" placeholder="Small input" />
          </div>
          
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color--text-secondary)' }}>Medium (Default)</h4>
            <Input size="medium" placeholder="Medium input" />
          </div>
          
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color--text-secondary)' }}>Large</h4>
            <Input size="large" placeholder="Large input" />
          </div>
        </div>
      </section>

      {/* Controlled vs Uncontrolled */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: 'var(--color--text-prime)', marginBottom: '1rem' }}>Controlled vs Uncontrolled</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color--text-secondary)' }}>Uncontrolled</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--color--text-tertiary)', marginBottom: '0.5rem' }}>
              Component manages its own state
            </p>
            <Input 
              placeholder="Type and press Enter..."
              onEnter={(value) => alert(`Uncontrolled input: ${value}`)}
            />
          </div>
          
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color--text-secondary)' }}>Controlled</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--color--text-tertiary)', marginBottom: '0.5rem' }}>
              Value: "{controlledValue}" | Loading: {isSearching ? 'Yes' : 'No'}
            </p>
            <Input 
              value={controlledValue}
              onChange={(value) => setControlledValue(value)}
              onEnter={handleControlledSearch}
              onClear={handleClear(setControlledValue)}
              placeholder={isSearching ? "Searching..." : "Controlled input"}
              disabled={isSearching}
            />
          </div>
        </div>
      </section>

      {/* Button Mode */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: 'var(--color--text-prime)', marginBottom: '1rem' }}>Button Mode (useAsButton)</h2>
        <p style={{ marginBottom: '1.5rem', color: 'var(--color--text-secondary)' }}>
          When useAsButton is true, the input acts as a trigger for complex interfaces like modals or navigation.
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color--text-secondary)' }}>Basic Button Mode</h4>
            <Input 
              useAsButton
              placeholder="Click to open advanced search"
              onClick={handleButtonClick}
            />
          </div>
          
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color--text-secondary)' }}>With Value Display</h4>
            <Input 
              useAsButton
              placeholder="No filters applied"
              value={buttonValue}
              onClick={handleButtonClick}
              onClear={handleClear(setButtonValue)}
            />
          </div>
        </div>
      </section>

      {/* Icon Examples */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: 'var(--color--text-prime)', marginBottom: '1rem' }}>Icon Examples</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color--text-secondary)' }}>Prefix Icon</h4>
            <Input 
              prefixIcon="email"
              placeholder="Enter your email"
              onEnter={(value) => console.log('Email submitted:', value)}
            />
          </div>
          
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color--text-secondary)' }}>Suffix Icon</h4>
            <Input 
              suffixIcon="visibility"
              placeholder="Password"
              type="password"
              onSuffixClick={() => console.log('Toggle password visibility')}
            />
          </div>
          
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color--text-secondary)' }}>Both Icons</h4>
            <Input 
              prefixIcon="person"
              suffixIcon="edit"
              placeholder="Username"
              onSuffixClick={() => console.log('Edit username')}
            />
          </div>
          
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color--text-secondary)' }}>Search with Clear</h4>
            <Input 
              prefixIcon="search"
              placeholder="Search..."
              onEnter={(value) => console.log('Search:', value)}
            />
          </div>
        </div>
      </section>

      {/* Special Features */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: 'var(--color--text-prime)', marginBottom: '1rem' }}>Special Features</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color--text-secondary)' }}>Auto Focus</h4>
            <Input 
              autoFocus
              placeholder="Auto focused on mount"
            />
          </div>
          
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color--text-secondary)' }}>Disabled State</h4>
            <Input 
              disabled
              value="Disabled input"
              placeholder="Cannot interact"
            />
          </div>
          
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color--text-secondary)' }}>No Clear Button</h4>
            <Input 
              showClearButton={false}
              placeholder="No clear button shown"
            />
          </div>
          
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color--text-secondary)' }}>Custom Events</h4>
            <Input 
              placeholder="Check console for events"
              onFocus={() => console.log('Input focused')}
              onBlur={() => console.log('Input blurred')}
              onChange={(value) => console.log('Input changed:', value)}
              onEnter={(value) => console.log('Input enter:', value)}
              onClear={() => console.log('Input cleared')}
            />
          </div>
        </div>
      </section>

      {/* Input Types */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: 'var(--color--text-prime)', marginBottom: '1rem' }}>Input Types</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color--text-secondary)' }}>Text (Default)</h4>
            <Input 
              type="text"
              placeholder="Text input"
            />
          </div>
          
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color--text-secondary)' }}>Email</h4>
            <Input 
              type="email"
              prefixIcon="email"
              placeholder="Enter email"
            />
          </div>
          
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color--text-secondary)' }}>Password</h4>
            <Input 
              type="password"
              prefixIcon="lock"
              placeholder="Enter password"
            />
          </div>
          
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color--text-secondary)' }}>Number</h4>
            <Input 
              type="number"
              prefixIcon="calculate"
              placeholder="Enter number"
            />
          </div>
        </div>
      </section>

      {/* Keyboard Shortcuts */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: 'var(--color--text-prime)', marginBottom: '1rem' }}>Keyboard Shortcuts</h2>
        <div style={{ 
          padding: '1rem', 
          backgroundColor: 'var(--color--bg-secondary)', 
          borderRadius: '6px',
          border: '1px solid var(--color--border-prime)',
          marginBottom: '1rem'
        }}>
          <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color--text-prime)' }}>Available Shortcuts:</h4>
          <ul style={{ margin: '0', paddingLeft: '1.5rem', color: 'var(--color--text-secondary)' }}>
            <li><strong>Enter</strong>: Trigger onEnter event</li>
            <li><strong>Escape</strong>: Clear input (when clear button is enabled)</li>
            <li><strong>Tab</strong>: Navigate to/from component</li>
          </ul>
        </div>
        
        <Input 
          placeholder="Try Enter to submit, Escape to clear"
          onEnter={(value) => alert(`Keyboard input: ${value}`)}
        />
      </section>

      {/* Integration Examples */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: 'var(--color--text-prime)', marginBottom: '1rem' }}>Integration Examples</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Search with filters */}
          <div style={{ 
            padding: '1.5rem', 
            backgroundColor: 'var(--color--bg-secondary)', 
            borderRadius: '8px',
            border: '1px solid var(--color--border-prime)'
          }}>
            <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color--text-prime)' }}>Search with Filter Indicator</h4>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <Input 
                variant="filled"
                prefixIcon="search"
                placeholder="Search products..."
                style={{ flex: '1', minWidth: '200px' }}
              />
              <div style={{ 
                padding: '0.5rem 1rem', 
                backgroundColor: 'var(--color--semantic-active-pale)', 
                color: 'var(--color--semantic-active)',
                borderRadius: '4px',
                fontSize: '0.9rem'
              }}>
                3 filters active
              </div>
            </div>
          </div>
          
          {/* Search in navigation */}
          <div style={{ 
            padding: '1.5rem', 
            backgroundColor: 'var(--color--bg-secondary)', 
            borderRadius: '8px',
            border: '1px solid var(--color--border-prime)'
          }}>
            <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color--text-prime)' }}>Navigation Bar Integration</h4>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              padding: '0.75rem 1rem',
              backgroundColor: 'var(--color--bg-prime)',
              borderRadius: '6px',
              border: '1px solid var(--color--border-prime)'
            }}>
              <div style={{ color: 'var(--color--text-prime)', fontWeight: 'bold' }}>Logo</div>
              <Input 
                size="small"
                variant="ghost"
                prefixIcon="search"
                placeholder="Search..."
                style={{ width: '300px' }}
              />
              <div style={{ color: 'var(--color--text-secondary)' }}>Menu</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}; 