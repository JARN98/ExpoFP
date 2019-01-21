export class UploadImageDetailsDto {
    image: File[];

    constructor(image?: File[]) {
        this.image = image;
    }
}
