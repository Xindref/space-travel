import {useState, useEffect, useContext} from "react";

import styles from "./Planets.module.css";
import {LoadingContext} from "../../context/LoadingProvider";
import SpaceTravelApi from "../../services/SpaceTravelApi";

function Planets ()
{
  const [planetsWithSpacecrafts, setPlanetsWithSpacecrafts] = useState([]);
  const {isLoading, enableLoading, disableLoading} = useContext(LoadingContext);
  const [selectedPlanetId, setSelectedPlanetId] = useState();
  const [selectedSpacecraftId, setSelectedSpacecraftId] = useState();

  async function getPlanetsWithSpacecrafts ()
  {
    const {data: planets, isError: isErrorPlanets} = await SpaceTravelApi.getPlanets();
    const {data: spacecrafts, isError: isErrorSpacecrafts} = await SpaceTravelApi.getSpacecrafts();

    if (!isErrorPlanets && !isErrorSpacecrafts)
    {
      // todo fill planets.spacecrafts with spacecrafts

      setPlanetsWithSpacecrafts(planets);
    }
  }

  useEffect(() =>
            {
              async function runGetPlanetsWithSpacecrafts ()
              {
                enableLoading();
                await getPlanetsWithSpacecrafts();
                disableLoading();
              }

              runGetPlanetsWithSpacecrafts();
            },
            [enableLoading, disableLoading]
  );

  function handleClickOfPlanet (event, id)
  {
    // todo set the selected planet
  }

  async function handleClickOfSpacecraft (event, spacecraftId, planetId)
  {
    // todo set the selected spacecraft
    // todo send spacecraft to planet using the API
    // todo call getPlanetsWithSpacecrafts to refresh the page content
  }

  return (
    <>
      {
        planetsWithSpacecrafts.map(
          (planet, index) =>
            <div
              key={index}
              className={styles["planetWithSpacecrafts"]}
            >
              <div
                className={`${styles["planet"]} ${selectedPlanetId === planet.id && styles["planet--selected"]}`}
                onClick={(event) => handleClickOfPlanet(event, planet.id)}
              >
                <div className={styles["planet__imageContainer"]}>
                  <img
                    src={planet.pictureUrl}
                    alt={`The planet ${planet.name}`}
                    className={styles["planet__image"]}
                  />
                </div>

                <div className={styles["planet__info"]}>
                  <div>{planet.name}</div>
                  <div>{planet.currentPopulation}</div>
                </div>
              </div>

              <div className={styles["planet__spacecrafts"]}>
                {
                  planet.spacecrafts.map((spacecraft, index) =>
                                           <div
                                             key={index}
                                             className={`${styles["planet__spacecraft"]} ${selectedSpacecraftId === spacecraft.id && styles["planet__spacecraft--selected"]}`}
                                             onClick={(event) => handleClickOfSpacecraft(event, spacecraft.id, planet.id)}
                                           >
                                             <div className={styles["planet__spacecraft__imageContainer"]}>
                                               {
                                                 spacecraft.pictureUrl
                                                 ?
                                                 <img
                                                   src={spacecraft.pictureUrl}
                                                   alt={`The spacecraft ${spacecraft.name}`}
                                                   className={styles["planet__spacecraft__image"]}
                                                 />
                                                 :
                                                 <span className={styles["planet__spacecraft__image--default"]}>🚀</span>
                                               }

                                             </div>
                                             <div className={"planet__spacecraft__info"}>
                                               <div>{spacecraft.name}</div>
                                               <div>{spacecraft.capacity}</div>
                                             </div>
                                           </div>
                  )
                }
              </div>
            </div>
        )
      }
    </>
  );
}

export default Planets;
