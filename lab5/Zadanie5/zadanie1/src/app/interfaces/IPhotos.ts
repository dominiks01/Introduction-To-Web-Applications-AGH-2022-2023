// export interface Photo {
//     "albumId": number,
//     "id": number,
//     "title": string,
//     "url": string,
//     "thumbnailUrl": string
// }

export class Photo {
    constructor(
      public albumId: number,
      public id: number,
      public title: string,
      public url: string,
      public thumbnailUrl: string
    ) {
    }
  }