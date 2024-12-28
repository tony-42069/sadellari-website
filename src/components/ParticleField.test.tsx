import React from 'react';
import { render, screen } from '@testing-library/react';
import ParticleField from './ParticleField';

test('renders ParticleField component', () => {
    render(<ParticleField />);
    const element = screen.getByTestId('particle-field');
    expect(element).toBeInTheDocument();
});

test('handles props correctly', () => {
    const testProp = 'test';
    render(<ParticleField someProp={testProp} />);
    expect(screen.getByText(testProp)).toBeInTheDocument();
});

test('interacts with state changes', () => {
    const { getByText } = render(<ParticleField />);
    const button = getByText('Change State');
    button.click();
    expect(getByText('State Changed')).toBeInTheDocument();
});