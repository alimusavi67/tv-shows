import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';
jest.mock('./pages/HomePage/HomePage', () => {
  const HomePage = () => <div>HomePage</div>;
  HomePage.displayName = 'HomePage';
  return HomePage;
});

jest.mock('./pages/ShowPage/ShowPage', () => {
  const ShowPage = () => <div>ShowPage</div>;
  ShowPage.displayName = 'ShowPage';
  return ShowPage;
});

jest.mock('./pages/EpisodePage/EpisodePage', () => {
  const EpisodePage = () => <div>EpisodePage</div>;
  EpisodePage.displayName = 'EpisodePage';
  return EpisodePage;
});

jest.mock('./components/Basics/Header/Header', () => {
  const Header = () => <div>Header</div>;
  Header.displayName = 'Header';
  return Header;
});

describe('App', () => {
  const renderWithRouter = (route: string) => {
    window.history.pushState({}, 'Test page', route);
    return render(<App />);
  };

  test('renders the Header component', () => {
    renderWithRouter('/');
    expect(screen.getByText('Header')).toBeInTheDocument();
  });

  test('renders HomePage for the root route', () => {
    renderWithRouter('/');
    expect(screen.getByText('HomePage')).toBeInTheDocument();
  });

  test('renders ShowPage for the /shows/:showId route', () => {
    renderWithRouter('/shows/1');
    expect(screen.getByText('ShowPage')).toBeInTheDocument();
  });

  test('renders EpisodePage for the /episodes/:seasonId route', () => {
    renderWithRouter('/episodes/1');
    expect(screen.getByText('EpisodePage')).toBeInTheDocument();
  });
});
