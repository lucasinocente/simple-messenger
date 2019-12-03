import React from 'react';
import './Page.scss';

const Page = ({ children }) => (
  <section className="section">
    <div className="container">
      { children }
    </div>
  </section>
);

export default Page;