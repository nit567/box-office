
import React, { useState } from 'react';
import ActorGrid from '../components/actor/ActorGrid';
import MainPageLayout from '../components/MainPageLayout';
import ShowGrid from '../components/show/ShowGrid';
import { apiGet } from '../misc/config';
import { useLastQuery } from '../misc/custom-hooks';
import { SearchInput, RadioInputsWrapper,SearchButtonWrapper } from './Home.styled';


const Home = () => {

  const [input, setInput] = useLastQuery();
  const [results, setResults] = useState(null);
  const [searchOption, setSearchOption] = useState(`shows`);

  const isSearchOption = searchOption === 'shows';


  const onSearch = () => {

    apiGet(`/search/${searchOption}?q=${input}`).then(result => {
      setResults(result);
     // console.log(result);
    });
  }


  const onRendering = () => {
    if (results && results.length === 0) {
      return <div>No Result</div>
    }
    if (results && results.length > 0) {
      return results[0].show ?
       <ShowGrid data={results}/>
        :<ActorGrid data={results} />
        ;
    }
    return null;
  }


  const onInputChange = ev => {
    setInput(ev.target.value)
  }


  const onKeyDown = ev => {
    if (ev.keyCode === 13)
      onSearch();
  }

  const onChangeRadio = ev => {
    setSearchOption(ev.target.value);

   // console.log(searchOption);
  }




  return <MainPageLayout>

    <SearchInput
      type="text"
      placeholder="search something"
      onChange={onInputChange}
      onKeyDown={onKeyDown}
      value={input}
    />

    <RadioInputsWrapper>
     <div>
      <label htmlFor="shows-movies">
        Shows
        <input
          id="shows-movies"
          type="radio"
          value="shows"
          checked={isSearchOption}
          onChange={onChangeRadio} />
      </label>
      </div>
      <div>
      <label htmlFor="peoples" >
        Actors
        <input
          id="peoples"
          type="radio"
          value="people"
          checked={!isSearchOption}
          onChange={onChangeRadio} />
      </label>
      </div>
    </RadioInputsWrapper>
    
    <SearchButtonWrapper>
    <button type="button" onClick={onSearch} >
      Search
    </button>
    </SearchButtonWrapper>
    {onRendering()}
  </MainPageLayout>;
};

export default Home;