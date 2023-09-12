import { NgModule } from "@angular/core";
import { CatalogScreenComponent } from "./catalog-screen/catalog-screen.component";
import { MovieDetailScreenComponent } from "./movie-detail-screen/movie-detail-screen.component";
import { WatchlistScreenComponent } from "./watchlist-screen/watchlist-screen.component";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { HomeScreenComponent } from './home-page-screen/home-screen/home-screen.component';
import { CoreRoutingModule } from "./core.routing-module";

@NgModule({
    imports: [
        MatProgressSpinnerModule, 
        SharedModule,
        CommonModule,
        CoreRoutingModule
    ],
    providers:[],
    declarations: [
        CatalogScreenComponent, 
        MovieDetailScreenComponent, 
        WatchlistScreenComponent, 
        HomeScreenComponent
    ]
})
export class CoreModule {

    constructor(){}
}