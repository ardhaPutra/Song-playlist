import { Component, OnInit } from "@angular/core";
import { Registration } from '../models/registration';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.scss"]
})
export class RegistrationComponent implements OnInit {
    registrations: Registration[] = [];
    regModel: Registration;
    showNew: Boolean = false;
    submitType: string = "Save";
    selectedRow: number;
    nestedForm: FormGroup;
  constructor(private _fb:FormBuilder) {
      this.registrations.push(
      new Registration(
        "90s Gangsta Rap",
        "The Industy is Wack",
        "Ultra",
        "Most iconic gangsta rap from 90s",
        4
      )
    );

    this.registrations.push(
      new Registration(
        "2000s Easycore Bands",
        "Bada Bing Wit A Pipe",
        "Four Year Strong",
        "The Compilation of Best Easycore Band's tracks",
        3.32
      )
    );

    this.registrations.push(
      new Registration(
        "Modern Metal",
        "Abandoned",
        "Unprocessed",
        "Various songs from 2010s Metal Bands",
        5.28
      )
    );
  }
  
onNew() {
  this.regModel = new Registration();
  this.submitType = 'Save';
  this.showNew = true;
  }

onSave() {
  if (this.submitType === 'Save') {
    this.registrations.push(this.regModel);
  } else {
  
  // Update existing 
  
  this.registrations[this.selectedRow].playlistName = this.regModel.playlistName;  
  this.registrations[this.selectedRow].songTitle = this.regModel.songTitle;  
  this.registrations[this.selectedRow].artist = this.regModel.artist;    
  this.registrations[this.selectedRow].description = this.regModel.description;  
  this.registrations[this.selectedRow].duration = this.regModel.duration;    
}
  
  this.showNew = false;
  
}

onEdit(index: number) {
  this.selectedRow = index;
  // Retrieve selected 
  this.regModel = Object.assign({}, this.registrations[this.selectedRow]);
  this.submitType = 'Update';
  this.showNew = true;
  
}

onDelete(index: number) {
  this.registrations.splice(index, 1);
}

onCancel() {
  this.showNew = false;
}

  ngOnInit() {
    this.nestedForm = this._fb.group({
      playlistName: [null, Validators.required],
      description: [null, Validators.required],
      songTitle: this._fb.array([this.addSongGroup()])
    });
  }

  addSongGroup() {
    return this._fb.group({
      songsTitle: [null, Validators.required],
      artist: [null, Validators.required],
      duration: [null, [Validators.required, Validators.minLength(1)]]
    });
  }

  addSong() {
    this.songArray.push(this.addSongGroup());
  }

  removeSong(index) {
    this.songArray.removeAt(index); 
  }

  get songArray() {
    return <FormArray>this.nestedForm.get('songTitle');
  }

  submitHandler() {
    console.log(this.nestedForm);
  }
}

  
