import Entity from '../entity.js';

export default class Item extends Entity {
  constructor(id, instance, x, y) {
    super(id, 'item', instance, x, y);

    this.static = false;
    this.dropped = false;
    this.shard = false;
    this.count = 1;
    this.ability = 0;
    this.abilityLevel = 0;
    this.tier = 1;
    this.respawnTime = 30000;
    this.despawnDuration = 4000;
    this.blinkDelay = 20000;
    this.despawnDelay = 1000;
    this.blinkTimeout = null;
    this.despawnTimeout = null;
  }

  destroy() {
    if (this.blinkTimeout) {
      clearTimeout(this.blinkTimeout);
    }

    if (this.despawnTimeout) {
      clearTimeout(this.despawnTimeout);
    }

    if (this.static) {
      this.respawn();
    }
  }

  despawn() {
    this.blinkTimeout = setTimeout(() => {
      if (this.blinkCallback) this.blinkCallback();

      this.despawnTimeout = setTimeout(() => {
        if (this.despawnCallback) this.despawnCallback();
      }, this.despawnDuration);
    }, this.blinkDelay);
  }

  respawn() {
    setTimeout(() => {
      if (this.respawnCallback) {
        this.respawnCallback();
      }
    }, this.respawnTime);
  }

  getData() {
    return [this.id, this.count, this.ability, this.abilityLevel];
  }

  getState() {
    const state = super.getState();

    state.count = this.count;
    state.ability = this.ability;
    state.abilityLevel = this.abilityLevel;

    return state;
  }

  setCount(count) {
    this.count = count;
  }

  setAbility(ability) {
    this.ability = ability;
  }

  setAbilityLevel(abilityLevel) {
    this.abilityLevel = abilityLevel;
  }

  onRespawn(callback) {
    this.respawnCallback = callback;
  }

  onBlink(callback) {
    this.blinkCallback = callback;
  }

  onDespawn(callback) {
    this.despawnCallback = callback;
  }
}
