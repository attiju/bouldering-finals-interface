export interface Competition {
    id: string,
    rules: Rules,
    climbers: Climber[]
}

export interface Rules {
    boulders: {
        males: number,
        females: number
    }
}

export interface Climber {
    id: string,
    firstname: string,
    lastname: string,
    gender: Gender,
    boulders: BoulderInfo[]
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