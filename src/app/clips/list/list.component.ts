import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import {ClipService} from "../../services/clip.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers:[DatePipe]
})
export class ListComponent implements OnInit, OnDestroy {
@Input() scrollable = true;

  constructor(public clipsList: ClipService) {
    this.clipsList.getClips();
  }

  ngOnInit(): void {
    if(this.scrollable){

      window.addEventListener('scroll', this.handleScroll);
    }
  }
  ngOnDestroy(): void {
    if(this.scrollable){
      window.removeEventListener('scroll', this.handleScroll);
    }
  this.clipsList.pageClip =[];
  }

  handleScroll = () => {
    const { scrollTop, offsetHeight } = document.documentElement;
    const { innerHeight } = window;

    const bottomOfWindow = Math.round(scrollTop) + innerHeight === offsetHeight;

    if (bottomOfWindow) {
     this.clipsList.getClips();
    }
  };
}
