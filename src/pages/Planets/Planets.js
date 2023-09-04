import { useState, useEffect, useContext } from "react";

import styles from "./Planets.module.css";
import { LoadingContext } from "../../context/LoadingProvider";
import SpaceTravelApi from "../../services/SpaceTravelApi";
import SpaceTravelMockApi from "../../services/SpaceTravelMockApi";

function Planets() {
  const [planetsWithSpacecrafts, setPlanetsWithSpacecrafts] = useState([]);
  const { isLoading, enableLoading, disableLoading } = useContext(LoadingContext);
  const [selectedPlanetId, setSelectedPlanetId] = useState();
  const [selectedSpacecraftId, setSelectedSpacecraftId] = useState();

  async function getPlanetsWithSpacecrafts() {
    const { data: planets, isError: isErrorPlanets } = await SpaceTravelApi.getPlanets();
    const { data: spacecrafts, isError: isErrorSpacecrafts } = await SpaceTravelApi.getSpacecrafts();

    if (!isErrorPlanets && !isErrorSpacecrafts) {
      //todo fill planets.spacecrafts with spacecrafts
      for (let planet of planets) {
        planet.spacecrafts = [];
      }

      // Associate spacecrafts with their corresponding planets
      for (let spacecraft of spacecrafts) {
        const planet = planets.find((planet) => planet.id === spacecraft.currentLocation);
        if (planet) {
          planet.spacecrafts.push(spacecraft);
        }
      }

      setPlanetsWithSpacecrafts(planets);
    }
  }

  useEffect(() => {
    async function runGetPlanetsWithSpacecrafts() {
      enableLoading();
      await getPlanetsWithSpacecrafts();
      disableLoading();
    }

    runGetPlanetsWithSpacecrafts();
  },
    [enableLoading, disableLoading]
  );

  function handleClickOfPlanet(event, id) {
    event.preventDefault()
    setSelectedPlanetId(id)
  }

  async function handleClickOfSpacecraft(event, spacecraftId, planetId) {
    if (!isLoading && Number.isInteger(selectedPlanetId) && selectedPlanetId !== planetId) {
      setSelectedSpacecraftId(spacecraftId);

      enableLoading();

      const { isError } = await SpaceTravelApi.sendSpacecraftToPlanet({ spacecraftId, targetPlanetId: selectedPlanetId });
      if (!isError) {
        await getPlanetsWithSpacecrafts();
        setSelectedPlanetId(null);
        setSelectedSpacecraftId(null);
      }

      disableLoading();
    }
  }

  return (
    <div style={{ width: "100%" }}>
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
                  <div>{parseInt(planet.currentPopulation)}</div>
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
    </div>
  );
}

export default Planets;
