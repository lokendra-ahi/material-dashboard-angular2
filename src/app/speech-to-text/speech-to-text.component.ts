import { Component } from '@angular/core';
import { SpeechClient } from '@google-cloud/speech';

@Component({
  selector: 'app-speech-to-text',
  templateUrl: './speech-to-text.component.html',
  styleUrls: ['./speech-to-text.component.css']
})
export class SpeechToTextComponent {
  private speechClient: SpeechClient;

  constructor() {
    // this.speechClient = new SpeechClient({
    //   keyFilename: 'assets/project.json'
    // });

    // console.log(this.speechClient);
  }

  // async convertSpeechToText(audioFile: File): Promise<string> {
  //   // const audioContent = await this.readFileAsBase64(audioFile);
    
  //   const [response] = await this.speechClient.recognize({
  //     config: {
  //       encoding: 'LINEAR16',
  //       sampleRateHertz: 16000,
  //       languageCode: 'en-US'
  //     },
  //     // audio: {
  //     //   content: audioContent
  //     // }
  //   });

  //   const transcription = response.results
  //     .map(result => result.alternatives[0].transcript)
  //     .join('\n');

  //   return transcription;
  // }

  // handleFile(event: Event): void {
  //   const file = (event.target as HTMLInputElement).files[0];
  //   if (file) {
  //     this.convertSpeechToText(file)
  //       .then(transcription => {
  //         console.log('Transcription:', transcription);
  //         // Do something with the transcription
  //       })
  //       .catch(error => {
  //         console.error('Speech-to-text conversion error:', error);
  //       });
  //   }
  // }

  // readFileAsBase64(file: File): Promise<string> {
  //   return new Promise<string>((resolve, reject) => {
  //     const reader = new FileReader();
  
  //     reader.onload = () => {
  //       const base64String = reader.result as string;
  //       const base64Content = base64String.split(',')[1]; // Extract base64 content excluding the data URL prefix
  //       resolve(base64Content);
  //     };
  
  //     reader.onerror = error => {
  //       reject(error);
  //     };
  
  //     reader.readAsDataURL(file);
  //   });
  // }




  selectedFile: File | null;
  transcription: string = '';
  errorMessage: string = '';

  // constructor() { }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  async transcribe(): Promise<void> {
    if (!this.selectedFile) {
      this.errorMessage = 'Please select an audio file.';
      return;
    }

    const audio = {
      content: await this.readFileAsBase64(this.selectedFile)
    };

    const config : any = {
      encoding: 'LINEAR16',
      sampleRateHertz: 16000,
      languageCode: 'en-US',
    };

    try {
      const client = new SpeechClient();
      const [response] = await client.recognize({ audio, config });
      this.transcription = response.results
        .map(result => result.alternatives[0].transcript)
        .join('\n');
    } catch (error) {
      console.error('Speech-to-Text API Error:', error);
      this.errorMessage = 'An error occurred during transcription. Please try again.';
    }
  }

  private readFileAsBase64(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  
}
