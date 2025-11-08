interface Player {
  id: string;
  hasSubmitted: boolean;
  cooldownUntil: number | null;
}

export class PlayerManager {
  private players: Map<string, Player>;
  private readonly COOLDOWN_DURATION = 60000; // 60 seconds in milliseconds

  constructor() {
    this.players = new Map();
  }

  addPlayer(playerId: string): void {
    this.players.set(playerId, {
      id: playerId,
      hasSubmitted: false,
      cooldownUntil: null,
    });
  }

  removePlayer(playerId: string): void {
    this.players.delete(playerId);
  }

  getPlayer(playerId: string): Player | undefined {
    return this.players.get(playerId);
  }

  getPlayerCount(): number {
    return this.players.size;
  }

  markPlayerSubmitted(playerId: string): void {
    const player = this.players.get(playerId);
    if (player) {
      player.hasSubmitted = true;
    }
  }

  canPlayerUpdate(playerId: string): boolean {
    const player = this.players.get(playerId);
    if (!player) {
      return false;
    }

    // If player hasn't submitted, they can update
    if (!player.hasSubmitted) {
      return true;
    }

    // If player has submitted, check cooldown
    if (player.cooldownUntil && Date.now() < player.cooldownUntil) {
      return false;
    }

    // Cooldown expired, allow update and reset submission status
    player.hasSubmitted = false;
    return true;
  }

  startCooldown(playerId: string): void {
    const player = this.players.get(playerId);
    if (player) {
      player.cooldownUntil = Date.now() + this.COOLDOWN_DURATION;
    }
  }
}

