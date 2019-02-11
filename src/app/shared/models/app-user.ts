
export interface AppUserData {
    key: string;
    name: string;
    email: string;
    role: string;
    necromancer: boolean;
    summoner: boolean;
    level: number;
    theme: string;
}

export class AppUser implements AppUserData {
    key = '';
    name = '';
    email = '';
    role = 'user';
    necromancer = false;
    summoner = false;
    level = 1;
    theme = '-LVdBangNq0NFiPl3AMi';
}
