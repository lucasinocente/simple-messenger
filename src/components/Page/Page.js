import React from 'react';
import './Page.scss';

const Page = ({ extraClass, children }) => (
  <section className={`section ${extraClass}`}>
    <div className="container">
      { children }
    </div>
  </section>
);

export default Page;