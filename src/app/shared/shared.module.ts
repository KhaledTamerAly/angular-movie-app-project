import { NgModule } from "@angular/core";
import { MovieCardComponent } from "./movie-card/movie-card.component";
import { CommonModule } from "@angular/common";

@NgModule({
    imports: [
        CommonModule,
    ],
    providers:[],
    declarations: [MovieCardComponent],
    exports: [MovieCardComponent]
})
export class SharedModule {

    constructor(){}
}