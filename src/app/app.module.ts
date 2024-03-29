import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

// NGXS
import { MovieState } from '../app/store/state/movies.state';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { MoviesService } from './providers/movies-service';
import { YoutubeApiService } from './providers/youtube-api-service';
import { SearchImageService } from './providers/search-image-service';
import { WavesService } from './providers/waves-service';
// import { GenreCarouselComponent } from './components/genre-carousel/genre-carousel.component';

@NgModule({
  declarations: [
    AppComponent,
    // GenreCarouselComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    IonicModule.forRoot(),
    NgxsModule.forRoot([ MovieState ]),
    NgxsStoragePluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    NgxsFormPluginModule.forRoot()
  ],
  providers: [MoviesService, YoutubeApiService, SearchImageService, WavesService],
  bootstrap: [AppComponent]
})
export class AppModule {}
