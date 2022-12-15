export class Penalty {
    constructor(public id: string, public description: string, public amount: number, public extraInfo: string) { }

    public static fromDto(dto: any): Penalty {
        return new Penalty(dto.id, dto.description, dto.amount, dto.extraInfo);
    }
}

export class PlayerPenalty extends Penalty {
    constructor(id: string, description: string, amount: number, extraInfo: string, public isPaid: boolean, public date: Date) {
        super(id, description, amount, extraInfo);
    }

    public static fromDto(dto: any): PlayerPenalty {
        return new PlayerPenalty(dto.id, dto.description, dto.amount, dto.extraInfo, dto.isPaid, new Date(dto.date));
    }
}

export class Player {
    constructor(public id: string, public name: string) { }

    public static fromDto(dto: any): Player {
        return new Player(dto.id, dto.name);
    }
}

export class PlayerWithInfo extends Player {
    constructor(id: string, name: string, public penaltyCount: number, public penaltiesToPay: number, public penalties: PlayerPenalty[]) {
        super(id, name);
    }

    public static fromDto(dto: any): PlayerWithInfo {
        return new PlayerWithInfo(dto.id, dto.name, dto.penaltyCount, dto.penaltiesToPay, dto.penalties.map((p => PlayerPenalty.fromDto(p))));
    }
}

export class Team {
    constructor(public id: string, public name: string, public players: PlayerWithInfo[]) { }

    public static fromDto(dto: any): Team {
        return new Team(dto.id, dto.name, dto.players.map((p) => PlayerWithInfo.fromDto(p)));
    }
}

export class SelectableItem<T>{
    constructor(public item: T, public selected: boolean = false) {

    }
}