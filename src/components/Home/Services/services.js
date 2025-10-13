import './services.css';
import Expandiblelist from './expandablelist/expandablelist';

export default function Services() {
  return (
    <div className="services-container">
        <div className="services-wrapper">
            <div className="services-left">
                <div className="services-content">
                    <h3 className='services-title'>
                        What we&apos;ll do for you
                    </h3>
                    <p>
                        We&apos;re aud studios — a founder-led creative agency that plugs in where you need us most, bringing perspective, initiative, and expertise that move with your team in any stage, from ideation to production to wrap.
                    </p>
                </div>
            </div>
            <div className="services-right">
                <div className="service-dropdown-container">
                    <Expandiblelist />
                </div>
            </div>
        </div>
    </div>
  );
}
