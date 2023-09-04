import styles from "./Home.module.css";
import * as icons from "C:/Users/Dako/Documents/Springboard/space-travel/src/icons"

function Home() {
  return (
    <div className={styles["page-container"]}>
      <p className={styles["page-title"]}>Space Travel: Expanding Horizons Beyond Earth</p>
      <div>
        <div className={styles["section-title"]}>
          <img className={styles["icon-image"]} src={icons.astronaut}></img>
          Journey into the Future
        </div>
        <p className={styles["section-description"]}>In a world where the impossible has become a reality, where the stars are no longer out of reach, welcome to the future of humanit's survival and exploration. Witness the evolution of technology as it transforms barren planets into thriving havens, all made possible by the wonders of innovation and human determination.</p>
      </div>

      <div>
        <div className={styles["section-title"]}>
          <img className={styles["icon-image"]} src={icons.planetEarth}></img>
          From Neglect to Innovation
        </div>
        <p className={styles["section-description"]}>Once the cradle of civilization, Earth now stands as a solemn reminder of the consequences of neglect and environmental decline. But fear not, for the ingenuity of mankind has soared to new heights. With our relentless pursuit of advancement, we have not only healed our scars but extended our reach across the cosmos.</p>
      </div>

      <div>
        <div className={styles["section-title"]}>
          <img className={styles["icon-image"]} src={icons.rocket}></img>
          Enter Space Travel: Where Dreams Take Flight
        </div>
        <p className={styles["section-description"]}>Embark on an extraordinary journey with our groundbreaking web application, aptly named "Space Travel." As a commander engineer, the fate of humanity's exodus rests in your capabale hands. Prepare to face the ultimate challenge: evacuating humankind from their birthplace and guiding them towards a future among the stars.</p>
      </div>

      <div>
        <div className={styles["section-title"]}>
          <img className={styles["icon-image"]} src={icons.wrench}></img>
          Engineer, Explorer, Leader
        </div>
        <p className={styles["section-description"]}>Space Travel empowers you to engineer, design, and even dismantle spacecraft. Craft vessels that defy the boundaries of imagination, envisioning a future where life flourishes beyond the stars. But remember, your role extends beyond construction - you are a leader, an explorer, a commander steering humanity's destiny.</p>
      </div>
    </div>
  );
}

export default Home;
