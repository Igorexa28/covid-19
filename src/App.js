import './App.css';
import { useState, useEffect } from 'react';
import Header from './Components/Header.tsx';
import StatBlock from './Components/StatBlock';
import InfoBlock from './Components/InfoBlock';

function App() {
  const [ items, setItems ] = useState([]);
  const [ error, setError ] = useState(null);
  const [ copiedArray, setCopied ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false);

  useEffect(() => {
    async function getData() {
      let response = await fetch('https://api.covid19api.com/summary');
      let json = await response.json();
      
      return json;
    }
  
    getData().then(res => {
      setCopied(res.Countries);
      setItems(res.Countries);
      setIsLoading(true);
    }, err => {
      setError(err);
    })
  
  }, [setItems, setError, setIsLoading]);

  let bodyElements = null;

  if (error) {
    bodyElements = (
      <div className="errorDiv">
        <p>Oopps, error occured: {error}.</p>
      </div>
    );
  } else if (!isLoading) {
    bodyElements = (
      <div className="loadingDiv">
        <p>Loading...</p>
      </div>
    );
  } else {

    if (items !== undefined) {
      bodyElements = items.map((element, index) => {
        return (
          <InfoBlock 
            classToUse="infoBlock"
            id={element.ID}
            key={element.ID} 
            index={index + 1} 
            Country={element.Country}
            TotalDeaths={element.TotalDeaths}
            TotalRecovered={element.TotalRecovered} 
            TotalConfirmed={element.TotalConfirmed}
          />
        );
      });
    }
  }

  const searchPanel =  document.getElementById('search');

  if (searchPanel !== null) {
        searchPanel.oninput = function() {
          if (this.value.length === 0) {
            setItems(copiedArray);

            bodyElements = items.map((element, index) => {
              return (
                <InfoBlock 
                  classToUse="infoBlock"
                  id={element.id}
                  key={element.id} 
                  index={index + 1} 
                  Country={element.Country} 
                  TotalDeaths={element.TotalDeaths}
                  TotalRecovered={element.TotalRecovered}
                  TotalConfirmed={element.TotalConfirmed}
                />
              );
            });
          }

          if (this.value.length >= 1) {
          
            let partToSearch = null;

            if (this.value.length === 1) {
              partToSearch = this.value.toUpperCase();
            } else {
              partToSearch = this.value[0].toUpperCase() + this.value.substring(1,).toLowerCase();
            }

            const copyArray = [...copiedArray];
            const resultArray = [];

            for (let i = 0; i < copyArray.length; i++) {
              let nessPart = copyArray[i].Country.substring(0, partToSearch.length);

              if (nessPart === partToSearch) {
                resultArray.push(copyArray[i]);
              }
            }

            setItems(resultArray);

            if (resultArray.length !== 0) {
              bodyElements = items.map((element, index) => {
                return (
                  <InfoBlock 
                    classToUse="infoBlock"
                    id={element.id}
                    key={element.id} 
                    index={index + 1} 
                    Country={element.Country} 
                    TotalDeaths={element.TotalDeaths}
                    TotalRecovered={element.TotalRecovered}
                    TotalConfirmed={element.TotalConfirmed}
                  />
                );
              });
            }
          }
        };
      }
      
  return (
      <div className="App">
        <Header />
        <div className="mainContent">
          <StatBlock array={items} callback={setItems} />
          { bodyElements }
        </div>
      </div>
  );
}

export default App;
