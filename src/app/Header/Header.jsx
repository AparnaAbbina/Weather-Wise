import './Header.css';
import Search from '../Search/Search.tsx';

export default function Header({ cityName, setInputValue, getData }) {
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return(
    <div className="headerContent">
      <h1>WeatherWise</h1>
      <div className="searchContainer">
        <Search value={cityName} onChange={handleInputChange} /> 
        <button type='submit' onClick={getData}> 
          <img src="./search.png" alt="Search" style={{ width: '30px', height: '30px',backgroundColor:'none' }} />
        </button>
      </div>
    </div>
  );
}
