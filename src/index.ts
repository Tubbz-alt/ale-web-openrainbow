export * from './polyfill';

import { HttpService } from "./Services/HttpService";
import { DatabaseService } from "./Services/DatabaseService";
import { RainbowServiceFactory } from "./Factories/RainbowServiceFactory";

window['HttpService'] = HttpService;
window['DatabaseService'] = DatabaseService;
window['RainbowServiceFactory'] = RainbowServiceFactory