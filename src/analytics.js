import ReactGA from 'react-ga4';

export const initGA = () => {
  ReactGA.initialize('G-MD4B3WYBK7');
};

export const trackPage = (page) => {
  ReactGA.send('pageview', page);
};
