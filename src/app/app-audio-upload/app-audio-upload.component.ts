import { Component } from '@angular/core';

@Component({
  selector: 'app-audio-upload',
  templateUrl: './app-audio-upload.component.html',
  styleUrls: ['./app-audio-upload.component.css']
})
export class AudioUploadComponent {
  audioFile: File | null = null;

  constructor(){
  }

  selectedFileName: string = "Click to Upload";

  onFileChange(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFileName = fileInput.files[0].name;
    } else {
      this.selectedFileName = "Click to Upload";
    }
  }

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.audioFile = inputElement.files[0];
    }
  }

  onUpload(): void {
    if (this.audioFile) {
      // Perform the upload logic here
      console.log('Uploading audio file:', this.audioFile);
      // You can send the file to a server or perform any other necessary operations
    }
  }

  screen = 'Alerts';

  open(tab)
  {
    this.screen = tab;
    console.log(tab);
  }


  sentences: any[] = [
    { text: "I'm feeling great! I'm feeling great! I'm feeling great! ", sentiment: "Positive", score: 0.9, entities: ["I"] },
    { text: "This is disappointing.", sentiment: "Negative", score: 0.3, entities: ["This"] },
    { text: "I'm not sure how I feel about this.", sentiment: "Neutral", entities: [] },
    { text: "I'm feeling great! I'm feeling great! I'm feeling great! ", sentiment: "Positive", score: 0.9, entities: ["I"] },
    { text: "This is disappointing.", sentiment: "Negative", score: 0.3, entities: ["This"] },
    { text: "I'm not sure how I feel about this.", sentiment: "Neutral", entities: [] },
    { text: "I'm feeling great! I'm feeling great! I'm feeling great! ", sentiment: "Positive", score: 0.9, entities: ["I"] },
    { text: "This is disappointing.", sentiment: "Negative", score: 0.3, entities: ["This"] },
    { text: "I'm not sure how I feel about this.", sentiment: "Neutral", entities: [] }
  ];

  positiveSentences: any[] = [
    { text: "I'm feeling great!" },
    { text: "This is amazing!" }
  ];

  negativeSentences: any[] = [
    { text: "This is disappointing." },
    { text: "I'm not happy with this." }
  ];

  neutralSentences: any[] = [
    { text: "I'm not sure how I feel about this." },
    { text: "It's neither good nor bad." }
  ];
  
}
