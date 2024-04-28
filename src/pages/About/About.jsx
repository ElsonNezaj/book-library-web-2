import React from 'react';
import './About.css';
import aboutImg from '../../Images/about.jpg';
import Header from '../../Components/Header/Header';

const About = () => {
  return (
    <>
      <Header />
      <section className='about'>
        <div className='container'>
          <div className='section-title'>
            <h2>About LibAdventure</h2>
          </div>

          <div className='about-content grid'>
            <div className='about-img'>
              <img src={aboutImg} alt="About us" />
            </div>
            <div className='about-text'>
              <h2 className='about-title fs-26 ls-1'>Turn the Page on Tradition: The Digital Age is Here</h2>
              <p className='fs-17'>
                At LibAdventure, we believe in pushing the boundaries of traditional learning. In a world where technology continues to evolve, we're committed to creating a space that marries the best of both worlds—classic literary adventure and modern digital innovation. Our platform is designed to ignite curiosity, inspire creativity, and foster a love for reading and learning.
              </p>
              <p className='fs-17'>
                Whether you're a bookworm seeking your next favorite read or a curious mind exploring new ideas, LibAdventure is your destination for engaging content, dynamic discussions, and a vibrant community. Our mission is simple: to make literature accessible to everyone while embracing the convenience and connectivity of the digital age.
              </p>
              <p className='fs-17'>
                Join us as we turn the page on tradition and step into a new era of literary exploration. With LibAdventure, you'll find a world of stories, insights, and adventures waiting for you.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
