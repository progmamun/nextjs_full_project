import styles from './hero.module.css';

const Hero = () => {
    return (
      <section className={`${styles.bgImage} text-white section-padding`}>
      <div className="text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          {/* <h1 className="text-4xl font-bold mb-6">Making a Difference Together</h1>
          <p className="text-xl mb-8">Join us in our mission to create positive change in our community</p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
            Get Involved
          </button> */}
        </div>
      </div>
    </section>
    );
  };
  
  export default Hero;