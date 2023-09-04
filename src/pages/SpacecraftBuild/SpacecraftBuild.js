import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./SpacecraftBuild.module.css";
import { LoadingContext } from "../../context/LoadingProvider";
import SpaceTravelApi from "../../services/SpaceTravelApi";

function SpacecraftBuild() {
  const INITIAL_SPACECRAFT = {
    name: "",
    capacity: "",
    description: "",
    pictureUrl: ""
  };
  const [spacecraft, setSpacecraft] = useState(INITIAL_SPACECRAFT);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const { enableLoading, disableLoading } = useContext(LoadingContext);

  function handleChangeOfFormInput(event) {
    const { name, value } = event.target;
    setSpacecraft((prevSpacecraft) => ({
      ...prevSpacecraft,
      [name]: value,
    }))
  }

  async function handleSubmitOfForm(event) {
    event.preventDefault();

    const newErrors = [];

    if (spacecraft.name === "") {
      newErrors.push(("Every good ship needs a name commander."))
    }
    if (spacecraft.capacity === "") {
      newErrors.push(("We seem to be lacking sufficient data for your capacity commander."))
    }
    if (spacecraft.description === "") {
      newErrors.push(("Care to give us a brief description there commander?"))
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
    }
    else {
      enableLoading();

      await SpaceTravelApi.buildSpacecraft(spacecraft);
      setSpacecraft(INITIAL_SPACECRAFT);
      navigate('/spacecrafts')

      disableLoading();
    }
  }

  function handleClickOfBack(event) {
    navigate('/spacecrafts');
  }

  return (
    <>
      <button
        className={styles["button__back"]}
        onClick={handleClickOfBack}
      >
        Back 👈
      </button>
      <div>
        <form onSubmit={handleSubmitOfForm}>
          <div className={styles["form"]}>
            <div className={styles["form__inputs"]}>
              <div className={styles["form__inputContainer"]}>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={spacecraft.name}
                  onChange={handleChangeOfFormInput}
                  autoComplete="off"
                />
              </div>

              <div className={styles["form__inputContainer"]}>
                <input
                  type="text"
                  name="capacity"
                  placeholder="Capacity"
                  value={spacecraft.capacity}
                  onChange={handleChangeOfFormInput}
                  autoComplete="off"
                />
              </div>

              <div className={styles["form__inputContainer"]}>
                <textarea
                  name="description"
                  placeholder="Description"
                  value={spacecraft.description}
                  onChange={handleChangeOfFormInput}
                />
              </div>

              <div className={styles["form__inputContainer"]}>
                <input
                  type="text"
                  name="pictureUrl"
                  placeholder="Picture URL"
                  value={spacecraft.pictureUrl}
                  onChange={handleChangeOfFormInput}
                  autoComplete="off"
                />
              </div>
            </div>

            <div className={styles["submitContainer"]}>
              <div className={styles["errorContainer"]}>
                {
                  errors.map((error, index) => <div
                    key={index}
                    className={styles["error"]}
                  >{error}</div>)
                }
              </div>

              <div className={styles["button__submit"]}>
                <button
                  type="submit"
                  onClick={handleSubmitOfForm}
                >
                  Build 🏗️
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default SpacecraftBuild;
