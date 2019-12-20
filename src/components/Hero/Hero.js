import React from 'react';
import './Hero.scss';

const Hero = ({ content }) => (
  <section className="hero">
    <div className="hero-body is-paddingless">
      { content }
    </div>
  </section>
);

export default Hero;