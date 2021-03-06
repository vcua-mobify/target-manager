import React, { useState, useEffect } from 'react';
import Target from './Target.js';
import CreateTarget from './CreateTarget.js';
import './App.css';

const retrieveTargets = (projectSlug) => {
  const URL = `/api/projects/${projectSlug}/target/`;
  console.log ('retrieveTargets was called');

  return fetch(URL)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    return data.results;
  })
  .catch(err => console.log(err))
} 



const App = () => {
  const [projectSlug] = useState('jstest');
  const [results, setResults] = useState([]);

  function updateResults() {
    retrieveTargets(projectSlug)
      .then((results) => {
        setResults(results);
      })
    }

  useEffect(updateResults, [projectSlug]);
  
  const addDefaultTarget = (targetName, targetSlug, targetRegion) => {
    const URL = `/api/projects/${projectSlug}/target/`;
    const hostname = `${projectSlug}-${targetSlug}.mobify-storefront.com`;
    const body = {
      name: targetName,
      slug: targetSlug,
      ssr_external_hostname: hostname,
      ssr_external_domain: 'mobify-storefront.com',
      ssr_region: targetRegion
    };
    console.log(`I got called with name of ${targetName} and slug of ${targetSlug}!`);
    fetch(URL, {
      method: 'post',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(() => console.log("create target completed"))
    .then(updateResults);
  }

  const deleteTarget = (targetSlug) => {
    console.log(`Delete target called with ${targetSlug}`);
    let r = window.confirm("Press OK to delete this target");

    if (r === true) {
      const URL = `/api/projects/${projectSlug}/target/${targetSlug}/`
      fetch(URL, {
        method: 'delete'
      })
      .then(() => console.log("delete target completed"))
      .then(updateResults);
    }
  }

  return (
    <div className="App"> 
      <CreateTarget cb={addDefaultTarget} />  

      {
        results.map( (el) => {
          const link = `https://cloud.mobify.com/projects/${projectSlug}/publishing/${el.slug}/`;
          const d = new Date(el.current_deploy.bundle.created_at)
          return <Target key={el.name} name={el.name} slug={el.slug}
                    link={link} region={el.ssr_region} 
                    cb={deleteTarget}
                    deploy={d.toLocaleString()} />
        })
      }
    </div>
  );
}

export default App;