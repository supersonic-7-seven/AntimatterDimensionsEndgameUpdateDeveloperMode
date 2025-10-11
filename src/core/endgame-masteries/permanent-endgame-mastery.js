import { EndgameMastery } from "./endgame-mastery";
import { EndgameMasteriesState } from "./endgame-masteries";

export class PermanentEndgameMasteryState extends EndgameMasteriesState {
  constructor(config) {
    super(config, ENDGAME_MASTERY_TYPE.PERMANENT);
  }

  get isBought() {
    return player.endgame.permanentMasteries.includes(this.id);
  }

  get canBeBought() {
    return this.isAffordable && this.config.requirement();
  }

  get description() {
    return this.config.description;
  }

  get cost() {
    return typeof this.config.cost === "function" ? this.config.cost() : this.config.cost;
  }

  get totalEndgameSkillRequirement() {
    return this.id === 1 ? 100 : 0;
  }

  purchase(quiet = false) {
    if (this.isBought || !this.canBeBought) return false;
    if (this.id === 1) {
      // ID 1 is the endgame upgrades unlock mastery
      if (!quiet) {
        //Tab.endgame.upgrades.show();
      }
      TabNotification.endgameUpgradesAfterUnlock.tryTrigger();
    }

    player.endgame.permanentMasteries.push(this.id);
    Currency.endgameSkills.subtract(this.cost);
    return true;
  }
}

PermanentEndgameMasteryState.masteries = mapGameData(
  GameDatabase.endgame.permanentMasteries,
  config => new PermanentEndgameMasteryState(config)
);

/**
 * @type {PermanentEndgameMasteryState}
 */
EndgameMastery.endgameUpgrades = PermanentEndgameMasteryState.masteries[1];

EndgameMastery.boughtEndgameUpgradesEM = function() {
  return player.endgameMasteries.permanentMasteries.map(id => PermanentEndgameMasteryState.masteries[id]);
};
