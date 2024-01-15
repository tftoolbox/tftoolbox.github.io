import React from 'react';
import './Board.css';

const Traits = () => {
  return (
    <div style={{ background: '#18222F', paddingTop: '10px', paddingBottom: '10px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ color: '#ffffff', textAlign: 'center', marginBottom: '5px', marginTop: '5px', fontSize: '20px' }}>Traits</h2>
      <div className='trait-section'>
        <div className='trait-row'>
          <div className='single-trait'>
            <div className='hexagon-trait'>
              <div className="start" style={{ borderBottom: '13.5px solid #BD9A38' }}></div>
              <div className="center" style={{ display: 'flex', background: '#BD9A38', justifyContent: 'center', alignItems: 'center' }}>
                <img alt='breakout' src='https://rerollcdn.com/icons/breakout.png' style={{ width: '35px', height: '35px'}}></img>
              </div>
              <div className="end" style={{ borderTop: '13.5px solid #BD9A38' }}></div>
            </div>
            <div className='hexagon-trait' style={{ marginTop: '13.5px', marginLeft: '0px' }}>
              <div className="center" style={{ display: 'flex', background: '#BD9A38', width: '31.2px', justifyContent: 'center', alignItems: 'center' }}>1</div>
            </div>
          </div>
          <div className='single-trait'>
            <div className='hexagon-trait'>
              <div className="start" style={{ borderBottom: '13.5px solid #7D8F92' }}></div>
              <div className="center" style={{ display: 'flex', background: '#7D8F92', justifyContent: 'center', alignItems: 'center' }}>
                <img alt='breakout' src='https://rerollcdn.com/icons/pentakill.png' style={{ width: '35px', height: '35px'}}></img>
              </div>
              <div className="end" style={{ borderTop: '13.5px solid #7D8F92' }}></div>
            </div>
            <div className='hexagon-trait' style={{ marginTop: '13.5px', marginLeft: '0px' }}>
              <div className="center" style={{ display: 'flex', background: '#7D8F92', width: '31.2px', justifyContent: 'center', alignItems: 'center' }}>5</div>
            </div>
          </div>
        </div>
        <div className='trait-row'>
          <div className='single-trait'>
            <div className='hexagon-trait'>
              <div className="start" style={{ borderBottom: '13.5px solid #7D8F92' }}></div>
              <div className="center" style={{ display: 'flex', background: '#7D8F92', justifyContent: 'center', alignItems: 'center' }}>
                <img alt='breakout' src='https://rerollcdn.com/icons/superfan.png' style={{ width: '35px', height: '35px'}}></img>
              </div>
              <div className="end" style={{ borderTop: '13.5px solid #7D8F92' }}></div>
            </div>
            <div className='hexagon-trait' style={{ marginTop: '13.5px', marginLeft: '0px' }}>
              <div className="center" style={{ display: 'flex', background: '#7D8F92', width: '31.2px', justifyContent: 'center', alignItems: 'center' }}>4</div>
            </div>
          </div>
          <div className='single-trait'>
            <div className='hexagon-trait'>
              <div className="start" style={{ borderBottom: '13.5px solid #A0715E' }}></div>
              <div className="center" style={{ display: 'flex', background: '#A0715E', justifyContent: 'center', alignItems: 'center' }}>
                <img alt='breakout' src='https://rerollcdn.com/icons/kda.png' style={{ width: '35px', height: '35px'}}></img>
              </div>
              <div className="end" style={{ borderTop: '13.5px solid #A0715E' }}></div>
            </div>
            <div className='hexagon-trait' style={{ marginTop: '13.5px', marginLeft: '0px' }}>
              <div className="center" style={{ display: 'flex', background: '#A0715E', width: '31.2px', justifyContent: 'center', alignItems: 'center' }}>3</div>
            </div>
          </div>
        </div>
        <div className='trait-row'>
          <div className='single-trait'>
            <div className='hexagon-trait'>
              <div className="start" style={{ borderBottom: '13.5px solid #A0715E' }}></div>
              <div className="center" style={{ display: 'flex', background: '#A0715E', justifyContent: 'center', alignItems: 'center' }}>
                <img alt='breakout' src='https://rerollcdn.com/icons/executioner.png' style={{ width: '35px', height: '35px'}}></img>
              </div>
              <div className="end" style={{ borderTop: '13.5px solid #A0715E' }}></div>
            </div>
            <div className='hexagon-trait' style={{ marginTop: '13.5px', marginLeft: '0px' }}>
              <div className="center" style={{ display: 'flex', background: '#A0715E', width: '31.2px', justifyContent: 'center', alignItems: 'center' }}>2</div>
            </div>
          </div>
          <div className='single-trait'>
            <div className='hexagon-trait'>
              <div className="start" style={{ borderBottom: '13.5px solid #A0715E' }}></div>
              <div className="center" style={{ display: 'flex', background: '#A0715E', justifyContent: 'center', alignItems: 'center' }}>
                <img alt='breakout' src='https://rerollcdn.com/icons/guardian.png' style={{ width: '30px', height: '30px'}}></img>
              </div>
              <div className="end" style={{ borderTop: '13.5px solid #A0715E' }}></div>
            </div>
            <div className='hexagon-trait' style={{ marginTop: '13.5px', marginLeft: '0px' }}>
              <div className="center" style={{ display: 'flex', background: '#A0715E', width: '31.2px', justifyContent: 'center', alignItems: 'center' }}>2</div>
            </div>
          </div>
        </div>
        <div className='trait-row'>
          <div className='single-trait'>
            <div className='hexagon-trait'>
              <div className="start" style={{ borderBottom: '13.5px solid #A0715E' }}></div>
              <div className="center" style={{ display: 'flex', background: '#A0715E', justifyContent: 'center', alignItems: 'center' }}>
                <img alt='breakout' src='https://rerollcdn.com/icons/sentinel.png' style={{ width: '35px', height: '35px'}}></img>
              </div>
              <div className="end" style={{ borderTop: '13.5px solid #A0715E' }}></div>
            </div>
            <div className='hexagon-trait' style={{ marginTop: '13.5px', marginLeft: '0px' }}>
              <div className="center" style={{ display: 'flex', background: '#A0715E', width: '31.2px', justifyContent: 'center', alignItems: 'center' }}>2</div>
            </div>
          </div>
          <div className='single-trait'>
            <div className='hexagon-trait'>
              <div className="start" style={{ borderBottom: '13.5px solid transparent' }}></div>
              <div className="center" style={{ display: 'flex', background: 'transparent', justifyContent: 'center', alignItems: 'center' }}></div>
              <div className="end" style={{ borderTop: '13.5px solid transparent' }}></div>
            </div>
            <div className='hexagon-trait' style={{ marginTop: '13.5px', marginLeft: '0px' }}>
              <div className="center" style={{ display: 'flex', background: 'transparent', width: '31.2px', justifyContent: 'center', alignItems: 'center' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Traits;
