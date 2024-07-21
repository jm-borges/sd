import { Laureate } from './laureate.model';

export class Prize {
    id: string;
    year: string;
    category: string;
    laureates?: Laureate[];
}
