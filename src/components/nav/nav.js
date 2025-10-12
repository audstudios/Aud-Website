import './nav.css';

export default function Navigation() {
  return (
    <div className="nav-container">
        <div className="nav-wrapper">
            <div className="nav-left">
              <img src="/images/audwordmark_nav.svg"></img>
            </div>
            <div className="nav-right">
                <div className="nav-menu">
                    <p className="nav-link">Work</p>
                    <p className="nav-link">About</p>
                    <p className="nav-link">Services</p>
                    <p className="nav-link">Contact</p>
                    <p className="nav-link">Aud Jobs</p>                    
                </div>
            </div>
        </div>
    </div>
  );
}
