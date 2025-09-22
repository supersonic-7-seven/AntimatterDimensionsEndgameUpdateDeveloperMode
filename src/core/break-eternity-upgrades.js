import { RebuyableMechanicState, SetPurchasableMechanicState } from "./game-mechanics";

export class BreakEternityUpgradeState extends SetPurchasableMechanicState {
  get currency() {
    return Currency.antimatter;
  }

  get set() {
    return player.breakEternityUpgrades;
  }

  onPurchased() {
    this.config.onPurchased?.();
  }

  get isAvailable() {
    return !Pelle.isDoomed;
  }
}

class RebuyableBreakEternityUpgradeState extends RebuyableMechanicState {
  get currency() {
    return Currency.antimatter;
  }

  get boughtAmount() {
    return player.breakEternityRebuyables[this.id];
  }

  set boughtAmount(value) {
    player.breakEternityRebuyables[this.id] = value;
  }

  get isCapped() {
    return this.boughtAmount === this.config.maxUpgrades;
  }

  onPurchased() {
    this.config.onPurchased?.();
  }

  get isAvailable() {
    return !Pelle.isDoomed;
  }
}

export const BreakEternityUpgrade = mapGameDataToObject(
  GameDatabase.endgame.upgrades,
  config => (config.rebuyable
    ? new RebuyableBreakEternityUpgradeState(config)
    : new BreakEternityUpgradeState(config))
);
