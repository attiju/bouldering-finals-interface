export interface Competition {
    id: string,
    rules: Rules,
    climbers: Climber[],
    males?: Climber[],
    females?: Climber[]
}

export interface Rules {
    boulders: {
        males: number,
        females: number
    }
}

export interface Climber {
    id: string,
    competitionId: string,
    firstname: string,
    lastname: string,
    gender: Gender,
    boulders: BoulderInfo[],
    open?: boolean,
}

export type Gender = 'male' | 'female';

export interface BoulderInfo {
    top: BoulderPartInfo,
    zone: BoulderPartInfo
}

export interface BoulderPartInfo {
    done: boolean,
    tries: number
}